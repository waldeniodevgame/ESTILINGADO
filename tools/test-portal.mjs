import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const pages=["index.html",...readdirSync(path.join(root,"telas"),{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>`telas/${d.name}/index.html`)];
let links=0,errors=[];
for(const page of pages){
 const full=path.join(root,page);
 if(!existsSync(full)){errors.push(`Página ausente: ${page}`);continue}
 const html=readFileSync(full,"utf8");
 for(const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:|tel:|#|data:)/i.test(ref)) continue;
  const dest=path.resolve(path.dirname(full),decodeURIComponent(ref.split(/[?#]/)[0]));
  links++;
  if(!dest.startsWith(root+path.sep)||!existsSync(dest)||!statSync(dest).isFile()) errors.push(`${page} -> ${ref}`);
 }
}
const home=readFileSync(path.join(root,"index.html"),"utf8");
if(!home.includes("<style>"))errors.push("Sem CSS crítico embutido na home");
for(const name of ["arena","loja","passe","cla","ranking"]){
 if(!home.includes("assets/img/portal/"+name+".svg"))errors.push("Ilustração não conectada: "+name);
}
console.log(`ESTILINGADO: ${pages.length} páginas, ${links} referências verificadas; falhas: ${errors.length}`);
for(const e of errors)console.error("FALHA:",e);
if(errors.length)process.exitCode=1;
