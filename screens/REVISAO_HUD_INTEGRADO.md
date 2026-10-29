# Revisão integrada do HUD de batalha

Status: candidata à avaliação visual; não é aprovação final.

A branch `ui/batalha-integrada` altera a build jogável `TESTgordon/TESTE26gordon.html`. As artes foram incorporadas ao HTML como WebP para a abertura local/HTMLPreview não depender de caminhos de imagem. O arquivo tem aproximadamente 7 MB.

## O que mudou
- Arena Floresta Cósmica e miniaturas das 16 artes fornecidas.
- Painel azul-escuro com contornos dourados, capitão por ícone, PV e cristais de energia.
- Esquadrão em quatro quadrados e ficha compacta.
- Botões existentes de habilidades mantidos.
- Contra IA sem coluna lateral direita; modo local preserva coluna adversária.
- Canvas conserva coordenadas 960 × 600 (8:5). A proporção 4:3 da apresentação não altera a geometria da física; o HUD se adapta à janela.

## Limite importante
A correspondência das 16 novas artes com os IDs antigos do motor é PROVISÓRIA. Esta revisão troca nomes/retratos na camada visual e mantém atributos, habilidades e regras antigas. Não representa aprovação de fichas ou balanceamento.

| ID | Motor anterior | Arte/nome visual |
|---|---|---|
| 0 | Fornalha | Ogro Bombardeiro |
| 1 | Voltagem | Mago Carmesim |
| 2 | Glacial | Tartaruga de Guerra |
| 3 | Marcelo | Golem de Túmulo |
| 4 | Turbina | Goblin Estilingue |
| 5 | Rebatedor | Minotauro de Ferro |
| 6 | Ímã | Druida Espinheiro |
| 7 | Broca | Arqueiro Esqueleto |
| 8 | Prisma | Olho Tirano |
| 9 | Pulso | Bruxa do Caldeirão |
| 10 | Muralha | Mímico Faminto |
| 11 | Eco | Ladrão Fantasma |
| 12 | Âncora | Necromante de Cinzas |
| 13 | Reator | Duende Sabotador |
| 14 | Órbita | Arqueira da Lua |
| 15 | Lulla | Bobo da Corte Maldito |

## Verificação
- Sintaxe dos quatro scripts conferida.
- Fluxo Jogo livre → seleção → iniciar batalha abriu no navegador.
- Arena e miniaturas renderizadas; coluna vazia de IA removida.
- Sobrecarga consumiu 2 energia (3/6 → 1/6).
- Arremesso entrou no estado em movimento; pausa abriu.
- Revisão estática independente sem bloqueio de execução.
- Ainda pendentes: partida completa, teste em aparelho mobile, avaliação visual 4:3, modo local em uso completo e validação das fichas dos 16 monstros.

Para testar localmente, usar esta branch e executar `iniciar-prototipo.bat`. A main ainda não recebe esta revisão.
