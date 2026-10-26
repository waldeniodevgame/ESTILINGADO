# Fornalha — ajuste Rev5

As constantes editáveis ficam em `dados/efeitos_e_escalas.json`, dentro de `furnace`:

| Campo | Valor | Uso |
|---|---:|---|
| `contactDamage` | 10 | Dano direto no inimigo do primeiro contato |
| `lavaRadius` | 88 | Raio visual e hitbox da poça |
| `lavaDamage` | 15 | Dano por inimigo, uma vez por turno |
| `lavaDurationOwnTurns` | 1 | A poça termina no início do próximo turno da própria Fornalha |
| `explosionDurationSeconds` | 0.42 | Duração da expansão visual |
| `allyComboBonusPercent` | `[0,15,30,50]` | Bônus preservados com 0, 1, 2 ou 3+ aliados |

O dano-base da explosão fica em `dados/fisica_monstros.json → [0].blastMaxDamage = 10`. Assim, a explosão central resulta em 10, 12, 13 ou 15 conforme a quantidade de aliados atravessados.

Trechos de execução:

- `src/engine/025_nextContact.js`: reconhece aliados atravessados pela Fornalha sem bloqueá-la.
- `src/engine/027_stepShot.js`: conta cada aliado uma vez, para no primeiro inimigo e encerra o movimento sem impulso.
- `src/engine/016_planFurnaceExplosion.js`: calcula o bônus percentual e a área radial.
- `src/engine/017_resolveFurnaceExplosion.js`: aplica contato separado, explosão única e cria a lava.
- `src/engine/005_beginTurn.js`: aplica a lava uma vez por turno e remove a poça no próximo turno da dona.
- `src/engine/007_settleDeaths.js`: remove a poça imediatamente quando a Fornalha morre.
- `src/ui/furnace_visual.js` e `src/ui/058_drawEffects.js`: desenham a poça persistente e a expansão da explosão.

O restante dos monstros e seus caminhos de colisão permanecem no fluxo anterior.
