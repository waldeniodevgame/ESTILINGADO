#!/usr/bin/env python3
"""Monta HTML autocontido, sem dependÃªncias Python externas. Execute: python compilar.py"""
from pathlib import Path
import argparse,base64,csv,json,math,re
ROOT=Path(__file__).resolve().parent

def ler(nome):
    return json.loads((ROOT/nome).read_text(encoding='utf-8'))

def js(value):
    if isinstance(value,dict):
        if '$ref' in value:
            ref=value['$ref']
            if not re.fullmatch(r'C\.[A-Za-z_]\w*',ref):raise ValueError('ReferÃªncia invÃ¡lida: '+ref)
            return ref
        for key,op in [('$multiply','*'),('$divide','/')]:
            if key in value:
                args=value[key]
                if len(args)!=2:raise ValueError(key+' exige dois operandos')
                return '('+js(args[0])+op+js(args[1])+')'
        if '$hole' in value:return '' # mantÃ©m o Ã­ndice vazio jÃ¡ existente no original
        return '{'+','.join(json.dumps(k,ensure_ascii=False)+':'+js(v) for k,v in value.items())+'}'
    if isinstance(value,list):return '['+','.join(js(v) for v in value)+']'
    if isinstance(value,float) and not math.isfinite(value):raise ValueError('NÃºmero nÃ£o finito')
    return json.dumps(value,ensure_ascii=False,allow_nan=False).replace('<','\\u003c')

def validar(tabelas):
    schema=ler('docs/estrutura_dados.json')
    def walk(actual,expected,path):
        if isinstance(expected,dict):
            if not isinstance(actual,dict) or actual.keys()!=expected.keys():raise ValueError(path+': mantenha as chaves existentes')
            for k in expected:walk(actual[k],expected[k],path+'.'+k)
        elif isinstance(expected,list):
            if not isinstance(actual,list) or len(actual)!=len(expected):raise ValueError(path+': quantidade/ordem dos registros alterada')
            for i,(a,b) in enumerate(zip(actual,expected)):walk(a,b,path+f'[{i}]')
        elif expected is not None and (type(actual)!=type(expected)):
            if not (type(actual) in (int,float) and type(expected) in (int,float)):raise ValueError(path+': tipo incorreto')
    for name,expected in schema.items():walk(tabelas[name],expected,name)
    for i,m in enumerate(tabelas['monstros']):
        if m['key']!=str(i):raise ValueError('NÃ£o reordene IDs de monstros')
        if m['hp']<=0 or m['attack']<0:raise ValueError('Vida deve ser positiva e ataque nÃ£o negativo')
    anchor=tabelas['ancora_vortex']
    for key in ['radiusInCreatureRadii','durationSeconds','damageIntervalSeconds']:
        if anchor[key]<=0:raise ValueError('ancora_vortex.'+key+' deve ser positivo')
    for key in ['pullSpeed','damagePerTick','coreStopDistance','cooldownOwnTurns']:
        if anchor[key]<0:raise ValueError('ancora_vortex.'+key+' nÃ£o pode ser negativo')
    p=tabelas['fisica_global'];a=tabelas['arena']
    for k in ['maxSpeed','maxDrag','stopSpeed','maxSeconds']:
        if p[k]<=0:raise ValueError(k+' deve ser positivo')
    if not 0<p['damping']<=1:raise ValueError('damping deve estar entre 0 (exclusivo) e 1')
    if not (0<=a['left']<a['right']<=a['width'] and 0<=a['top']<a['bottom']<=a['height']):raise ValueError('Limites da arena invÃ¡lidos')
    if a['radius']<=0:raise ValueError('Raio deve ser positivo')
    dt=p['dt'];dt=dt['$divide'][0]/dt['$divide'][1] if isinstance(dt,dict) else dt
    if dt<=0:raise ValueError('dt deve ser positivo')

