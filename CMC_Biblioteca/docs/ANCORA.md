# Build Âncora — mudança isolada

Base mantida: CMC_REATOR_FISICA_ADERENCIA_FINAL + biblioteca editável existente.
Importado de Capsmon test 1 (3).html: somente morteiro/vórtice da Âncora, sua mira, desenho, ação da IA e instruções do tutorial. Não foram importadas alterações de Fornalha, Turbina, Órbita ou outros monstros.

## Testar

Abra `dist/CMC_Modular.html`. Aprenda a jogar → Âncora → Morteiro · vórtice → ENTENDI → botão Morteiro → clique/toque no ponto do núcleo.
Escape ou Cancelar cancela a mira. O vórtice resolve antes da troca de turno. A pausa interrompe o efeito. Clique novamente em Morteiro, em Cancelar ou em outro poder para desmarcar a mira.

## Alterar os atributos

Todos em `dados/ancora_vortex.json`:

| Campo | Valor atual | Significado |
|---|---:|---|
| radiusInCreatureRadii | 6 | Raio = valor × raio global da criatura (19), portanto 114 unidades |
| durationSeconds | 3 | Duração do núcleo em segundos |
| damagePerTick | 7 | Dano periódico nos inimigos arrastados |
| damageIntervalSeconds | 0.5 | Intervalo entre aplicações de dano |
| pullSpeed | 60 | Aproximação por segundo em unidades internas |
| coreStopDistance | 2 | Distância mínima ao centro |
| cooldownOwnTurns | 1 | Contador de recarga, decrementado no início do turno da equipe |

Exemplo para experimentar sucção dez vezes menor: altere `pullSpeed` de `60` para `6` e rode `python compilar.py`. A entrega mantém 60, igual ao arquivo fornecido. Ou use `python editar.py ancora_vortex /pullSpeed 6` e compile.

## Ligação com o código

- `src/engine/ancora_vortex.js`: `castAnchorVortex()` cria o núcleo e encerra o turno; `stepWorld()` aplica deslocamento, dano e expiração.
- `src/engine/000_inicializacao.js`: lê a tabela, exportada como `EloEngine.ANCHOR`.
- `src/ui/ancora_visual.js`: `drawAnchorVortices()` usa o mesmo raio na prévia e no núcleo.
- `src/ui/063_frame.js` (consulte `docs/funcoes.json` para localização exata): atualização do efeito, respeitando pausa.
- `src/ui/` mantém os controles existentes; foram acrescentados apenas os caminhos da Âncora.
- `dados/monstros.json`, registro 12: nome/ataque/vida mantidos; habilidade e descrição atualizadas.

O raio da mira e os números do diálogo inicial são derivados da mesma tabela, não de cópias numéricas.

## Comportamento preservado do protótipo

O dono do núcleo não é puxado. Outros monstros, aliados e inimigos, são puxados. Na Rev3, inimigos dentro da área recebem o pulso mesmo se estiverem parados. Capitães não são puxados. Na Rev3 a sucção usa aproximação gradual e limitada; veja `ATRACAO_SUAVE.md`. Não foi acrescentada uma regra de peso. A rotina importada não separa colisores durante a sucção: aproximações/sobreposições junto ao centro continuam possíveis, como na referência. A assistência da Âncora ao ser atravessada continua sendo o vetor já existente; apenas sua ação própria mudou para morteiro.

Integração adicional necessária: dano do vórtice verifica vitória/derrota e encerra os núcleos após o resultado. Os outros monstros não tiveram seus atributos ou habilidades substituídos.

## Evidências desta rodada

- `verificacao-ancora.json`: regressão dos outros monstros, deslocamento/dano, término e resultado.
- `verificacao-ancora-browser.json`: navegação real pelo tutorial, disparo, Escape, pausa e conclusão.
- Os relatórios `verificacao-motor.json`, `verificacao-abertura.json` e `verificacao-especiais.txt` são da primeira modularização; não representam esta build.
