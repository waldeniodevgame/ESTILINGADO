(()=>{
  const CONFIG={{DATA:nuvem}};
  const LOCAL_KEY='estilingadoProgress';
  let status='offline', db=null, user=null; const listeners=[];
  const emit=()=>listeners.forEach(fn=>{try{fn(status,user)}catch(_){}});
  const local=()=>{try{return JSON.parse(localStorage.getItem(LOCAL_KEY)||'{}')}catch(_){return {}}};
  const saveLocal=p=>{try{localStorage.setItem(LOCAL_KEY,JSON.stringify(p||{}))}catch(_){}};
  async function connect(){
    if(!CONFIG.enabled||!CONFIG.projectId){status='offline';emit();return null}
    try{
      if(!window.firebase){for(const src of ['https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js']) await new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
      if(!firebase.apps.length) firebase.initializeApp({apiKey:CONFIG.apiKey,authDomain:CONFIG.authDomain,projectId:CONFIG.projectId,storageBucket:CONFIG.storageBucket,messagingSenderId:CONFIG.messagingSenderId,appId:CONFIG.appId});
      user=firebase.auth().currentUser||await firebase.auth().signInAnonymously().then(x=>x.user); db=firebase.firestore(); status='online';emit(); return user
    }catch(e){status='error';emit();return null}
  }
  const merge=(a,b)=>{const out={...(a||{})};Object.keys(b||{}).forEach(k=>{if(typeof b[k]==='number'&&typeof out[k]==='number')out[k]=Math.max(out[k],b[k]);else if(out[k]==null)out[k]=b[k]});return out};
  async function hydrate(p){const base=p||local();const u=await connect();if(!u||!db)return base;try{const ref=db.collection(CONFIG.collection||'players').doc(u.uid);const snap=await ref.get();const remote=snap.exists?snap.data().progress||{}:{};const out=merge(base,remote);await ref.set({progress:out,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});saveLocal(out);return out}catch(_){return base}}
  async function saveProgress(p){saveLocal(p);if(status!=='online'||!db||!user)return p;try{await db.collection(CONFIG.collection||'players').doc(user.uid).set({progress:p,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true})}catch(_){}return p}
  async function signInGoogle(){if(!CONFIG.googleLogin||!window.firebase)return null;try{return (await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())).user}catch(_){return null}}
  window.EloCloud={config:CONFIG,connect,hydrate,saveProgress,signInGoogle,onStatus:fn=>(listeners.push(fn),()=>listeners.splice(listeners.indexOf(fn),1)),getStatus:()=>status,getUser:()=>user};
})();
