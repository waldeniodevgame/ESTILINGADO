  function updateHUD() {
    if($('specialBtn')){const a=E.active(game);$('specialBtn').textContent=a?(a.type===12?'Morteiro Âncora · '+(anchorTargeting?'cancelar seleção':a.cooldown?'recarga '+Math.max(0,a.cooldown-1)+' turnos':'escolher ponto'):`Especial: ${T[a.type].skill} · ${a.cooldown?('recarga '+Math.max(0,a.cooldown-1)+' turnos'):'pronto'}`):'Especial';$('specialBtn').disabled=!humanTurn()||!a||a.cooldown>0||game.special;}
    const local=game.mode==='local', isHuman=scene==='game'&&game.phase==='planning'&&(game.team===0||local)&&!paused&&!isModal();
    for(const team of [0,1]){
      const prefix=team?'enemy':'player', l=game.leaders[team];
      $(prefix+'HP').textContent=`${l.hp} / ${l.maxHP}`;$(prefix+'Bar').style.width=`${Math.max(0,l.hp/l.maxHP*100)}%`;
      $(prefix+'Energy').textContent=`${l.energy}/6`;
      $(prefix+'Pips').innerHTML=Array.from({length:6},(_,i)=>`<i class="${i<l.energy?'on':''}"></i>`).join('');
      for(const u of game.units.filter(u=>u.team===team)){
        const card=document.querySelector(`[data-unit="${u.id}"]`);if(!card)continue;
        card.classList.toggle('selected',scene==='game'&&u.id===game.activeId);card.classList.toggle('enemy-selected',team===1&&u.id===game.activeId&&scene==='game');card.classList.toggle('dead',!u.alive);
        card.querySelector('.tiny-bar i').style.width=`${u.hp/u.maxHP*100}%`;
        card.querySelector('.monster-pv').textContent=u.alive?u.hp:'KO';
        card.setAttribute('aria-label',`${T[u.type].name}, ${u.hp} de ${u.maxHP} PV${u.id===game.activeId?', monstro da vez':''}. Ver habilidade.`);
      }
    }
    $('comboMetric').textContent=String(game.bestCombo).padStart(2,'0');updateInspector();
    $('modeLabel').textContent=local?'Jade × Ametista':'Você × IA';
    $('playerSide').textContent=local?'JOGADOR 1':'EQUIPE JADE';
    document.querySelector('.player .panel-heading h2').textContent=local?'Capitão Jade':'Seu capitão';
    document.querySelector('.squad-panel h2').textContent=local?'Esquadrão Jade':'Seu esquadrão';
    $('enemyType').textContent=local?'Jogador 2 · Mesmo aparelho':`IA · ${game.difficulty==='relaxed'?'Explorador':'Tático'}`;
    $('turnLabel').textContent=scene==='menu'?'PREPARE-SE':scene==='result'?'FIM DE PARTIDA':`TURNO ${String(game.turn).padStart(2,'0')}`;
    $('pauseBtn').disabled=scene!=='game';$('restartBtn').disabled=scene!=='game';
    $('pauseBtn').setAttribute('aria-label',paused?'Continuar partida':'Pausar partida');
    const wounded=E.alive(game,game.team).some(u=>u.hp<u.maxHP), energy=game.leaders[game.team].energy;
    $('healBtn').disabled=!isHuman||!!drag||energy<C.healCost||!wounded||game.usedSkills.length>0;
    $('focusBtn').disabled=!isHuman||!!drag||energy<C.focusCost||game.usedSkills.length>0;
    $('focusBtn').classList.toggle('activated',game.focus);
    $('skillsNote').textContent=game.focus?'Sobrecarga: +8 no primeiro impacto.':local?`Habilidades da equipe ${teamName(game.team)}. +2 energia por turno.`:'+2 energia por turno; máximo 6. Uma habilidade do comandante por turno.';
    $('cancelBtn').hidden=!drag&&!anchorTargeting;
    $('cancelBtn').textContent=anchorTargeting?'Cancelar morteiro · Esc':'Cancelar mira · Esc';
    $('specialBtn').setAttribute('aria-pressed',String(anchorTargeting));
    if(scene==='game'){
      const a=E.active(game), isEnemy=game.team===1;
      $('statusBox').classList.toggle('enemy-turn',isEnemy);
      $('statusMark').textContent=paused?'Ⅱ':game.phase==='moving'?'✦':isEnemy&&!local?'◇':'↗';
      if(paused){$('statusTitle').textContent='Partida pausada.';$('statusSub').textContent='Continue quando estiver pronto.';}
      else if(game.phase==='vortex'){$('statusTitle').textContent='Vórtice da Âncora em andamento';$('statusSub').textContent='O próximo turno começa quando a sucção terminar.';}
      else if(game.phase==='moving'){$('statusTitle').textContent=`${T[a.type].name} em movimento`;$('statusSub').textContent='Ricochetes e habilidades estão resolvendo a jogada.';}
      else if(anchorTargeting){$('statusTitle').textContent='Morteiro do Âncora · escolha o núcleo';$('statusSub').textContent='Clique ou toque na arena para disparar.';}else if(isEnemy&&!local){$('statusTitle').textContent=aiAim?'A IA encontrou uma trajetória.':'A IA está preparando a jogada.';$('statusSub').textContent=`Vez de ${T[a.type].name} · Equipe Ametista`;}
      else if(drag){const force=Math.min(100,Math.round(Math.hypot(drag.dx,drag.dy)/C.maxDrag*100));$('statusTitle').textContent=`Força ${force}% · Solte para lançar`;$('statusSub').textContent=force<7?'Puxe um pouco mais para realizar o tiro.':preview&&preview.combos?`${preview.combos} ${preview.combos===1?'aliado no caminho':'aliados no caminho'} · Prévia até o primeiro impacto`:'Prévia até o primeiro impacto · Esc cancela';}
      else{$('statusTitle').textContent=local?`Equipe ${teamName(game.team)} · Vez de ${T[a.type].name}`:`Sua vez · Lance ${T[a.type].name}`;$('statusSub').textContent='Segure o monstro destacado, puxe para trás e solte.';}
    }
    if(guidedPractice&&scene==='game'&&humanTurn()&&game.phase==='planning'){
      const next=!guidedDone.aim?['TREINO 1/4 · PUXE O MONSTRO','Segure a unidade destacada. Puxe o dedo para trás, afastando do alvo, e solte para lançar.']:
        !guidedDone.combo?['TREINO 2/4 · ARREMESSE EM UM ALIADO','Na próxima mira, passe por um aliado antes de atingir o rival. O contato ativa o combo.']:
        !guidedDone.captain?['TREINO 3/4 · USE O CAPITÃO','Antes do tiro, teste uma habilidade do capitão. Energia: 3 no início, depois +2 por turno seu, até 6.']:
        !guidedDone.special?['TREINO 4/4 · USE O ESPECIAL DA UNIDADE','O especial muda com a criatura ativa. Pode ser usado antes do tiro quando estiver pronto.']:
        ['CHECKLIST 4/4 · PRATIQUE LIVRE','Você explorou mira, combo e poderes. O treino segue aberto para novas tentativas e ajustes.'];
      $('statusTitle').textContent=next[0];$('statusSub').textContent=next[1];
    }
    updateTutorialCoach();
  }
