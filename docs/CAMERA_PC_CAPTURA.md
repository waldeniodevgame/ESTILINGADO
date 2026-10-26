# Câmera no PC — captura e diagnóstico

## Objetivo

Fazer o PC reproduzir os efeitos de câmera e arena já aprovados no Android, sem alterar os valores nem o comportamento atual do Android.

## Regra de segurança

- A referência é `TESTgordon/TESTE26gordon.html`.
- Não mudar intensidade, duração, zoom, escala ou lógica antes de existir uma diferença gravada/reproduzível.
- Toda alteração será feita em uma cópia nomeada e poderá ser revertida isoladamente.

## O que capturar

Para cada caso, gravar ou registrar o mesmo evento em Android e PC:

| Código | Evento | Arena de Teste | Jogo Livre | Evidência mínima |
|---|---|---:|---:|---|
| C01 | Lançamento normal | [ ] | [ ] | Movimento geral e retorno da câmera |
| C02 | Impacto forte em parede | [ ] | [ ] | Tremor, zoom/filtro e duração |
| C03 | Colisão entre unidades | [ ] | [ ] | Deslocamento e efeito visual |
| C04 | Especial de Capitão | [ ] | [ ] | Início, pico e final do efeito |
| C05 | Vórtice/efeito de arena, quando disponível | [ ] | [ ] | Área, filtro e limpeza final |
| C06 | Vitória, reinício e rotação/resize | [ ] | [ ] | Estado limpo e alinhamento do HUD |

## Registro de cada teste

- Código do caso e modo: Arena de Teste ou Jogo Livre.
- Dispositivo, navegador, resolução e escala do navegador.
- Ação exata que disparou o movimento.
- Resultado no Android e resultado no PC.
- Vídeo/captura, se houver.
- Reproduzível? Sim ou não.

## Roteiro curto de reprodução

1. Abrir a mesma cópia da build Gordon no Android e no PC.
2. Começar pela Arena de Teste: posicionar as mesmas unidades e repetir a mesma ação.
3. Repetir no Jogo Livre com a mesma criatura/ação sempre que possível.
4. Comparar início, pico, duração e retorno da câmera.
5. Só investigar código depois que o comportamento divergente estiver registrado.

## Hipóteses a investigar depois da captura

- CSS aplicado apenas por media query, `hover`, tipo de ponteiro ou orientação.
- Canvas escalado por DPI, `devicePixelRatio`, resize ou zoom do navegador.
- Filtro, transformação ou animação bloqueada/reduzida no desktop.
- Fluxo de eventos touch versus mouse/pointer.
- Estado da Arena de Teste sendo diferente do Jogo Livre.
- Limites de desempenho ou preferência de movimento reduzido.

> Hipóteses são trilhas de diagnóstico, não mudanças autorizadas.