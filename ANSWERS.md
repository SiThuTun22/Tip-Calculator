# Assessment Answers

## 1. How to run
See README.md for instructions.

## 2. Stack & design choices
**Stack:** React + Tailwind CSS.
*Decision 1:* Dual-Column Layout (Desktop). I placed inputs on the left and results on the right to ensure the calculation feedback loop is always visible to the user without scrolling.
*Decision 2:* Grid-based Tip Presets. I picked a grid over a dropdown or list for tip percentages to allow for single-tap selection, with a "Custom" input integrated directly into the grid for a cohesive visual flow. (Affects the "Select Tip %" section).

## 3. Responsive & accessibility
*Consideration:* Implemented accessible labeling using the `htmlFor` attribute. Added visual error states (red borders and text) that appear inline to guide users without relying on disruptive browser-default popups.
*Skipped:* `aria-live` regions for results. In a live-updating calculator, constant announcements on every keystroke can be overwhelming for screen reader users; we will focus on clear focus states instead.

## 4. AI usage
*Tool:* Gemini code assist.
*Usage:* .
*Modification:* 

## 5. Honest gap
*Gap:* The app currently lacks a reset button to quickly clear all fields. I would add a "Reset" button that returns all state variables to their initial empty values.

## Rounding Policy
*Policy:* I will implement a "Round Up to Nearest Cent" policy. This ensures that when splitting a bill (like $10.00 among 3 people), the total collected ($3.34 x 3 = $10.02) always covers the bill, with any remainder acting as a tiny additional tip.
