  function placeTutorialUnits(state,stage){
    const formations={{DATA:ui_formations}};
    const positions=formations[stage]||formations.marcelo;
    for(const u of state.units){
      const p=positions[u.id];if(!p)continue;
      const x=C.right-(p[1]-C.top)*(C.right-C.left)/(C.bottom-C.top);
      const y=C.top+(p[0]-C.left)*(C.bottom-C.top)/(C.right-C.left);
      u.x=E.clamp(x,C.left+C.radius,C.right-C.radius);u.y=E.clamp(y,C.top+C.radius,C.bottom-C.radius);u.vx=0;u.vy=0;
    }
    if(stage==="voltage3"){state.activeId="0-3";state.cursors[0]=3;}else if(prismTutorial()||glacialTutorial()||echoTutorial()||furnaceTutorial()||drillTutorial()||anchorTutorial()){state.activeId="0-0";state.cursors[0]=0;}
  }
