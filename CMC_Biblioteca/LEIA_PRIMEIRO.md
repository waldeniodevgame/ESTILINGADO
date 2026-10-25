**Build atual: Rev5 — Fornalha base 10 e Vortex +20% de raio.** Leia `docs/FORNALHA.md` e `docs/ANCORA.md` para os campos desta rodada.

**Revisão atual: vídeo de 23/10.** Veja `docs/REVISAO_VIDEO.md`: raio menor, seleção cancelável e próximo turno após o vórtice.

**Build atual: Âncora com vórtice.** Veja `docs/ANCORA.md` para alteração, parâmetros e testes desta rodada. As demais tabelas mantêm a base anterior.

# CMC — biblioteca editável da base Reator Física Aderência Final

Esta entrega parte exclusivamente do HTML enviado. O original está em `original/`. Os valores padrão foram mantidos. Não incorpora V5, portal, economia nova ou alterações de layout das versões anteriores.

## Uso rápido

1. Extraia TODO o ZIP.
2. Abra `dist/CMC_Modular.html` no navegador para jogar.
3. Edite o JSON correspondente em `dados/`, ou CSS em `styles/`.
4. Na pasta do projeto, execute `python compilar.py` (ou `python3 compilar.py`). Usa apenas a biblioteca padrão do Python 3.10+.
5. Reabra/atualize `dist/CMC_Modular.html`. Uma partida já iniciada pode conservar os atributos anteriores: comece outra para comparar.

O HTML compilado é autocontido, inclusive imagens. Não exige servidor, npm nem conexão. Python monta os arquivos; a simulação continua sendo JavaScript no navegador. Não edite `dist/` como fonte: a próxima compilação substitui esse arquivo.

## Onde mexer

| Alteração | Arquivo fonte | Campo e padrão | Efeito |
|---|---|---|---|
| Ataque do Marcelo | `dados/monstros.json` | `[3].attack = 28` | Ataque base, antes dos multiplicadores |
| Vida do Marcelo | `dados/monstros.json` | `[3].hp = 150` | Vida inicial |
| Velocidade geral | `dados/fisica_global.json` | `maxSpeed = 1350` | Escala global de lançamento |
| Velocidade de um monstro | `dados/fisica_monstros.json` | `[3].launchMultiplier = 1` | Multiplica a velocidade inicial |
| Parâmetro máximo do perfil | `dados/fisica_monstros.json` | `[3].maxSpeed` | Mantido como na base; não é um teto universal após todos os bônus |
| Empurrão | `dados/fisica_monstros.json` | `[1].pushImpulse = 180` | Impulso aplicado por contato; Marcelo tem 0 |
| Martelada | `dados/fisica_monstros.json` | `[3].hammerDelay = 0.32`, `hammerDamageMultiplier = 0.6` | Atraso em segundos e dano relativo |
| Explosão da Fornalha | `dados/fisica_monstros.json` | `[0].blastMaxDamage = 10`, `blastRadius = 5` | Dano-base no centro e raio preservado |
| Contato e lava da Fornalha | `dados/efeitos_e_escalas.json` | `furnace.contactDamage = 10`, `lavaRadius = 88`, `lavaDamage = 15`, `allyComboBonusPercent = [0,15,30,50]` | Dano direto, poça por turno e bônus preservados |
| Raio do Vortex | `dados/ancora_vortex.json` | `radiusInCreatureRadii = 6` | 114 unidades internas; atração, dano e duração preservados |
| Vida do capitão | `dados/capitao.json` | `leaderHP = 300` | Vida inicial dos dois capitães |
| Cura real do capitão | `dados/efeitos_e_escalas.json` | `captainHeal = 20` | Cura efetivamente aplicada |
| Custo dos poderes | `dados/capitao.json` e `dados/efeitos_e_escalas.json` | `healCost`, `focusCost`, `captainCosts` | Custos de energia |
| Aceleração gradual da Turbina | `dados/efeitos_e_escalas.json` | `turbinePercent = [0,15,30,50]`, `turbineMultiplier = [1,1.15,1.3,1.5]` | Respectivamente passagem e assistência; são caminhos diferentes |
| Crescimento do dano por evento | `dados/efeitos_e_escalas.json` | `damageGrowthPerEvent = 0.1`, `damageGrowthSteps = 4` | +10% por etapa, até quatro etapas; certas categorias são excluídas na função |
| Dano e redução da força por gelo | `dados/efeitos_e_escalas.json` | `frostDamage`, `frostSlow` | Valores por etapa 0 a 3 |
| Broca por etapa | `dados/efeitos_e_escalas.json` | `drillForcePercent`, `drillDamagePercent`, `drillForceMultiplier`, `drillDamageMultiplier` | Ajustar percentuais e multiplicadores correspondentes juntos |
| Efeito do Eco | `dados/combos.json` | `[11].multiplier = 1.5` | Reimpulso +50% |
| Vida extra/tempo do Reator | `dados/efeitos_e_escalas.json` | `reactorExtraHP = 100`, `reactorTurns = 3` | Vida soma ao hp base; tempo usa a contagem original de turnos próprios |
| Especiais dos monstros | `dados/efeitos_e_escalas.json` | `specials` | Cura, atração, dano, salto, escudo e outros números extraídos |
| Progresso ganho por partida | `dados/progresso.json` | `monsterReward = 20`, `captainReward = 30` | Pontos salvos; NÃO multiplicam força/vida |
| Dimensões e colisão | `dados/arena.json` | `width`, `height`, `radius`, limites | Coordenadas da simulação; mudar dimensões exige conferir CSS/desenho/posições |
| Posições iniciais | `dados/formacao.json` | pares x/y | Deslocamentos em relação ao capitão |
| Duração de efeitos visuais | `dados/efeitos_visuais.json` | `textLife`, `ringLife`, `beamLife`, `hammerLife` | Segundos; não controla dano |
| Layout, cores, responsividade | `styles/01-base.css` até `04-reator.css` | seletores originais | Ordem da cascata preservada |
| Tutoriais, equipes, formação de treino e textos | `dados/ui_*.json` | tabelas nomeadas | Conteúdo original separado |
| Algoritmos e comandos | `src/engine/` e `src/ui/` | função no nome do arquivo | Lógica de cada ação |

