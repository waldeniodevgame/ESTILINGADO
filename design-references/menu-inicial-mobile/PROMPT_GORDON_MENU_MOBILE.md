# Implementar Menu Inicial Mobile — Build Gordon

## Objetivo
Transformar **somente a camada de interface do menu inicial** da build Gordon em um menu mobile vertical. Preserve integralmente a arena, a física, os tutoriais e a seleção já existentes.

## Arquivo-base
- `TESTgordon/TESTE26gordon.html`

## Referências visuais
Compare as duas imagens do pacote ZIP entregue junto desta tarefa:
1. `01-menu-atual-pc.jpg` — menu atual, focado em desktop.
2. `02-conceito-menu-mobile-arcade.png` — direção aprovada: arcade colorido, mobile-first, vertical.

## Escopo obrigatório
Criar uma Home Mobile com:
1. Cabeçalho compacto: perfil/avatar, nível e recursos como indicadores estáticos nesta entrega.
2. Área hero: arte já existente no jogo, título e clima de arena.
3. Botão grande `JOGAR CAMPANHA`.
4. Cartão `EVENTO` com selo `EM BREVE`.
5. Barra inferior fixa: `Início`, `Coleção`, `Capitães`, `Loja` e `Social`.

## Comportamentos desta entrega
### Único acesso funcional: Início
- `Início` abre o fluxo já existente de **Jogo Livre/Arena Livre**.
- Preserva a escolha atual entre **partida contra IA** e **2 jogadores**.
- Reutilize função, listener ou fluxo existente. Não duplique a lógica.

### Entradas visuais sem função
Criar visualmente, mas sem implementar sistema ou navegação: `JOGAR CAMPANHA`, `EVENTO`, `COLEÇÃO`, `CAPITÃES`, `LOJA` e `SOCIAL`.

Ao tocar nesses itens, mostrar apenas: `Em breve`.

## Regras inegociáveis
1. Não reescrever o projeto nem apagar trechos existentes.
2. Alterar apenas HTML, CSS e JavaScript ligados ao menu e à navegação inicial.
3. Não modificar física, Canvas, colisões, IA, arena, tutorial, áudio, seleção de equipe ou combate.
4. Preservar IDs e listeners existentes; criar IDs novos e claros para o menu mobile.
5. Não criar campanha, eventos, economia, loja, compras, login, inventário, multiplayer online, salvamento ou pagamentos falsos.
6. Não usar bibliotecas, frameworks, CDNs ou imagens externas.
7. Reutilizar artes locais ou embutidas na build quando possível.
8. Interface mobile-first, vertical 9:16 e responsiva no PC.
9. Alvos de toque de no mínimo 48px.
10. Contraste alto, textos curtos, sem itens cortados e sem texto minúsculo.

## Critérios de aceite
- Novo menu como primeira tela.
- `Início` abre a escolha existente: IA ou 2 jogadores.
- Os outros seis acessos existem e exibem somente `Em breve`.
- Tutorial, Arena Livre e combate continuam funcionando.
- Não há erros no console.
- Entregar HTML completo alterado, changelog curto, arquivos alterados e testes executados.