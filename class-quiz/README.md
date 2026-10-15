# Reusable class quiz

Build with `node class-quiz/build.mjs questions.json quiz.html`.

## Saved attempts (15 October 2026)

- Saves question selection, answer order, submitted answers, position and completed scores in localStorage.
- Refresh resumes the current attempt; completed attempts reopen their result.
- Submitted answers cannot be changed through the quiz controls.
- Correct answers and explanations are shown only after the full attempt finishes.
- Practice retries are labelled with attempt numbers and preserve first and later scores on that browser.
- Optional JSON `"mode": "test"` hides the practice retry button after completion.
- Storage unavailable or a save failure blocks further progress and shows a warning.
- A content fingerprint isolates different quizzes. Changing questions creates a fresh revision and storage record.

This is a browser-local deterrent, not enforced exam security. Clearing storage, another browser/device or inspecting the standalone file bypasses it. Cross-device and tamper-resistant first-attempt records require a server and student authentication. Embedded Notion/browser privacy restrictions may prevent localStorage; verify the deployed embed before distributing it.

Existing uploaded Notion HTML files are snapshots. They require rebuilding and replacing the embed to receive template changes. Do not claim old uploads were updated by changing this template.

Run `node class-quiz/persistence.test.mjs` for refresh, locking, feedback, history, isolation and blocked-storage checks.