## Exemplo manual: aumentar ataque sem assistência

Abra `dados/monstros.json`, procure `"name": "Marcelo"` e mude `"attack": 28` para `"attack": 32`. Compile e comece outra partida. Para desfazer, volte a 28 e compile.

Também pode consultar/editar por Python:

```bash
python editar.py monstros /3/attack
python editar.py monstros /3/attack 32
python compilar.py
```

O editor salva uma cópia `.json.bak` antes da alteração e informa caminho, valor anterior e novo. Os índices começam em zero. Não reordene os monstros: a lógica usa os IDs numéricos.

## O que significa “subida de força” nesta base

Há aumento de dano por eventos, aceleração por aliados e bônus de combos, agora editáveis nas tabelas. A propriedade `level` nasce em 1, mas o progresso salvo não é convertido em níveis de combate. Uma curva de evolução permanente por nível ainda precisa ser definida; não foi inventada nesta reorganização. `dados/progresso.json` controla somente as recompensas existentes.

## Convenções dos dados

- JSON usa ponto decimal, não aceita comentários e não aceita vírgula sobrando.
- `$ref: "C.maxSpeed"` mantém vínculo com a configuração global; `$multiply` e `$divide` preservam fórmulas dependentes.
- `null` em `massFactor` significa “sem calibração”; não foi transformado em massa física.
- Percentual 15 significa 15%; multiplicador 1.15 significa +15%.
- Dano/vida são pontos; posição/raio usam coordenadas internas da arena; velocidade usa unidades internas por segundo.
- `docs/indice_atributos.csv` contém arquivo, caminho e valor de cada folha das tabelas. É índice de consulta, gerado ao compilar; edite o JSON, não o CSV.
- `docs/funcoes.json` localiza funções; `docs/mapa_consumidores.csv` mostra onde os campos de configuração são usados, com arquivo e linha. Os arquivos `.js` são fragmentos concatenados na ordem de `projeto.json`, dentro dos mesmos escopos originais. Não são módulos ES independentes nem devem ser carregados isoladamente por `<script>`.

## Limites preservados e pontos de atenção da base

- `combos.json` tem 17 posições para 16 monstros: a posição 14 é uma lacuna representada por `$hole`. Órbita/Fenda ficam nos índices seguintes, como no original. Não corrigi esse desalinhamento nesta etapa.
- `capitao.healAmount = 22` já existia, mas a cura real usa 20. Agora o valor efetivo é `efeitos_e_escalas.captainHeal`; não confundir os dois.
- Textos explicativos não são recalculados automaticamente quando números mudam. Há expectativas numéricas nos tutoriais; alterar balanceamento pode exigir atualizar essas verificações e textos em `src/ui/`.
- Números de geometria, regras condicionais, limites internos e desenhos ainda existem nas funções. O mapa permite localizá-los; nem todo número foi convertido em atributo de configuração.
- A primeira separação preservou a base. As builds atuais acrescentam somente as mecânicas documentadas em `docs/ANCORA.md`, `docs/ATRACAO_SUAVE.md` e `docs/FORNALHA.md`.

## Verificação

`node verificar.cjs` compara lançamentos dos outros monstros com a base e verifica criação/expiração do vórtice. Mudanças intencionais nos outros monstros podem fazer a igualdade falhar. Consulte `docs/ANCORA.md` e os relatórios `docs/verificacao-ancora*.json` para a build atual.

Em próximas alterações, a referência deve sempre incluir arquivo + campo/função + valor atual + valor proposto + comando para compilar.
