import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const [input,output]=process.argv.slice(2);
if(!input||!output) throw Error('Usage: node build.mjs questions.json quiz.html');
const data=JSON.parse(fs.readFileSync(input,'utf8'));
if(typeof data.title!=='string'||!Array.isArray(data.questions)||!data.questions.length)throw Error('title and questions required');
for(const q of data.questions){
 if(typeof q.question!=='string'||!Array.isArray(q.options)||q.options.length<2||!q.options.every(x=>typeof x==='string')||new Set(q.options).size!==q.options.length||!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.options.length)throw Error('Invalid question');
}
const template=fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)),'template.html'),'utf8');
fs.writeFileSync(output,template.replace('__QUIZ_DATA__',JSON.stringify(data).replace(/</g,'\\u003c')));
console.log(`Created ${output} with ${data.questions.length} questions`);

