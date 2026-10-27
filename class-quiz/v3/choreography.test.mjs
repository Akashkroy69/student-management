import test from 'node:test';
import assert from 'node:assert/strict';
import {actionScenes,choreographyCSS} from './choreography.mjs';
import {characterCollection} from './characters.mjs';
test('26 characters have distinct dances and thought scenes',()=>{const roster=characterCollection();assert.equal(roster.length,26);assert.equal(new Set(roster.map(c=>c.actions[1])).size,26);for(const c of roster){assert.equal(new Set(actionScenes[c.id].svg).size,3);assert.match(c.svg,/class="head"/);assert.match(c.svg,/thought-cloud/);for(const part of ['left','right','head'])assert.ok(choreographyCSS.includes('@keyframes '+c.id+'-dance-'+part+'{'));assert.ok(choreographyCSS.includes('@keyframes '+c.id+'-dance{'));for(const part of ['left','right','head'])assert.ok(choreographyCSS.includes('@keyframes '+c.id+'-think-'+part+'{'));}});
test('reactions loop and respect reduced motion',()=>{assert.match(choreographyCSS,/infinite/);assert.match(choreographyCSS,/prefers-reduced-motion/);assert.match(choreographyCSS,/music-beat/);});
