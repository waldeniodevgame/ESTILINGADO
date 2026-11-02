import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const port=Number(process.env.PORT||4176);
const mime={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".json":"application/json; charset=utf-8"};
http.createServer((req,res)=>{
 try{
  const url=decodeURIComponent((req.url||"/").split("?")[0]);
  const target=path.resolve(root,"."+ (url==="/"?"/index.html":url));
  if(!target.startsWith(root+path.sep)||!fs.existsSync(target)||!fs.statSync(target).isFile()){
   res.writeHead(404,{"content-type":"text/plain; charset=utf-8"});res.end("Arquivo nao encontrado");return;
  }
  res.writeHead(200,{"content-type":mime[path.extname(target).toLowerCase()]||"application/octet-stream"});
  fs.createReadStream(target).pipe(res);
 }catch(e){res.writeHead(500,{"content-type":"text/plain"});res.end(String(e.message))}
}).listen(port,"127.0.0.1",()=>console.log("ESTILINGADO portal: http://localhost:"+port+"/"));
