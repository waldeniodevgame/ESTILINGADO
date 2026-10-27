# Mapa de integração: imagem → botões → código

## Princípio
A imagem é uma referência de composição e estilo. Ela **não é** uma fonte de coordenadas ou IDs. Para alterar a build existente com segurança, a IA deve localizar primeiro os elementos e funções reais dentro de `TESTgordon/TESTE26gordon.html`; depois cria a nova interface usando os IDs deste documento.

## Etapa obrigatória antes de editar
A IA deve ler o HTML inteiro e relatar:
1. Qual é o elemento/tela inicial atual.
2. Qual função ou listener abre Jogo Livre/Arena Livre.
3. Qual função ou listener inicia partida contra IA.
4. Qual função ou listener inicia partida de 2 jogadores.
5. Quais IDs, funções e blocos não podem ser removidos.

Se não conseguir encontrar os itens 2–4, deve parar, mostrar os trechos que localizou e **não inventar** funções.

## Contrato de IDs da Home
| ID novo | Rótulo visual | Ação |
|---|---|---|
| `mobile-home-screen` | Contêiner da Home | tela inicial do novo menu |
| `btn-campaign` | Jogar Campanha | mostrar toast `Em breve` |
| `btn-event` | Evento | mostrar toast `Em breve` |
| `btn-home` | Início | abrir `mode-select-screen` |
| `btn-collection` | Coleção | mostrar toast `Em breve` |
| `btn-captains` | Capitães | mostrar toast `Em breve` |
| `btn-shop` | Loja | mostrar toast `Em breve` |
| `btn-social` | Social | mostrar toast `Em breve` |

## Contrato de IDs da Arena Livre
| ID novo | Rótulo visual | Ação |
|---|---|---|
| `mode-select-screen` | Tela de modos | abre por `btn-home` |
| `btn-mode-back` | Voltar | retorna para `mobile-home-screen` |
| `btn-vs-ai` | Contra IA | chama o fluxo existente encontrado na inspeção |
| `btn-local-2p` | 2 Jogadores | chama o fluxo existente encontrado na inspeção |
| `locked-coming-soon` | Campanha e Eventos em breve | sem ação |

## Regras de integração
- Não usar coordenadas da imagem para criar comportamento.
- Não selecionar elementos por texto; usar IDs.
- A imagem guia layout, cores, hierarquia e arte. Os IDs guiam o código.
- Não excluir nem reescrever o menu e os listeners antigos. Ocultá-los quando o menu novo estiver aberto, ou chamá-los por adaptadores mínimos.
- Exemplo permitido: `openExistingFreeArena()` chama a função original de Jogo Livre identificada na inspeção.
- Não mudar Canvas, física, colisões, arena, IA, áudio, tutorial, seleção de equipe ou combate.
- Sem bibliotecas, CDNs, imagens externas, campanha, loja, economia, login ou multiplayer online.

## Entrega exigida
Junto do HTML, a IA deve devolver uma tabela contendo: `novo ID`, `elemento antigo reutilizado`, `função/listener chamado` e `teste realizado`.
