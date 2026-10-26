# Tela 07 - Campo de Treino

Status: Aprovada em 26/10/2026.
Arte aprovada: Campo de Treino 4:3 com tres barras abaixo do campo.
Orientacao: tablet horizontal 4:3.

## Objetivo

Oferecer um campo seguro para praticar e analisar arremessos, colisoes, poderes e condicoes de combate sem progresso de campanha, custos ou punicao por derrota.

## Hierarquia da tela

O campo de treino e o elemento dominante da tela. Ocupa a maior area central possivel, preserva a proporcao horizontal aprovada e mantem todas as bordas fisicas visiveis.

- Painel lateral estreito, sem reduzir indevidamente a area jogavel.
- Nenhum controle sobrepoe o campo ou suas bordas.
- As tres barras de analise ficam exclusivamente abaixo do campo.

## Barra 1 - Transporte do replay

Faixa compacta com exatamente cinco botoes iniciais: evento anterior, reproduzir ou pausar, proximo evento, reiniciar e velocidade 1x. O restante e uma timeline fina com cursor, pontos de evento e tempo atual ou duracao.

## Barra 2 - Player deslizavel de jogadas

Faixa exclusiva para percorrer a sequencia de acoes: indicador da unidade atual, trilho horizontal longo, marcador arrastavel do monstro ativo, paradas visuais nos eventos relevantes e contador da jogada, como 14/30. Esta barra nao repete comandos de reproducao.

## Barra 3 - Matriz de inspecao e filtros

Caixa arredondada fina, em duas linhas, conforme a referencia aprovada.

Linha superior: jogada atual, trajetoria, colisao, habilidade, poder do Capitao e foco de camera.

Linha inferior: equipe aliada, equipe adversaria, todos os times, efeitos do Capitao, buffs ou debuffs, filtro e estados rapidos: escudo, aumento, energia, reducao e condicao.

Icones pequenos, lineares e convencionais. Separadores finos agrupam funcoes. O item selecionado usa anel ciano. Nomes aparecem apenas em hover ou toque prolongado.

## Lateral - Eventos da Batalha

O painel lateral funciona como relatorio dos movimentos analisados durante a jogada. Mostra tres eventos ativos ou recentes, cada um com horario, icone, acao curta e condicao associada. Exemplo: 12:14 Nevoa empurrou Prisma - condicao: impacto lateral.

O evento atual recebe realce ciano. A lista, timeline e player deslizavel permanecem sincronizados.

## Regras do modo

- Nao concede XP, moedas, essencia, fragmentos ou progresso de campanha.
- Nao ha derrota, cronometro punitivo ou limite de tentativas.
- Usa a mesma fisica, camera, bordas e controles fundamentais da arena real.
- As ferramentas analisam o treino sem alterar fisica, camera-base, posicao de unidades, resultado ou recompensas.
- A ficha do monstro aparece apenas por hover ou toque e fecha ao tocar fora.

## Proximo passo de implementacao

Implementar esta tela sobre a build-base, sem alterar jogabilidade, fisica ou comportamento de camera existente.