/*
  ============================================================
  CALCULATOR — calculator.js
  ============================================================
  This file controls the BEHAVIOUR of the calculator.
  It handles what happens when buttons are clicked:
  storing numbers, applying operators, and showing results.

  TOPICS COVERED IN THIS FILE:
    1. Selecting HTML elements with JavaScript
    2. Variables and state management
    3. Functions — what they are and how to use them
    4. The switch statement
    5. Event listeners (responding to clicks and key presses)
    6. Manipulating the DOM (changing what the page shows)
    7. CSS class manipulation from JavaScript
    8. Animations triggered by JavaScript
  ============================================================
*/


/* ============================================================
   SECTION 1 — SELECTING HTML ELEMENTS
   ============================================================
   Before JavaScript can read or change anything on the page,
   it needs a reference to the HTML element.

   document.getElementById('id') finds an element by its id.
   We store the result in a variable so we can reuse it easily.

   These two variables point to the display elements in the HTML.
   We'll update their .textContent whenever the display changes.
============================================================ */
const resultEl = document.getElementById('result');
const exprEl   = document.getElementById('expression');


/* ============================================================
   SECTION 2 — STATE VARIABLES
   ============================================================
   "State" means the current situation / memory of the app.
   These variables track everything the calculator needs to
   remember between button presses.

   Think of it like a notepad the calculator carries around.
============================================================ */

// The number currently being typed or shown on screen.
// Starts as the string '0' (not the number 0 — always stored as text here).
let current = '0';

// The first number in an operation (e.g. the "12" in "12 + 5").
// null means no previous number has been stored yet.
let prev = null;

// The operator the user selected: '+', '−', '×', or '÷'.
// null means no operator has been selected yet.
let operator = null;

// A flag (true/false) that tracks whether the last action was
// pressing = or selecting an operator.
// When true, the next digit starts a fresh number instead of appending.
let justEvaled = false;

// Tracks which operator button is currently highlighted (active).
// Used so we can un-highlight it when needed.
let activeOp = null;


/* ============================================================
   SECTION 3 — DISPLAY FUNCTIONS
   ============================================================
   These functions are responsible for updating what the user
   sees on screen. Any time a value changes, we call these.
============================================================ */

/*
  updateDisplay(val, showExpr)
  ─────────────────────────────
  Updates the main number on screen and optionally the
  expression line above it.

  Parameters:
    val      → the number to show (as a string)
    showExpr → (optional) text for the expression line.
               If not provided, the expression stays unchanged.

  How it works:
    1. Counts how many digits val has.
    2. Picks the right font-size class (normal / small / xsmall).
    3. Sets the text content of both display elements.
*/
function updateDisplay(val, showExpr) {

  // Count digits only — ignore the minus sign and decimal point
  const len = val.replace('-', '').replace('.', '').length;

  // Dynamically set a CSS class based on number length.
  // This makes long numbers shrink so they fit on screen.
  resultEl.className = 'result'
    + (len > 9 ? ' xsmall'   // very long → smallest font
    : len > 7  ? ' small'    // medium long → medium font
    : '');                   // short → default large font

  // Show the formatted number on screen
  resultEl.textContent = format(val);

  // Only update the expression line if a value was passed in
  if (showExpr !== undefined) {
    exprEl.textContent = showExpr;
  }
}

/*
  format(val)
  ────────────
  Cleans up a number before displaying it.
  Limits precision to 10 significant digits to avoid
  floating-point weirdness like 0.1 + 0.2 = 0.30000000000000004.

  parseFloat() converts a string to a floating-point number.
  toPrecision(10) rounds to 10 significant digits.
  toString() converts it back to a string for display.
*/
function format(val) {
  if (val === 'Error') return 'Error'; // pass through error messages

  const num = parseFloat(val);
  if (isNaN(num)) return val;          // if it's not a number, return as-is

  return parseFloat(num.toPrecision(10)).toString();
}


/* ============================================================
   SECTION 4 — OPERATOR HIGHLIGHT
   ============================================================
   When the user presses an operator button (+, −, ×, ÷),
   that button should turn white (the "active" look) to show
   it's been selected. When the user moves on, it turns back.
============================================================ */

/*
  setActiveOp(op)
  ────────────────
  Highlights the operator button matching "op".
  Removes the highlight from all others first.

  Pass null to clear all highlights (no active operator).

  How it works:
    - querySelectorAll finds ALL elements matching a selector.
    - forEach loops through them all.
    - classList.remove / classList.add add or remove CSS classes.
*/
function setActiveOp(op) {
  // First, remove "active" from every operator button
  document.querySelectorAll('.btn.op').forEach(btn => {
    btn.classList.remove('active');
  });

  // If an operator was provided, highlight just that one
  if (op) {
    document.querySelectorAll('.btn.op').forEach(btn => {
      // dataset.value reads the data-value attribute from the HTML
      if (btn.dataset.value === op) {
        btn.classList.add('active');
      }
    });
  }

  // Remember which operator is active
  activeOp = op;
}


