import test from 'node:test';
import assert from 'node:assert/strict';
import {actionScenes,choreographyCSS} from './choreography.mjs';
import {characterCollection} from './characters.mjs';
test('25 characters each have three distinct described SVG actions',()=>{const c=characterCollection();assert.equal(c.length,25);for(const x of c){assert.equal(actionScenes[x.id].svg.length,3);assert.equal(new Set(x.actions).size,3);assert.equal(new Set(actionScenes[x.id].svg).size,3);for(const s of ['answering','correct','incorrect']){assert.ok(x.svg.includes('action-'+s));for(const part of ['body','prop','left','right'])assert.ok(choreographyCSS.includes('@keyframes '+x.id+'-'+s+'-'+part+'{'));}}});
test('choreography has reduced motion override and suppresses generic symbols',()=>{assert.match(choreographyCSS,/prefers-reduced-motion/);assert.match(choreographyCSS,/thinking-mark/);assert.match(choreographyCSS,/infinite/);});
