# Checklist ativo de desenvolvimento

Marque apenas depois de executar o teste indicado. Painel de navegação: [Índice de desenvolvimento](INDICE_DESENVOLVIMENTO.md). Base oficial: [`TESTgordon/TESTE26gordon.html`](../TESTgordon/TESTE26gordon.html).

## Estado resumido

- [x] Base Gordon definida e preservada como referência.
- [x] Arena de Teste existente com editor, telemetria e replay de lançamento.
- [x] Android aprovado com as configurações atuais de câmera e arena.
- [ ] PC reproduz todos os efeitos de câmera/arena aprovados no Android.
- [ ] Regressão crítica de combate concluída nas plataformas-alvo.

## Câmera e efeitos de arena — prioridade atual

**Guardrail:** não mudar configurações atuais nem a base Gordon. Primeiro capturar e comparar Android x PC, na Arena de Teste e no Jogo Livre.

### Preparação

- [ ] CAM-01 Criar uma cópia de trabalho da build Gordon com nome/data.
- [ ] CAM-02 Registrar Android: aparelho, navegador, resolução e orientação.
- [ ] CAM-03 Registrar PC: navegador, resolução, escala do sistema e zoom do navegador.
- [ ] CAM-04 Abrir o [plano de captura](CAMERA_PC_CAPTURA.md) e separar as evidências.

### Arena de Teste

- [ ] CAM-05 Reproduzir lançamento normal no Android e gravar/registrar.
- [ ] CAM-06 Reproduzir o mesmo lançamento no PC e comparar.
- [ ] CAM-07 Reproduzir impacto forte em parede nos dois ambientes.
- [ ] CAM-08 Reproduzir colisão entre unidades nos dois ambientes.
- [ ] CAM-09 Reproduzir especial/Vórtice disponível nos dois ambientes.
- [ ] CAM-10 Verificar retorno ao estado neutro após cada efeito.

### Jogo Livre

- [ ] CAM-11 Reproduzir lançamento normal no Android e no PC.
- [ ] CAM-12 Reproduzir impacto/combate que deveria ativar efeito de arena.
- [ ] CAM-13 Reproduzir especial de Capitão e efeito de arena disponível.
- [ ] CAM-14 Verificar vitória, reinício, resize e rotação sem câmera/HUD desalinhados.

### Diagnóstico e correção

- [ ] CAM-15 Registrar qual evento diverge e se ele é reproduzível.
- [ ] CAM-16 Identificar se a causa é viewport/DPI, CSS/filtro, mouse/touch ou estado de jogo.
- [ ] CAM-17 Aplicar uma única correção em cópia isolada.
- [ ] CAM-18 Validar a correção no PC sem regressão no Android.
- [ ] CAM-19 Atualizar changelog, checklist e referência da cópia aprovada.

## Repositório e fontes

- [x] Build-base Gordon documentada como fonte de verdade.
- [x] Biblioteca modular, JSON, CSS, JS, assets e compilador versionados.
- [x] Índice, checklist e registro de progresso adicionados.
- [ ] Consolidar a build atual de teste e `CMC_Biblioteca` em uma única fonte de verdade, sem substituir a base Gordon.

## Regressão crítica

- [ ] Abrir a cópia de teste sem erro no console.
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