/* ============================================================
   SECTION 5 — MATH
   ============================================================
   This function takes two numbers and an operator symbol,
   and returns the result of the operation.
============================================================ */

/*
  compute(a, op, b)
  ──────────────────
  Performs the arithmetic between two numbers.

  Parameters:
    a  → the first number (string, gets converted to float)
    op → the operator symbol ('+ '−' '×' '÷')
    b  → the second number (string, gets converted to float)

  Returns:
    The result as a number, or the string 'Error' for division by zero.

  switch / case is like a series of if/else but cleaner when
  checking one variable against many possible values.
*/
function compute(a, op, b) {
  a = parseFloat(a); // convert string '12' → number 12
  b = parseFloat(b);

  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷':
      // Guard against division by zero — mathematically undefined
      return b === 0 ? 'Error' : a / b;
  }
}


/* ============================================================
   SECTION 6 — ANIMATIONS
   ============================================================
   JavaScript can trigger CSS animations by adding/removing
   classes. The animations themselves are defined in the CSS file.
============================================================ */

/*
  popAnim()
  ──────────
  Makes the result number briefly "pop" (scale up then back).
  Called when the user presses =.

  The trick with "void element.offsetWidth":
    CSS animations don't restart if the class is already applied.
    Reading offsetWidth forces the browser to recalculate layout
    (a "reflow"), which resets the animation so it can play again.
*/
function popAnim() {
  resultEl.classList.remove('pop');
  void resultEl.offsetWidth; // force browser reflow — resets the animation
  resultEl.classList.add('pop');

  // Clean up the class after the animation finishes (0.18s = 180ms)
  setTimeout(() => resultEl.classList.remove('pop'), 200);
}


/* ============================================================
   SECTION 7 — CORE LOGIC (handleAction)
   ============================================================
   This is the heart of the calculator.
   Every button press calls this function with:
     action → what kind of button was pressed (from data-action)
     value  → the specific value, if any (from data-value)

   It uses a switch statement to decide what to do.
============================================================ */

/*
  handleAction(action, value)
  ────────────────────────────
  Reads the action type and updates the calculator state accordingly.
  After updating state, it calls updateDisplay() to refresh the screen.
*/
function handleAction(action, value) {

  switch (action) {

    /* ── DIGIT (0–9) ─────────────────────────────────────────
       Appends the pressed digit to the current number.

       Special cases:
         • If justEvaled is true (last action was = or operator),
           start fresh instead of appending.
         • Don't let the number exceed 12 digits.
         • Don't append a digit to a lone '0' (e.g. "0" + "5" = "5", not "05").
    ─────────────────────────────────────────────────────────── */
    case 'digit':
      if (justEvaled) {
        // Start a new number from scratch
        current    = value;
        justEvaled = false;
      } else {
        // Replace lone zero, or append digit if under 12 chars
        current = (current === '0' && value !== '.')
          ? value
          : (current.length < 12 ? current + value : current);
      }
      setActiveOp(null); // typing a digit clears the operator highlight
      updateDisplay(current);
      break;

    /* ── DECIMAL POINT ───────────────────────────────────────
       Adds a "." to make a decimal number like 3.14.
       Prevents adding a second decimal point to the same number.
    ─────────────────────────────────────────────────────────── */
    case 'decimal':
      if (justEvaled) {
        current    = '0.'; // start a fresh decimal number
        justEvaled = false;
      } else if (!current.includes('.')) {
        // Only add a dot if there isn't one already
        current += '.';
      }
      setActiveOp(null);
      updateDisplay(current);
      break;

    /* ── OPERATOR (+, −, ×, ÷) ──────────────────────────────
       Stores the current number as "prev" and remembers the operator.
       If the user chains operations (e.g. 2 + 3 × ...), it first
       computes the pending result before storing the new operator.
    ─────────────────────────────────────────────────────────── */
    case 'operator':
      setActiveOp(value); // highlight the pressed operator button

      if (prev !== null && operator && !justEvaled) {
        // There's already a pending operation — compute it first
        // e.g. user typed: 2 + 3 ×  → compute 2+3=5 first
        const res = compute(prev, operator, current);
        prev = String(res === 'Error' ? 0 : res);
        updateDisplay(prev, `${format(prev)} ${value}`);
      } else {
        // No pending operation — just store current as the first number
        prev = current;
        exprEl.textContent = `${format(current)} ${value}`;
      }

      operator   = value; // remember the selected operator
      justEvaled = true;  // next digit press will start a fresh number
      break;

    /* ── EQUALS ──────────────────────────────────────────────
       Computes the final result and shows it.
       Also shows the full expression in the expression line.
    ─────────────────────────────────────────────────────────── */
    case 'equals':
      if (operator && prev !== null) {
        // Build the expression string for display, e.g. "12 + 5 ="
        const expr = `${format(prev)} ${operator} ${format(current)}`;
        const res  = compute(prev, operator, current);

        // Show the expression line with a fade-up animation
        exprEl.textContent = expr + ' =';
        exprEl.classList.remove('expr-show');
        void exprEl.offsetWidth; // force reflow to replay animation
        exprEl.classList.add('expr-show');

        // Update current to the result, rounded to 10 significant digits
        current = res === 'Error'
          ? 'Error'
          : String(parseFloat(res.toPrecision(10)));

        // Reset state — the operation is complete
        prev       = null;
        operator   = null;
        justEvaled = true;

        setActiveOp(null);
        popAnim();           // play the pop animation on the result
        updateDisplay(current);
      }
      break;

    /* ── CLEAR (AC) ──────────────────────────────────────────
       Resets everything back to the initial state.
       Like turning the calculator off and on again.
    ─────────────────────────────────────────────────────────── */
    case 'clear':
      current    = '0';
      prev       = null;
      operator   = null;
      justEvaled = false;
      setActiveOp(null);
      exprEl.textContent = '';
      updateDisplay('0');
      break;

    /* ── BACKSPACE ────────────────────────────────────────────
       Removes the last digit typed.
       If only one digit remains, resets to '0'.
       Does nothing if the last action was = (justEvaled).
    ─────────────────────────────────────────────────────────── */
    case 'backspace':
      if (justEvaled) break; // can't backspace after a completed calculation
      current = current.length > 1
        ? current.slice(0, -1) // remove last character
        : '0';                 // fall back to zero if nothing left
      updateDisplay(current);
      break;

    /* ── NEGATE (+/−) ─────────────────────────────────────────
       Flips the sign of the current number.
       Adds a '-' prefix if positive, removes it if already negative.
    ─────────────────────────────────────────────────────────── */
    case 'negate':
      if (current !== '0') {
        current = current.startsWith('-')
          ? current.slice(1)   // remove the leading minus sign
          : '-' + current;     // add a minus sign at the front
        updateDisplay(current);
      }
      break;

    /* ── PERCENT (%) ──────────────────────────────────────────
       Converts the current number to a percentage.
       Divides by 100: e.g. "50" becomes "0.5".
    ─────────────────────────────────────────────────────────── */
    case 'percent':
      current = String(parseFloat(current) / 100);
      updateDisplay(current);
      break;

  } // end switch
}


