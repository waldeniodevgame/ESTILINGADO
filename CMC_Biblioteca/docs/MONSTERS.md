# Biblioteca de monstros

Cada monstro possui uma pasta numerada em `CMC_Biblioteca/monsters/`:

```text
00-fornalha/
  profile.json
  physics.json
  behavior.json
```

## Arquivos

- `profile.json`: nome, vida, ataque, cor, habilidade e descrição.
- `physics.json`: papel, classe de peso, raio, velocidade, impulso e estilo de impacto.
- `behavior.json`: índice, comportamento e arquivos do motor envolvidos.

## Regra de fonte

As fichas individuais são a fonte editável dos 16 monstros. Ao executar:

```powershell
python compilar.py
```

o compilador recompõe automaticamente:

- `dados/monstros.json`
- `dados/fisica_monstros.json`
- `dist/CMC_Modular.html`
- `docs/indice_atributos.csv`

Não edite os arquivos agregados manualmente. Preserve o prefixo numérico das pastas, porque ele corresponde ao ID usado pelo motor.

## Comportamento

Os algoritmos continuam centralizados em `src/engine/`. As fichas não duplicam código JavaScript; `behavior.json` documenta os pontos do motor que implementam cada criatura. Isso evita divergência entre 16 cópias de lógica.
