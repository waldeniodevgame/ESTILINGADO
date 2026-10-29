(function (root) {
  'use strict';
  root.createCapsuleFirebase = async function (config) {
    if (!config || !config.enabled) return null;
    if (['apiKey', 'authDomain', 'projectId', 'appId'].some(k => !config[k] || config[k].startsWith('YOUR_'))) {
      throw Error('Preencha a configuração pública do Firebase.');
    }
    // Loaded only for explicitly configured cloud mode; local play has no CDN dependency.
    const version = '10.14.1';
    const [appSdk, authSdk, dbSdk] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${version}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${version}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${version}/firebase-firestore.js`)
    ]);
    const app = appSdk.initializeApp(config, 'capsulemon-cloud-v1');
    const auth = authSdk.getAuth(app), db = dbSdk.getFirestore(app);
    await authSdk.setPersistence(auth, authSdk.browserLocalPersistence);
    const ref = uid => dbSdk.doc(db, 'players', uid, 'save', 'main');
    return {
      auth: {
        onAuthStateChanged: fn => authSdk.onAuthStateChanged(auth, fn),
        loginGoogle: () => authSdk.signInWithPopup(auth, new authSdk.GoogleAuthProvider()),
        logout: () => authSdk.signOut(auth)
      },
      cloud: {
        async read(uid) {
          const snap = await dbSdk.getDocFromServer(ref(uid));
          return snap.exists() ? snap.data() : null;
        },
        async reconcile(uid, resolve) {
          // No offline write queue: a server transaction always resolves conflicts first.
          return dbSdk.runTransaction(db, async transaction => {
            const doc = ref(uid), snap = await transaction.get(doc);
            const decision = resolve(snap.exists() ? snap.data() : null);
            if (decision.write) transaction.set(doc, decision.data);
            return decision.data;
          });
        }
      }
    };
  };
})(globalThis);
