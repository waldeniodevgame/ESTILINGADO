  function consumeEvents() {
    const entries=game.events.slice(seenEvents);seenEvents=game.events.length;
    const shotActorByTurn=new Map(entries.filter(item=>item.type==='shot-end').map(item=>[item.turn,item.actor]));
    for(const e of entries){
      if(e.type==='anchor-cast'){ring(e.x,e.y,'#79cfff',e.radius);floating(e.x,e.y-28,'ÂNCORA · VÓRTICE '+e.duration+' s','#bfeaff');addLog('Âncora: vórtice · '+e.damage+' PV a cada '+e.interval+' s. Aliados são puxados sem dano.','combo');tone('combo');startImpactCamera(e);if(firstTutorialOnly&&anchorTutorial())tutorialRun.vortexCast=true;}
      if(e.type==='anchor-expire'){ring(e.x,e.y,'#79cfff',C.radius*ANCHOR.radiusInCreatureRadii);if(firstTutorialOnly&&anchorTutorial()&&tutorialRun.vortexCast)showFocusedTutorialDialog('success');}

      const target=E.unit(game,e.target), actor=E.unit(game,e.actor), source=E.unit(game,e.source);
      if(firstTutorialOnly&&tutorialStage==='marcelo'&&e.type==='damage'&&e.source==='0-0'&&e.tag==='enemy')tutorialRun.collision=true;
      if(firstTutorialOnly&&tutorialStage==='marcelo'&&e.type==='hammer'&&e.actor==='0-0')tutorialRun.hammer=true;
      if(firstTutorialOnly&&voltageTutorial()&&e.type==='lightning'&&e.launcher===tutorialActorId()){
        tutorialRun.lightning++;tutorialRun.lightningTiers.push(e.tier);tutorialRun.lightningDamage.push(e.damage);tutorialRun.lightningTargets.push(e.target);
      }
      if(firstTutorialOnly&&glacialTutorial()&&e.type==='frost-charge'&&e.actor===tutorialActorId())tutorialRun.frostCharges.push(e.rank);
      if(firstTutorialOnly&&glacialTutorial()&&e.type==='freeze'&&e.actor===tutorialActorId())tutorialRun.frost.push({rank:e.rank,damage:e.bonus,slowPercent:e.slowPercent,target:e.target});
      if(firstTutorialOnly&&echoTutorial()&&e.type==='damage'&&e.source===tutorialActorId()&&e.target==='1-0'&&e.tag==='enemy')tutorialRun.botDamage=true;
      if(firstTutorialOnly&&echoTutorial()&&e.type==='echo-bump'&&e.actor===tutorialActorId())tutorialRun.echoBumps.push({bumper:e.bumper,target:e.target,afterHit:e.afterMonsterCollision,multiplier:e.multiplier});
      if(firstTutorialOnly&&echoTutorial()&&e.type==='echo-pass'&&e.actor===tutorialActorId())tutorialRun.echoPasses.push({echo:e.echo,reason:e.reason});
      if(firstTutorialOnly&&prismTutorial()&&e.type==='portal'&&e.actor===tutorialActorId())tutorialRun.prismPortal=true;
      if(firstTutorialOnly&&furnaceTutorial()&&e.type==='explosion'&&e.actor===tutorialActorId())tutorialRun.furnaceBlasts.push({target:e.target,maxDamage:e.maxDamage,radius:e.radius,targets:e.targets||[]});
      if(firstTutorialOnly&&drillTutorial()&&e.type==='drill-charge'&&e.actor===tutorialActorId()){tutorialRun.drillRanks.push(e.rank);tutorialRun.drillDamage.push(e.damagePercent||e.forcePercent);}
      if(guidedPractice){
        if(e.type==='shot-end'&&String(e.actor||'').startsWith('0-')&&markGuideStep('aim'))toast('Primeiro disparo praticado. Agora prepare um combo com aliado.');
        const comboUnit=E.unit(game,e.actor),launchActorId=game.shot?.actorId||shotActorByTurn.get(e.turn);
        if(e.type==='combo'&&comboUnit&&comboUnit.team===0&&launchActorId&&comboUnit.id!==launchActorId&&markGuideStep('combo'))toast('Combo realizado. A próxima etapa apresenta os poderes.');
        if(e.type==='skill'&&e.team===0)markGuideStep('captain');
        if(e.type==='ability'&&String(e.actor||'').startsWith('0-'))markGuideStep('special');
        if(!guidedDone.notified&&guideStepKeys.every(key=>guidedDone[key])){guidedDone.notified=true;setTimeout(()=>toast('Checklist explorado. O treino continua aberto para novas tentativas.'),120);}
      }
      if(e.type==='lightning'){
        effects.push({kind:'lightning',x:e.x,y:e.y,toX:e.toX,toY:e.toY,index:e.index,seed:e.seed,age:0,life:.48,color:'#ffe168'});
        ring(e.toX,e.toY,'#ffe168',34);burst(e.toX,e.toY,'#fff0a0',5,45);
        if(e.index===1){addLog(`Voltagem: ${e.count} raios · ${e.damage} de dano cada.`, 'combo');tone('combo');}
      } else if(e.type==='drill-charge'){ring(e.x,e.y,'#f0bc56',42);floating(e.x,e.y-34,`BROCA · ${e.forcePercent||e.damagePercent}%`,'#f0bc56');addLog(`Broca atravessou ${e.rank} aliado${e.rank===1?'':'s'}: ${e.forcePercent?`+${e.forcePercent}% de força`:`+${e.damagePercent}% de dano de colisão`}.`,'combo');tone('combo');}
      else if(e.type==='frost-charge'){
        ring(e.x,e.y,'#72dfff',42);floating(e.x,e.y-28,`CARGA DE GELO ${e.rank}/3`,'#72dfff');
        addLog(`Glacial cruzou o aliado ${e.rank}: +${e.damage} de gelo por alvo; força −${e.slowPercent}% no próximo lançamento.`,'combo');tone('combo');
      } else if(e.type==='freeze'){
        ring(e.x,e.y,'#72dfff',62);burst(e.x,e.y,'#b8f2ff',9,68);floating(e.x,e.y-43,`FORÇA −${e.slowPercent}% NO PRÓXIMO TIRO`,'#72dfff');
        addLog(`Congelamento: +${e.bonus} de dano; próximo lançamento do alvo −${e.slowPercent}% de força.`,'combo');tone('combo');
      } else if(e.type==='slow-consumed'){
        floating(e.x,e.y-32,`FORÇA −${e.percent}%`,'#72dfff');ring(e.x,e.y,'#72dfff',42);
      } else if(e.type==='echo-pass'){
        const waiting=e.reason==='needs-impact';ring(e.x,e.y,'#ed9fdf',42);floating(e.x,e.y-34,waiting?'ECO AGUARDA IMPACTO':'ECO LANÇADO · SEM BUMP','#ed9fdf');
        if(!waiting)addLog('Eco não impulsiona o próprio lançamento. Use outra criatura para ativar o bump.','combo');
      } else if(e.type==='echo-bump'){
        beam(e.x,e.y,e.toX,e.toY,'#ed9fdf');ring(e.x,e.y,'#ed9fdf',66);burst(e.x,e.y,'#f7c3f0',9,72);floating(e.toX,e.toY-34,'BUMPER · +50% FORÇA','#ed9fdf');
        const bumper=E.unit(game,e.bumper),boosted=E.unit(game,e.target);
        if(bumper&&boosted)addLog(`${T[bumper.type].name} redirecionou ${T[boosted.type].name}: +50% de força após o impacto.`,'combo');tone('combo');
      } else if(e.type==='furnace-contact'){
        floating(e.x,e.y-22,'CONTATO · −'+e.amount,'#ffb46b');ring(e.x,e.y,'#ff925e',30);
      } else if(e.type==='furnace-ally-pass'){
        ring(e.x,e.y,'#ffb46e',30);floating(e.x,e.y-25,'FORNALHA · +'+e.count,'#ffb46b');
      } else if(e.type==='explosion'){
        effects.push({kind:'furnace-blast',x:e.x,y:e.y,radius:e.radius,age:0,life:e.durationSeconds||.42});
        effects.push({kind:'flash',x:e.x,y:e.y,radius:Math.min(e.radius,180),age:0,life:e.durationSeconds||.42,color:'#ff925e'});
        floating(e.x,e.y-34,'EXPLOSÃO · '+e.maxDamage+' MÁX.','#ffb46b');startImpactCamera(e);tone('hit');if(!reducedMotion)shake=Math.min(7,shake+5);
        addLog('Fornalha detonou no contato; dano radial em '+e.targetCount+' criaturas.','hit');
      } else if(e.type==='furnace-lava-create'){
        ring(e.x,e.y,'#ff7d3d',e.radius);floating(e.x,e.y-38,'POÇA DE LAVA · −'+e.damage+'/turno','#ff9c54');
        addLog('A Fornalha deixou uma poça de lava até o próximo turno dela.','hit');
      } else if(e.type==='furnace-lava-damage'){
        floating(e.x,e.y-20,'−'+e.amount,'#ff7d3d');ring(e.x,e.y,'#ff7d3d',24);
      } else if(e.type==='damage'){
        floating(e.x,e.y-20,'−'+e.amount,e.tag==='explosion'?'#ff925e':e.tag==='freeze'?'#72dfff':e.tag==='guard'?'#ed9bbd':gold);ring(e.x,e.y,e.tag==='explosion'?'#ff925e':e.tag==='lightning'?'#ffe168':e.tag==='freeze'?'#72dfff':'#edb290',e.tag==='explosion'?40:e.tag==='lightning'||e.tag==='freeze'?30:22);
        if(e.tag==='enemy'||e.tag==='leader'){tone('hit');if(!reducedMotion)shake=Math.min(4,shake+2);}
        if(e.tag==='leader'||e.tag==='loss')addLog(`${teamName(Number(e.target.slice(-1)))} perdeu ${e.amount} PV no capitão.`,'hit');
      } else if(e.type==='heal'){floating(e.x,e.y-20,`+${e.amount}`,jade);ring(e.x,e.y,jade,37);tone('heal');}
      else if(e.type==='captain-contact'){
        ring(e.x,e.y,e.friendly?teamColor(e.team):gold,62);
        floating(e.x,e.y-34,e.friendly?'BUMP · CAPITÃO':'CAPITÃO ATINGIDO',e.friendly?teamColor(e.team):gold);
      } else if(e.type==='impact'){
        ring(e.x,e.y,'#fff0b1',88);burst(e.x,e.y,'#fff0b1',14,118);effects.push({kind:'flash',x:e.x,y:e.y,radius:62,age:0,life:.24,color:'#fff0b1'});
        floating(e.x,e.y-31,'IMPACTO 1/2',gold);startImpactCamera(e);tone('hit');if(!reducedMotion)shake=Math.min(6,shake+4);
        if(actor)addLog(e.targetKind==='captain'?(e.friendly?'Marcelo grudou no capitão aliado sem causar dano.':'Marcelo acertou o capitão no primeiro impacto.'):(T[actor.type].name+' parou no primeiro impacto e causou dano alto.'),'hit');
      } else if(e.type==='hammer'){
        hammerSwing(e.x,e.y,e.angle);burst(e.x,e.y,'#ffd873',9,82);ring(e.x,e.y,'#ffd873',64);floating(e.x,e.y-30,'MARTELADA 2/2',gold);tone('hit');if(!reducedMotion)shake=Math.min(6,shake+3);
        if(actor)addLog(e.targetKind==='captain'?(e.friendly?'A martelada atingiu o capitão aliado sem dano.':'A martelada de Marcelo atingiu o capitão.'):(T[actor.type].name+' acertou a segunda pancada; o rival permaneceu parado.'),'hit');
      } else if(e.type==='combo'){
        beam(e.x,e.y,e.toX,e.toY,gold);ring(e.x,e.y,gold,42);ring(e.toX,e.toY,gold,78);burst(e.toX,e.toY,'#ffd477',10,76);
        comboBanner={count:e.count,ttl:1.65,x:e.toX,y:e.toY-66,unit:T[actor.type].name};
        addLog(T[actor.type].name+' ativou o elo '+e.count+' e atingiu '+(firstTutorialOnly?'o bot de exemplo':T[target.type].name)+'.','combo');tone('combo');
      } else if(e.type==='ability'){
        if(e.key==='0'){ring(e.x,e.y,'#ff925e',92);burst(e.x,e.y,'#ff925e',12,82);}
        else if(e.key==='3'){ring(e.x,e.y,gold,44);if(!reducedMotion)shake=4;}
        else if(e.key==='1'){ring(e.x,e.y,'#ffe168',60);for(let i=0;i<8;i++){const angle=i*Math.PI/4;beam(e.x,e.y,e.x+Math.cos(angle)*45,e.y+Math.sin(angle)*45,'#ffe168');}}
        else if(e.key==='2'){ring(e.x,e.y,'#72dfff',52);floating(e.x,e.y-25,'GELO','#72dfff');}
        else ring(e.x,e.y,T[actor.type].color,48);
      } else if(e.type==='portal'){ring(e.x,e.y,'#ee7bc7',40);ring(e.toX,e.toY,'#ee7bc7',40);beam(e.x,e.y,e.toX,e.toY,'#ee7bc7');
      } else if(e.type==='guard'){
        beam(e.x,e.y,e.toX,e.toY,teamColor(e.team));ring(e.x,e.y,teamColor(e.team),73);tone('guard');
        addLog(`Capitão ${teamName(e.team)} revidou com 16 de dano.`,'hit');
      } else if(e.type==='death'){
        ring(e.x,e.y,T[target.type].color,55);floating(e.x,e.y,'KO','#f1eee0');tone('death');
        addLog(`${T[target.type].name} de ${teamName(e.team)} foi derrotado.`,'hit');
        for(let i=0;i<10;i++){const angle=i/10*Math.PI*2;effects.push({kind:'spark',x:e.x,y:e.y,vx:Math.cos(angle)*65,vy:Math.sin(angle)*65,color:T[target.type].color,age:0,life:VFX.beamLife5});}
      } else if(e.type==='push'){beam(e.oldX,e.oldY,e.x,e.y,'#a8c8ff');}
      else if(e.type==='skill')addLog(`${teamName(e.team)} usou ${e.key==='heal'?'Cura':'Foco'}.`,e.key==='heal'?'heal':'combo');
      else if(e.type==='launch')tone('launch');
      else if(e.type==='shot-end'){
        addLog('Tiro: '+(e.damage||0)+' dano · '+e.combos+' assistências.','combo');
        if(firstTutorialOnly&&e.actor===tutorialActorId()){
          let passed=tutorialRun.collision&&tutorialRun.hammer;
          if(voltageTutorial()){
            const tier=tutorialStage==='voltage1'?1:tutorialStage==='voltage2'?2:3;
            const count=tier===1?2:tier===2?3:5,damage=tier===1?15:tier===2?20:30;
            const uniqueTargets=new Set(tutorialRun.lightningTargets).size;
            passed=tutorialRun.lightning===count&&tutorialRun.lightningTiers.every(value=>value===tier)&&tutorialRun.lightningDamage.every(value=>value===damage)&&(tier===3?uniqueTargets>=4:uniqueTargets===count);
          } else if(glacialTutorial()){
            const tier=tutorialStage==='glacial1'?1:tutorialStage==='glacial2'?2:3;
            const damage=[0,15,20,30][tier],slow=tier===3?20:15;
            passed=tutorialRun.frostCharges.length===tier&&tutorialRun.frostCharges.every(value=>value<=tier)&&tutorialRun.frost.length>=1&&tutorialRun.frost.every(hit=>hit.rank===tier&&hit.damage===damage&&hit.slowPercent===slow);
          } else if(echoTutorial()){
            passed=tutorialRun.botDamage&&(tutorialStage==='echo1'
              ?tutorialRun.echoBumps.some(hit=>hit.target===tutorialActorId()&&hit.afterHit&&hit.multiplier===1.5)
              :tutorialRun.echoBumps.length===0&&tutorialRun.echoPasses.some(hit=>hit.reason==='echo-launcher'));
          } else if(drillTutorial()){
             const tier=tutorialStage==='drill1'?1:tutorialStage==='drill2'?2:3;
             const expected=tier===1?20:tier===2?25:30;
             passed=tutorialRun.drillRanks.length===tier&&tutorialRun.drillRanks.every(value=>value<=tier)&&tutorialRun.drillDamage.includes(expected);
           } else if(prismTutorial()){
             passed=tutorialRun.prismPortal;
           } else if(genericTutorial()){
            passed=true;
          } else if(furnaceTutorial()){
            const blast=tutorialRun.furnaceBlasts.find(item=>item.target==='1-0');
            const falloff=(blast?.targets||[]).filter(item=>item.damage>0).sort((a,b)=>a.distance-b.distance);
            passed=!!blast&&blast.maxDamage===furnaceProfile.blastMaxDamage&&blast.radius===furnaceProfile.blastRadius*C.radius&&falloff.length===4&&falloff[0].id==='1-0'&&falloff[0].distance===0&&falloff[0].damage===furnaceProfile.blastMaxDamage&&falloff.every((item,index)=>index===0||(item.distance>falloff[index-1].distance&&item.damage<falloff[index-1].damage));
          }
          showFocusedTutorialDialog(passed?'success':'missed');
        }
      }
      else if(e.type==='bounce'){effects.push({kind:'spark',x:e.x,y:e.y,vx:0,vy:0,color:jade,age:0,life:.18});tone('wall');}
      else if(e.type==='turn'){addLog(`Turno ${e.turn}: ${T[actor.type].name} de ${teamName(e.team)}.`);const l=$('turnLabel');l.classList.remove('turn-change');void l.offsetWidth;l.classList.add('turn-change');aiToken=0;aiAim=null;}
      else if(e.type==='victory')showResult();
    }
    updateHUD();
  }
