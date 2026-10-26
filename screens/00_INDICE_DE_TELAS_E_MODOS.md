# Legiões das Armadilhas — Índice de Telas e Modos

**Atualizado em:** 26/10/2026  
**Regra de status:** *Aprovada* significa conceito visual aprovado; *Em revisão* não deve orientar implementação final; *Pendente* ainda não possui conceito aprovado.

## Modos de jogo

| Modo | Entrada | Objetivo | Estado |
|---|---|---|---|
| Campanha | Portal da Arena | Progredir por fases, fortalecer Capitães e liberar conteúdo | Fluxo principal do vertical slice |
| Arena de Treino | Portal da Arena | Testar arremessos, colisões, poderes e composição sem pressão de fase | Conceito de entrada aprovado; fluxo interno pendente |
| Jogo Livre | Portal da Arena | Montar confrontos sem progressão obrigatória | Conceito de entrada aprovado; regras e fluxo pendentes |

## Telas do fluxo de Campanha

| Código | Tela | Função | Estado |
|---|---|---|---|
| 01 | Portal da Arena | Escolher Campanha, Arena de Treino ou Jogo Livre | Conceito aprovado |
| 02 | Campanha: Mapa de Fases | Ver progresso e escolher fase | Aprovada |
| 03 | Preparar Equipe | Montar equipe para a fase selecionada | Pendente de redesenho |
| 03A | Modal de Seleção de Criaturas | Escolher criatura para uma vaga da equipe | Aprovada |
| 04 | Batalha: Arena | Executar arremessos, colisões e poderes | Em revisão |
| 05 | Vitória e Recompensas | Mostrar progressão e decidir entre avançar ou rever | Aprovada |
| 06 | Derrota e Reagrupar | Informar o resultado e permitir repetir ou ajustar equipe | Aprovada |

## Mapa de navegação

```text
01 Portal da Arena
├─ Campanha → 02 Mapa de Fases → 03 Preparar Equipe
│                                  ├─ 03A Seleção de Criaturas → 03
│                                  └─ 04 Batalha: Arena
│                                      ├─ 05 Vitória → Próxima fase: 02
│                                      │                 Rever batalha: 04
│                                      └─ 06 Derrota → Tentar de novo: 04
│                                                      Ajustar equipe: 03
├─ Arena de Treino → fluxo de treino (pendente)
└─ Jogo Livre → configuração de partida (pendente)
```

## Regras de continuidade

- A fase escolhida em `02` permanece selecionada ao entrar em `03` e ao voltar de `06`.
- `03A` devolve o jogador a `03`, preservando a vaga da equipe que abriu o modal.
- `05` usa dados reais da vitória; `06` usa dados reais da derrota e uma dica contextual.
- `Rever batalha` é somente replay: não altera XP, recursos ou recompensa.
- A formação inicial de monstros da `04` ainda será definida após o fechamento da Tela 03 e do fluxo de equipe.

## Ordem de trabalho

1. Redesenhar e aprovar a Tela 03.
2. Concluir a Tela 04 sem alterar física, câmera ou limites da arena.
3. Desenhar os fluxos internos de Arena de Treino e Jogo Livre.
4. Conectar o vertical slice em código, com dados reais entre as telas.
