import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const template=fs.readFileSync(new URL('template.html',import.meta.url),'utf8');
const script=template.split('<script>')[1].split('</script>')[0];
const data={title:'Test',questionCount:2,questions:[{question:'One?',options:['A','B'],answer:0,explanation:'SECRET'},{question:'Two?',options:['C','D'],answer:1,explanation:'SECRET'}]};
const saved=new Map();
function load({blocked=false,quiz=data}={}){
 const nodes=new Map();
 function node(){return {textContent:'',style:{},dataset:{},children:[],disabled:false,classList:{add(){},remove(){},toggle(){}},append(...items){this.children.push(...items)},replaceChildren(){this.children=[]},setAttribute(){},focus(){}}}
 const el=id=>{if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)};
 el('quiz-data').textContent=JSON.stringify(quiz);
 const ctx=vm.createContext({document:{getElementById:el,createElement:node},localStorage:{setItem(k,v){if(blocked)throw Error('blocked');saved.set(k,v)},getItem:k=>saved.get(k)||null,removeItem:k=>saved.delete(k)}});
 vm.runInContext(script,ctx);return {ctx,el,run:s=>vm.runInContext(s,ctx)};
}
let app=load();app.el('start').onclick();const initial=app.run('JSON.stringify(state.questions)');const order=app.run('JSON.stringify(state.orders)');app.run('answer(0)');assert.equal(app.el('feedback').textContent,'Answer saved and locked.');assert(!app.el('feedback').textContent.includes('SECRET'));
app=load();assert.equal(app.run('JSON.stringify(state.questions)'),initial);assert.equal(app.run('JSON.stringify(state.orders)'),order);assert.equal(app.run('state.answers[0]'),0);app.run('answer(1)');assert.equal(app.run('state.answers[0]'),0);assert(app.el('options').children.every(b=>b.disabled));
app.el('next').onclick();app.run('answer(1)');app.el('next').onclick();assert.equal(app.run('state.complete'),true);assert.equal(app.run('state.records.length'),1);
app=load();assert.equal(app.run('state.complete'),true);assert.equal(app.run('state.records.length'),1);assert(app.el('result').children.length>0);app.el('retry').onclick();assert.equal(app.run('state.attempt'),2);assert.equal(app.run('state.records.length'),1);
const other=load({quiz:{...data,title:'Different quiz'}});assert.equal(other.run('state'),null);
const unavailable=load({blocked:true});assert.equal(unavailable.el('start').disabled,true);
console.log('Passed: refresh resume, stable order, locked answers, delayed feedback, completed attempt retention, retry history, quiz isolation, blocked storage.');

