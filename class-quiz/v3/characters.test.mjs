import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {characterCollection} from './characters.mjs';
const roster=characterCollection();const css=fs.readFileSync(new URL('./characters.css',import.meta.url),'utf8');
test('26 unique characters, each with 3 defined looping states',()=>{assert.equal(roster.length,26);assert.equal(new Set(roster.map(c=>c.id)).size,26);for(const c of roster){assert.match(c.svg,/<svg/);for(const k of [c.idle,c.correct,c.incorrect])assert.ok(css.includes('@keyframes '+k+'{'));}assert.match(css,/infinite/);assert.match(css,/prefers-reduced-motion/);});
test('runtime syntax and persistence hooks',()=>{const runtime=fs.readFileSync(new URL('./characters-runtime.js',import.meta.url),'utf8');new Function(runtime);assert.match(runtime,/state.characters/);assert.match(runtime,/if\(!save\(\)\)return/);assert.match(runtime,/state.questions.length/);assert.match(runtime,/mascotForQuestion/);});
