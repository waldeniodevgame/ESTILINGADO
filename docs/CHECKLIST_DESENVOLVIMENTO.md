# Checklist ativo de desenvolvimento

Marque apenas depois de executar o teste indicado. Data da organização inicial: **26/10/2026**.

## Repositório e fontes

- [x] Build-base `TESTE LULA 26 - ARRASTO CORRIGIDO` versionada.
- [x] Build `TESTE LULA 26 - IMÃ DANO ALIADO CORRIGIDO` versionada.
- [x] Biblioteca modular, JSON, CSS, JS, assets e compilador versionados.
- [x] Índice e registro de progresso adicionados.
- [ ] Consolidar a build atual de teste e `CMC_Biblioteca` em uma única fonte de verdade.

## Regressão crítica

- [ ] Abrir a build atual sem erro no console.
- [ ] Arrastar e soltar a partir de bordas e cantos, inclusive com o ponteiro fora do canvas.
- [ ] Encerrar um lançamento sem turno, timer ou efeito duplicado.
- [ ] Confirmar vitória pela queda do Capitão.
- [ ] Confirmar rebirth após três turnos de outras criaturas e ordem correta para mortes simultâneas.
- [ ] Reiniciar partida sem referência, poça, vórtice ou timer residual.

## Colisão e dano

- [ ] Ímã: lançar contra inimigos e confirmar que ele não perde HP por dano de parede/bumpeamento no próprio turno.
- [ ] Lançar qualquer outra criatura aliada contra inimigos e repetir a mesma confirmação.
- [ ] Confirmar dano único por contato válido em inimigo.
- [ ] Confirmar que aliado atravessado gera somente o combo esperado, sem dano nem resposta física indevida.
- [ ] Confirmar que inimigos atingidos por bump podem receber dano conforme os contatos sofridos.

## Criaturas e poderes

- [ ] Rebatedor: parede → inimigo A → parede → inimigo B.
- [ ] Fornalha: combo de 0, 1, 2 e 3 aliados; explosão e lava.
- [ ] Âncora: mira, núcleo, área, sucção suave, duração de 3 s e dano inimigo.
- [ ] Glacial: status Gelo, lentidão e redução de deslocamento recebido.
- [ ] Eco e Pulso: atravessamento de aliados, cura/escudo e trajetória sem desvio indevido.
- [ ] Lulla: lançamento, tentáculos, dano e fluidez sem congelamento.
- [ ] Reator: contador, explosão no turno adversário e limpeza após morte/reinício.

## Interface e responsividade

- [ ] PC: 1366×768 e 1920×1080.
- [ ] Mobile: 360×800, 390×844 e 430×932.
- [ ] Sem rolagem horizontal e com arena legível.
- [ ] HUD, mira e toque alinhados após resize/rotação.
