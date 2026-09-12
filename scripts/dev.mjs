import { spawn } from "node:child_process";

// Preserve Next.js development while accepting standard preview-runner flags.
const input=process.argv.slice(2);
const args=[];
for(let i=0;i<input.length;i++) {
  if(input[i]==="--strictPort") continue;
  args.push(input[i]==="--host" ? "--hostname" : input[i]);
}
if(!args.includes("--hostname")) args.push("--hostname","0.0.0.0");
if(!args.includes("--port")&&!args.includes("-p")) args.push("--port","4173");
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","dev",...args],{stdio:"inherit",env:process.env});
for(const signal of ["SIGINT","SIGTERM"]) process.on(signal,()=>child.kill(signal));
child.on("exit",code=>process.exit(code??0));
