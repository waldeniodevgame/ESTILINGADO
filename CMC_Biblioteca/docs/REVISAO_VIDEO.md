# Revisão guiada pelo vídeo — 23/10/2026

Referência: 2026-10-23 14-54-49(1).mp4. A fala foi transcrita antes da implementação.

## Pedidos identificados

- 00:00–00:46: o círculo do morteiro é grande demais; reduzir.
- 00:46–01:08: permitir desmarcar o morteiro para selecionar outra energia/habilidade.
- 01:08–fim: Fornalha começa a atacar enquanto é puxada, trava e causa dano ao jogador; impedir essa interação simultânea.

## Alterações

| Arquivo | Campo/função | Antes | Agora |
|---|---|---|---|
| dados/ancora_vortex.json | radiusInCreatureRadii | 10 (190 unidades) | 5 (95 unidades) |
| src/engine/ancora_vortex.js | castAnchorVortex | Troca de turno imediata | Fase `vortex` conserva o turno até a expiração |
| src/engine/ancora_vortex.js | stepWorld | Só expira o efeito | Expira e começa o próximo turno uma única vez |
| src/ui/068_renderStory.js | specialBtn.onclick | Reativava a seleção | Segundo clique cancela |
| src/ui/068_renderStory.js | controles data-extra | Mantinha mira do morteiro | Cancela a mira ao escolher outro poder |
| src/ui/052_humanSkill.js | humanSkill | Mantinha mira | Cura/Sobrecarga cancelam a mira |
| src/ui/017_updateHUD.js | updateHUD | Sem status da resolução | Indica vórtice em andamento e cancelar morteiro |

A redução pela metade é um valor de teste: o vídeo não especifica uma medida numérica. Raio cai 50%; área do círculo cai 75%. Mira e efeito usam a mesma tabela.

Sucção (60), duração (3 s), dano (7 a cada 0,5 s), custo/recarga e atributos dos demais monstros foram mantidos. Fornalha continua podendo atacar no turno seguinte, depois que a sucção termina. Não houve nerf no dano dela.

A sobreposição no núcleo não faz parte desta correção: o pedido falado foi reduzir a área, cancelar a seleção e impedir o ataque simultâneo. O vórtice ainda usa o deslocamento do protótipo.

## Testar manualmente

1. Jogo livre: Âncora primeiro no time; Fornalha no time inimigo.
2. Clique em Morteiro duas vezes: o segundo clique deve retirar a mira.
3. Selecione Morteiro e depois Sobrecarga ou outro poder: a mira deve sair.
4. Selecione novamente, aponte para os inimigos e dispare.
5. Durante os 3 s, o status indica resolução e a IA não lança Fornalha.
6. Só depois da expiração começa o turno adversário.

Resultado dos testes desta build: `QA_VIDEO_2026-10-23.json`. Relatórios anteriores são históricos.
