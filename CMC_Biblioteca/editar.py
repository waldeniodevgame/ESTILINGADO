#!/usr/bin/env python3
"""Consulta/altera uma chave usando caminho JSON: python editar.py monstros /3/attack 32"""
import argparse,json
from pathlib import Path
from compilar import ROOT,validar
p=argparse.ArgumentParser(description=__doc__);p.add_argument('tabela');p.add_argument('caminho',help='Ex.: /3/attack ou /maxSpeed');p.add_argument('valor',nargs='?',help='Valor JSON; omita para consultar');a=p.parse_args()
file=ROOT/'dados'/(a.tabela+'.json')
if file.parent.resolve()!=(ROOT/'dados').resolve():raise SystemExit('Tabela inválida')
data=json.loads(file.read_text(encoding='utf-8'));parts=a.caminho.strip('/').split('/');target=data
for k in parts[:-1]:target=target[int(k)] if isinstance(target,list) else target[k]
key=int(parts[-1]) if isinstance(target,list) else parts[-1]
print('Arquivo:',file);print('Caminho:',a.caminho);print('Antes:',json.dumps(target[key],ensure_ascii=False))
if a.valor is not None:
 target[key]=json.loads(a.valor);alltables={f.stem:json.loads(f.read_text(encoding='utf-8')) for f in (ROOT/'dados').glob('*.json')};alltables[a.tabela]=data;validar(alltables)
 backup=file.with_suffix('.json.bak');backup.write_bytes(file.read_bytes());file.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print('Depois:',a.valor);print('Agora execute: python compilar.py')
