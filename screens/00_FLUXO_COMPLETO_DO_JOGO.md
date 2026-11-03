# ESTILINGADO — Fluxo Completo de Telas

**Atualizado em:** 26/10/2026  
**Escopo:** fluxo principal do primeiro vertical slice.

## Jornada principal

```text
01 Portal da Arena
  └─ Campanha
      └─ 02 Mapa de Fases
          └─ Escolher fase
              └─ 03 Preparar Equipe
                  ├─ Adicionar criatura → 03A Modal de Seleção
                  └─ Iniciar batalha → 04 Arena
                      ├─ Vitória → 05 Vitória e Recompensas
                      │   ├─ Próxima fase → 02 Mapa de Fases
                      │   └─ Rever batalha → 04 Arena (replay)
                      └─ Derrota → 06 Recuar e Reagrupar
                          ├─ Tentar de novo → 04 Arena
                          └─ Ajustar equipe → 03 Preparar Equipe
```

## Estado de cada tela

| Tela | Nome | Estado | Próxima decisão |
|---|---|---|---|
| 01 | Portal da Arena | Conceito aprovado | Escolher modo |
| 02 | Campanha: Mapa de Fases | Aprovada | Escolher fase |
| 03 | Preparar Equipe | Pendente de redesenho | Ajustar elenco e iniciar |
| 03A | Modal de Seleção de Criaturas | Aprovado | Confirmar criatura |
| 04 | Batalha: Arena | Em revisão | Arremessar / concluir combate |
| 05 | Vitória e Recompensas | Aprovada | Avançar ou rever |
| 06 | Derrota e Reagrupar | Aprovada | Repetir ou ajustar equipe |

## Regras de navegação

- `Próxima fase` atualiza o mapa e retorna a `02`, nunca inicia outra luta sem contexto.
- `Rever batalha` é replay visual da última batalha; não altera resultados, XP ou recompensas.
- `Tentar de novo` reaproveita a mesma fase sem conceder nem retirar recompensa antes do desfecho.
- `Ajustar equipe` retorna a `03` com a fase escolhida preservada.
- `03A` sempre retorna a `03`, mantendo a vaga de equipe que iniciou a seleção.
- A definição final das posições iniciais da arena fica pendente até o fluxo e o preparo de equipe estarem fechados.

## Prioridade para fechar o vertical slice

1. Redesenhar e aprovar a Tela 03, usando o modal 03A já aprovado.
2. Fechar a Tela 04 sem mexer na física, câmera ou limites reais da arena.
3. Conectar transições e dados reais entre 02 → 03 → 04 → 05/06.
