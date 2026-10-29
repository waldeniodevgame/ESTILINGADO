// Optional integration suite: requires Firebase Emulator + packages listed in CLOUD_SAVE.md.
import { readFileSync } from 'node:fs';
import { test, after } from 'node:test';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import schema from '../prototype/cloud-save/schema.js';
const env = await initializeTestEnvironment({ projectId: 'demo-capsulemon',
  firestore: { rules: readFileSync('firebase/firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 } });
after(() => env.cleanup());
const path = uid => ['players', uid, 'save', 'main'];
test('owner can write/read; another uid and anonymous cannot', async () => {
  const owner = env.authenticatedContext('owner').firestore();
  const other = env.authenticatedContext('other').firestore();
  const guest = env.unauthenticatedContext().firestore();
  await assertSucceeds(setDoc(doc(owner, ...path('owner')), schema.defaults()));
  await assertSucceeds(getDoc(doc(owner, ...path('owner'))));
  await assertFails(getDoc(doc(other, ...path('owner'))));
  await assertFails(setDoc(doc(other, ...path('owner')), schema.defaults()));
  await assertFails(getDoc(doc(guest, ...path('owner'))));
  await assertFails(setDoc(doc(guest, ...path('owner')), schema.defaults()));
});
test('invalid schema and older timestamp denied', async () => {
  const db = env.authenticatedContext('validation').firestore(), ref = doc(db, ...path('validation'));
  await assertSucceeds(setDoc(ref, { ...schema.defaults(), updatedAt: 100 }));
  await assertFails(setDoc(ref, { ...schema.defaults(), updatedAt: 99 }));
  await assertFails(setDoc(ref, { ...schema.defaults(), updatedAt: 101, schemaVersion: 9 }));
});
