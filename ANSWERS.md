# Assessment Answers

## 1. How to run
See README.md for instructions.

## 2. Stack & design choices
**Stack:** React and plain CSS.
I went with a two-column Flexbox layout for desktop. It keeps the inputs and the live results in the same view, which feels more responsive for the user. I chose a high-contrast dark panel for the results to visually separate the 'summary' from the 'input' section.

## 3. Responsive & accessibility
I used semantic HTML labels for all inputs to keep it accessible. For error handling, I implemented red borders and concise messages that trigger as the user types. I decided against using "aria-live" on the results; since they update on every keystroke, it would likely be too noisy for screen readers.

## 4. AI usage
*Tool:* Gemini Code Assist was used to help scaffold the initial CSS structure and layout.
*Refinement:* I manually adjusted the responsive breakpoints and simplified the logic to use derived state for better performance and readability.

## 5. Honest gap
*Gap:* The app works well for normal bills. However, if the bill is a very large number (like trillions), the text might overlap. In the future, I would add code to shrink the font size automatically for large totals.

## Rounding Policy
*Policy:* I use a "Round Up" rule. For example, if you split $10.00 between 3 people, each person pays $3.34. This ensures the full bill is always covered.
