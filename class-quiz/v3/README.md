# Quiz template v3

Use this version for all new quizzes. It preserves answer locking, browser-local attempt history, refresh resume, shuffled questions/options and completion review from the saved quiz engine.

## Build

```sh
node class-quiz/v3/build.mjs questions.json quiz.html
node --test class-quiz/v3/characters.test.mjs
```

Only author question JSON. Set questionCount to the explicitly requested count (for example 20). When creating lesson notes without a requested count, use a bank of 10–15 with 5 per attempt.

## Character collection

26 original simplified superhero-inspired and friendly mascot illustrations. All SVG art is self-contained; no external images, fonts or API are required. Each question receives a character, without repeats until the collection is exhausted. The assignment is saved in localStorage with the attempt. Characters have an answering, correct and incorrect animation. Reactions loop until Next. Wrong answers use investigation gestures and never shame the learner. Includes Pause motion and reduced-motion support.

Characters: Web Hero, Armour Hero, Shield Hero, Thunder Hero, Gentle Giant, Panther Hero, Portal Wizard, Cosmic Hero, Stretch Hero, Night Detective, Cape Hero, Lasso Hero, Speed Hero, Ocean Hero, Sky Hero, Puppy, Kitten, Bunny, Panda, Fox, Owl, Penguin, Dragon, Astronaut, Robot.

Files: characters.mjs (SVG components and states), characters.css (animations), characters-runtime.js (selection, persistence and feedback), themes.mjs (four illustrated scenes), template.html (existing engine with extension hooks), build.mjs (standalone HTML builder).

## Accessibility and limits

The character appears beside the question, is smaller on narrow screens, and does not cover answers. Correctness feedback is announced in the existing live region. Animation respects prefers-reduced-motion. Saved attempts are browser-local, not server-enforced anti-cheating. Clearing storage or using a different device bypasses local attempt history. Existing uploaded quizzes remain unchanged until rebuilt and reuploaded.

## Verification

Syntax, roster uniqueness, animation availability, non-repeating assignment, answer locking and refresh-state behaviour are checked. Full browser visual QA remains required before claiming production visual approval. Public Notion playback must be checked separately.

## Distinct choreography upgrade

Each of the 26 characters now has three original action scenes (78 total). `choreography.mjs` defines the props, character-specific limb movements and body paths. Examples include webs, rocket jets, shield throws, lightning, holograms, lasso spins, yarn, bamboo, books and circuit panels. Generic shared victory waves and question-mark overlays are disabled. Reactions loop with a resting beat. The gallery labels every action. Run `node --test class-quiz/v3/*.test.mjs` when the local runtime is available. Logic and structural checks passed; browser visual QA remains pending because the browser runtime cannot start.

## Strong dance / thoughtful reactions

Correct answers trigger one of 26 distinct full-body dances with coordinated arms, head movement and musical notes. Wrong answers trigger character-specific thoughtful head/hand gestures and a visible thought bubble. Answering actions remain character-specific. Reactions loop until Next, preserve reduced-motion and pause controls, and do not change answer locking. Regenerate uploaded quizzes to apply the upgrade. Existing Notion attachments remain unchanged.

Harry Potter is included with custom glasses, scar, scarf, wand, a wizard jig for correct answers and spell-book thinking for incorrect answers.