def carregar_tabelas():
    tables={p.stem:ler(str(p.relative_to(ROOT))) for p in (ROOT/'dados').glob('*.json')}
    monster_dirs=sorted((ROOT/'monsters').glob('[0-9][0-9]-*'))
    if len(monster_dirs)==16:
        profiles=[json.loads((d/'profile.json').read_text(encoding='utf-8')) for d in monster_dirs]
        physics=[json.loads((d/'physics.json').read_text(encoding='utf-8')) for d in monster_dirs]
        if [m['key'] for m in profiles]==[str(i) for i in range(16)]:
            tables['monstros']=profiles;tables['fisica_monstros']=physics
            (ROOT/'dados/monstros.json').write_text(json.dumps(profiles,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
            (ROOT/'dados/fisica_monstros.json').write_text(json.dumps(physics,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return tables

def compilar():
    manifest=ler('projeto.json');tables=carregar_tabelas();validar(tables)#!/usr/bin/env python3
"""Monta HTML autocontido, sem dependÃªncias Python externas. Execute: python compilar.py"""
from pathlib import Path
import argparse,base64,csv,json,math,re
ROOT=Path(__file__).resolve().parent

def ler(nome):
    return json.loads((ROOT/nome).read_text(encoding='utf-8'))

def js(value):
    if isinstance(value,dict):
        if '$ref' in value:
            ref=value['$ref']
            if not re.fullmatch(r'C\.[A-Za-z_]\w*',ref):raise ValueError('ReferÃªncia invÃ¡lida: '+ref)
            return ref
        for key,op in [('$multiply','*'),('$divide','/')]:
            if key in value:
                args=value[key]
                if len(args)!=2:raise ValueError(key+' exige dois operandos')
                return '('+js(args[0])+op+js(args[1])+')'
        if '$hole' in value:return '' # mantÃ©m o Ã­ndice vazio jÃ¡ existente no original
        return '{'+','.join(json.dumps(k,ensure_ascii=False)+':'+js(v) for k,v in value.items())+'}'
    if isinstance(value,list):return '['+','.join(js(v) for v in value)+']'
    if isinstance(value,float) and not math.isfinite(value):raise ValueError('NÃºmero nÃ£o finito')
    return json.dumps(value,ensure_ascii=False,allow_nan=False).replace('<','\\u003c')

def validar(tabelas):
    schema=ler('docs/estrutura_dados.json')
    def walk(actual,expected,path):
        if isinstance(expected,dict):
            if not isinstance(actual,dict) or actual.keys()!=expected.keys():raise ValueError(path+': mantenha as chaves existentes')
            for k in expected:walk(actual[k],expected[k],path+'.'+k)
        elif isinstance(expected,list):
            if not isinstance(actual,list) or len(actual)!=len(expected):raise ValueError(path+': quantidade/ordem dos registros alterada')
            for i,(a,b) in enumerate(zip(actual,expected)):walk(a,b,path+f'[{i}]')
        elif expected is not None and (type(actual)!=type(expected)):
            if not (type(actual) in (int,float) and type(expected) in (int,float)):raise ValueError(path+': tipo incorreto')
    for name,expected in schema.items():walk(tabelas[name],expected,name)
    for i,m in enumerate(tabelas['monstros']):
        if m['key']!=str(i):raise ValueError('NÃ£o reordene IDs de monstros')
        if m['hp']<=0 or m['attack']<0:raise ValueError('Vida deve ser positiva e ataque nÃ£o negativo')
    anchor=tabelas['ancora_vortex']
    for key in ['radiusInCreatureRadii','durationSeconds','damageIntervalSeconds']:
        if anchor[key]<=0:raise ValueError('ancora_vortex.'+key+' deve ser positivo')
    for key in ['pullSpeed','damagePerTick','coreStopDistance','cooldownOwnTurns']:
        if anchor[key]<0:raise ValueError('ancora_vortex.'+key+' nÃ£o pode ser negativo')
    p=tabelas['fisica_global'];a=tabelas['arena']
    for k in ['maxSpeed','maxDrag','stopSpeed','maxSeconds']:
        if p[k]<=0:raise ValueError(k+' deve ser positivo')
    if not 0<p['damping']<=1:raise ValueError('damping deve estar entre 0 (exclusivo) e 1')
    if not (0<=a['left']<a['right']<=a['width'] and 0<=a['top']<a['bottom']<=a['height']):raise ValueError('Limites da arena invÃ¡lidos')
    if a['radius']<=0:raise ValueError('Raio deve ser positivo')
    dt=p['dt'];dt=dt['$divide'][0]/dt['$divide'][1] if isinstance(dt,dict) else dt
    if dt<=0:raise ValueError('dt deve ser positivo')

def compilar():
    manifest=ler('projeto.json');tables={p.stem:ler(str(p.relative_to(ROOT))) for p in (ROOT/'dados').glob('*.json')};validar(tables)
    def expand(text):
        text=re.sub(r'\{\{DATA:([^}]+)\}\}',lambda m:js(tables[m[1]]),text)
        return re.sub(r'\{\{ASSET:([^}]+)\}\}',lambda m:'data:'+manifest['assets'][m[1]]+';base64,'+base64.b64encode((ROOT/m[1]).read_bytes()).decode(),text)
    scripts=[expand(''.join((ROOT/p).read_text(encoding='utf-8') for p in group)) for group in manifest['scripts']]
    html=(ROOT/'src/index.template.html').read_text(encoding='utf-8')
    html=re.sub(r'\{\{STYLE:([^}]+)\}\}',lambda m:'<style>'+expand((ROOT/m[1]).read_text(encoding='utf-8'))+'</style>',html)
    html=re.sub(r'\{\{SCRIPT:(\d+)\}\}',lambda m:'<script>'+scripts[int(m[1])]+'</script>',html)
    html=expand(html)
    if re.search(r'\{\{(?:DATA|ASSET|SCRIPT|STYLE):',html):raise ValueError('Marcador nÃ£o resolvido')
    dest=ROOT/'dist/CMC_Modular.html';dest.parent.mkdir(exist_ok=True);dest.write_text(html,encoding='utf-8')
    # Table index is generated from the real sources, not a second source of truth.
    rows=[]
    def flatten(name,obj,path=''):
        if isinstance(obj,dict):
            for k,v in obj.items():flatten(name,v,path+'.'+k if path else k)
        elif isinstance(obj,list):
            for i,v in enumerate(obj):flatten(name,v,path+f'[{i}]')
        else:rows.append([f'dados/{name}.json',path,json.dumps(obj,ensure_ascii=False)])
    for name,obj in tables.items():flatten(name,obj)
    with (ROOT/'docs/indice_atributos.csv').open('w',encoding='utf-8-sig',newline='') as out:
        writer=csv.writer(out);writer.writerow(['arquivo','caminho','valor']);writer.writerows(rows)
    return dest

if __name__=='__main__':
    try:print(compilar())
    except (ValueError,KeyError,TypeError,ZeroDivisionError) as err:raise SystemExit('Erro de configuraÃ§Ã£o: '+str(err))

