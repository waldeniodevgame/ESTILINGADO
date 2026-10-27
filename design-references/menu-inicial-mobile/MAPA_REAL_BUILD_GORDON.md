# Mapa real da Build Gordon — fluxo de Arena Livre

Inspeção feita em `TESTgordon/TESTE26gordon.html`, branch `main`.

## O que já existe
A build atual não possui dois botões separados de IA e 2 jogadores. Ela usa um seletor de modo dentro da tela de montagem de equipe:

- `#modeSelect`: escolhe `ai` (Contra a IA) ou `local` (2 jogadores locais).
- `#startBtn`: inicia a batalha.
- O clique de `#startBtn` chama `startGame()` (linha 2330).
- `startGame()` lê `#modeSelect` (linha 1930) e cria a partida (linha 1932).

## Rota da nova Tela 02

`Início` → `Arena Livre` → escolha `Contra IA` ou `2 Jogadores` → seleção existente de equipe → `Iniciar Batalha` → arena.

### Contra IA
```js
$(modeSelect).value = ai;
openSetup(false);
```

### Dois jogadores locais
```js
$(modeSelect).value = local;
openSetup(false);
```

Depois disso, o fluxo já existente entrega a escolha de equipe e o botão `#startBtn` chama `startGame()` normalmente.

## Funções encontradas
| Função | Linha aproximada | Função prática |
|---|---:|---|
| `openSetup(false)` | 2641 | Oculta a abertura e mostra a seleção de equipe existente |
| `startGame(options)` | 1920 | Cria a partida com modo e dificuldade escolhidos |
| `showMenu()` | 2182 | Restaura os overlays de menu após a partida |
| `#modeGameBtn.onclick` | 2660 | Botão antigo de Jogo Livre chama `openSetup(false)` |
| `#startBtn` | 2330 | Inicia a partida chamando `startGame()` |

## Adaptador mínimo permitido
```js
function openFreeArena(mode) {
  $(modeSelect).value = mode;
  openSetup(false);
}

$(btn-vs-ai).onclick = () => openFreeArena(ai);
$(btn-local-2p).onclick = () => openFreeArena(local);
```

## Regras
- Não chamar `startGame()` diretamente na Tela 02, pois o jogador precisa passar pela seleção de equipe.
- Não alterar Canvas, arena, física, IA, colisões, áudio, tutorial ou combate.
- Não apagar o menu antigo: usar o fluxo dele como ponte.

## Ponto a testar
O modo `local` é aceito pelo motor, mas ainda precisa de teste manual completo para confirmar se há montagem individual de equipe para os dois lados. Não prometer essa etapa visual antes do teste.
