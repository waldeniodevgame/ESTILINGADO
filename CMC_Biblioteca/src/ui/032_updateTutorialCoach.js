  function updateTutorialCoach(){
    const coach=$("tutorialCoach");
    const focused=firstTutorialOnly&&scene==="game"&&!paused&&game.phase==="planning";
    const guided=guidedPractice&&!firstTutorialOnly&&scene==="game"&&!paused&&humanTurn()&&game.phase==="planning";
    const visible=focused||guided;
    coach.hidden=!visible;
    if(!visible)return;
    if(focused){
      const steps={
        marcelo:["ETAPA 1/10 · MARCELO · DOIS IMPACTOS","Puxe e solte. Marcelo ativa o combo de cada aliado atravessado, para no impacto e martela o alvo imóvel."],
        voltage1:["ETAPA 2/10 · VOLTAGEM · 1º ALIADO","Atravesse Voltagem primeiro: ela dispara 2 raios em inimigos aleatórios, com 15 de dano cada."],
        voltage2:["ETAPA 3/10 · VOLTAGEM · 2º ALIADO","Passe primeiro pela Fornalha e depois por Voltagem: o segundo elo dispara 3 raios aleatórios de 20 de dano."],
        voltage3:["ETAPA 4/10 · VOLTAGEM · COMBO 3×","Turbina é o último monstro da rotação. Fornalha prepara +8, Glacial aumenta o próximo empurrão em 25% e Voltagem, no terceiro elo, dispara 5 raios aleatórios de 30 de dano."],
        glacial1:["ETAPA 5/10 · GLACIAL · 1 ALIADO","Cruze um aliado antes do bot: cada inimigo atingido recebe +15 de gelo e perde 15% da força no próximo lançamento."],
        glacial2:["ETAPA 6/10 · GLACIAL · 2 ALIADOS","Cruze dois aliados: cada inimigo atingido recebe +20 de gelo e perde 15% da força no próximo lançamento."],
        glacial3:["ETAPA 7/10 · GLACIAL · 3 ALIADOS","Cruze três aliados: cada inimigo atingido recebe +30 de gelo e perde 20% da força no próximo lançamento."],
        echo1:["ETAPA 8/10 · ECO · BUMP +50%","Acerte o bot primeiro. No retorno, Eco redireciona o lançador e aumenta a força em 50%; funciona com aliados e inimigos."],
        echo2:["ETAPA 9/10 · ECO NÃO É O LANÇADOR","O próprio Eco não ativa o bump. Ele só reimpulsiona outra criatura depois que ela colide com um monstro."],
        anchor1:["ÂNCORA · MORTEIRO","Use Morteiro e clique na arena para escolher o núcleo do vórtice."],
        anchor2:["ETAPA 11/12 · ÂNCORA · VETOR +25%","Atravesse o aliado destacado antes do bot para preparar +25% de empurrão no próximo impacto."],
        furnace1:["ETAPA 10/13 · FORNALHA · EXPLOSÃO RADIAL","Acerte o bot central: até "+furnaceProfile.blastMaxDamage+" no centro; o dano cai até a borda do raio de "+furnaceProfile.blastRadius+" criaturas."],
        drill1:["ETAPA 11/13 · BROCA · 1 ALIADO","Atravesse 1 aliado antes do primeiro inimigo: a Broca ganha 20% de força de impacto."],
        drill2:["ETAPA 12/13 · BROCA · 2 ALIADOS","Atravesse 2 aliados antes do primeiro inimigo: a primeira colisão recebe 25% a mais de dano."],
        drill3:["ETAPA 13/13 · BROCA · 3 ALIADOS","Atravesse 3 aliados antes do primeiro inimigo: a primeira colisão recebe 30% a mais de dano."]
      };
      const step=steps[tutorialStage]||steps.marcelo;
      $("tutorialCoachTitle").textContent=step[0];$("tutorialCoachText").textContent=step[1];return;
    }
    const steps=[
      ["ETAPA 1/4 · IMPACTO DO MARCELO","Puxe Marcelo contra o alvo. No contato, ele freia, prende o rival no lugar e aplica a martelada após uma pausa."],
      ["ETAPA 2/4 · COMBO COM ALIADO","Mire através de um aliado antes de atingir o rival para ativar o combo."],
      ["ETAPA 3/4 · PODER DO CAPITÃO","Use uma habilidade do capitão antes de lançar. Ela gasta energia."],
      ["ETAPA 4/4 · PODER DA CRIATURA","Ative o especial da criatura quando estiver disponível."]
    ];
    const index=guideStepKeys.findIndex(key=>!guidedDone[key]);
    const step=index<0?["CHECKLIST 4/4 · CONTINUE EXPLORANDO","Mira, combos e poderes praticados. O treino e a partida continuam abertos para novas tentativas."]:steps[index];
    $("tutorialCoachTitle").textContent=step[0];$("tutorialCoachText").textContent=step[1];
  }