/* ============================================================
   SECTION 8 — EVENT LISTENERS
   ============================================================
   Event listeners "listen" for something to happen (a click,
   a key press, etc.) and then run a function in response.

   This is the bridge between the HTML buttons and our logic.
============================================================ */

/*
  BUTTON CLICK LISTENERS
  ───────────────────────
  querySelectorAll('.btn') returns all button elements.
  forEach loops through each one and attaches a click listener.

  When clicked:
    1. A ripple animation is created and injected into the button.
    2. handleAction() is called with the button's data attributes.
*/
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {

    // ── CREATE RIPPLE EFFECT ──────────────────────────────
    // Create a new <span> element in JavaScript (not in HTML)
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    // Position the ripple where the user clicked.
    // e.offsetX / e.offsetY = click position relative to the button.
    // We subtract 20 (half of 40px ripple size) to center it.
    ripple.style.left = (e.offsetX - 20) + 'px';
    ripple.style.top  = (e.offsetY - 20) + 'px';

    // Inject the ripple element inside the button
    btn.appendChild(ripple);

    // Remove it after the animation finishes (0.35s = 350ms)
    setTimeout(() => ripple.remove(), 400);

    // ── HANDLE THE ACTION ──────────────────────────────────
    // Read the data-action and data-value attributes from the button
    handleAction(btn.dataset.action, btn.dataset.value);
  });
});


/*
  KEYBOARD SUPPORT
  ─────────────────
  Listens for key presses on the entire document.
  Maps keyboard keys to calculator actions.

  This makes the calculator usable without a mouse —
  great for accessibility and power users.

  e.key → a string representing which key was pressed.
  e.preventDefault() → stops the browser's default behaviour
    (e.g. '/' would normally open the browser's find bar).
*/
document.addEventListener('keydown', (e) => {
  if      (e.key >= '0' && e.key <= '9') handleAction('digit', e.key);
  else if (e.key === '.')                 handleAction('decimal');
  else if (e.key === '+')                 handleAction('operator', '+');
  else if (e.key === '-')                 handleAction('operator', '−');
  else if (e.key === '*')                 handleAction('operator', '×');
  else if (e.key === '/') {
    e.preventDefault();                   // stop browser's default '/' action
    handleAction('operator', '÷');
  }
  else if (e.key === 'Enter' || e.key === '=') handleAction('equals');
  else if (e.key === 'Backspace')              handleAction('backspace');
  else if (e.key === 'Escape')                 handleAction('clear');
  else if (e.key === '%')                      handleAction('percent');
});


/* ============================================================
   SECTION 9 — INITIALISATION
   ============================================================
   This runs once when the page loads.
   It sets the initial display to show "0".

   Everything above this line just *defines* functions and
   variables — nothing actually runs until we call it.
   This line is where execution begins.
============================================================ */
updateDisplay('0');
