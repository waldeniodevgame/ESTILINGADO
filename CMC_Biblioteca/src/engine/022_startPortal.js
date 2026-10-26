  function startPortal(g, x, y) {
    if(g.phase!=='planning')return false;const a=active(g);if(!a||!a.alive||a.type!==8)return false;
    a.x=clamp(x,C.left+C.radius,C.right-C.radius);a.y=clamp(y,C.top+C.radius,C.bottom-C.radius);
    g.phase='moving';g.shot={actorId:a.id,vx:0,vy:0,elapsed:0,ticks:0,bounces:0,hitIds:[],comboIds:[],comboCount:0,glacialRank:0,drillRank:0,echoBumpIds:[],echoPassLocks:{},guardUsed:[false,false],damageByTarget:{},eventsCount:0,focus:g.focus,done:true,solidContact:{id:a.id,x:a.x,y:a.y},trail:[],portal:true};
    const radius=F.portalRadius*C.radius;for(const u of alive(g,1-a.team)){const d=distance(u,a);if(d<=radius)applyDamage(g,u,Math.round(F.portalDamage*(1-d/radius)),a.id,'portal');}
    event(g,'portal',{actor:a.id,x:a.x,y:a.y,radius,maxDamage:F.portalDamage});return true;
  }
