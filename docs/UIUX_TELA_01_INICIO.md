# UI/UX — Tela 01: Início (Hub da Arena)

## Decisão desta rodada

Refazer a primeira tela antes dos demais menus, mantendo a jogabilidade e a câmera fora do escopo. A build Gordon permanece preservada; a interface será feita em cópia de trabalho.

## Diagnóstico do menu atual

A tela atual é limpa e legível, mas parece uma etapa de tutorial: oferece só ‘Aprenda a jogar’ e ‘Jogo livre’, não comunica a fantasia de arena e deixa a escolha inicial sem energia.

## Nova proposta: Portal da Arena

A primeira tela passa a ser um **hub curto e vivo**, com a arena como protagonista e uma ação óbvia: jogar. Não é para encher de sistemas que ainda não funcionam.

### Hierarquia

1. **Topo compacto:** avatar/perfil à esquerda; configurações à direita. Moedas, gemas e loja só entram quando a economia existir.
2. **Hero da arena:** miniatura animada da arena, bandeiras, luzes e o título ‘Legiões das Armadilhas’.
3. **Ação primária:** botão grande `JOGAR AGORA`. Ele deve retomar a última configuração válida ou abrir a escolha de modo se ainda não houver partida pronta.
4. **Dois atalhos secundários:** `Arena de Treino` e `Jogo Livre`, lado a lado em cartões grandes.
5. **Conteúdo futuro sem enganar:** Coleção, Missões, Loja e Social só aparecem quando tiverem ao menos uma função real; antes disso, ficam fora da home.

## Wireframe

```text
┌────────────────────────────────────┐
│ Perfil / nível                 ⚙   │
│                                    │
│       [ LOGO + ARENA VIVA ]        │
│    Legiões das Armadilhas          │
│                                    │
│          [ JOGAR AGORA ]           │
│                                    │
│  [ 🎯 Arena de Treino ] [ ⚔ Jogo Livre ]
│                                    │
│     Dica curta ou missão ativa     │
└────────────────────────────────────┘
```

## Direção visual

| Elemento | Decisão |
|---|---|
| Fundo | Azul-noite `#0A1030`, com gradiente violeta `#421B8F` e silhuetas da arena |
| Ação principal | Laranja-dourado `#FF9D16` com brilho amarelo `#FFD34D` |
| Treino | Azul elétrico `#00B9F2` |
| Jogo Livre | Roxo vivo `#913BFF` |
| Texto | Branco quente `#F8F7FF`; secundário lavanda clara `#C7C9E9` |
| Alertas/estado | Verde-lima `#62E672` só para confirmação e progresso |
| Cartões | Fundo azul profundo, borda colorida por modo e ícone grande |

## Regras de UX

- Uma ação dominante por tela: `JOGAR AGORA`.
- Alvos de toque com pelo menos 48 px.
- Texto de botão é direto: verbo + destino.
- Nada de introdução longa: tutorial continua disponível, mas não bloqueia o jogo livre.
- A arena deve ter movimento ambiental leve, sem competir com os botões nem afetar desempenho.
- Contraste alto e nunca depender apenas de cor para comunicar modo/estado.

## Critérios de aceite

- [ ] A primeira ação é compreendida sem texto explicativo.
- [ ] Jogar, Treinar e Jogo Livre são alcançáveis com um toque.
- [ ] A tela cabe em 360×800 sem rolagem horizontal.
- [ ] Funciona em 390×844 e 430×932 sem elementos encobertos.
- [ ] Não altera câmera, física, controles ou fluxo de partida existente.
- [ ] Versão aprovada testada no Android antes de substituir qualquer menu.

## Próxima tela após aprovação

**Tela 02 — escolha de modo/equipe.** Só será desenhada depois que a Tela 01 for aprovada, para manter o redesenho incremental.