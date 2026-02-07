/* RESET */
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s;
}

/* =====================
   TEMAS (DIRECTOS)
===================== */
body.theme-dark {
  background: #111;
}

body.theme-light {
  background: #f2f2f2;
}

body.theme-blue {
  background: #0a1a2a;
}

/* =====================
   CALCULADORA
===================== */
.calculator {
  width: 100%;
  max-width: 380px;
  padding: 14px;
  border-radius: 16px;
  background: #222;
  color: white;
}

body.theme-light .calculator {
  background: #ffffff;
  color: black;
}

body.theme-blue .calculator {
  background: #0f2b46;
  color: white;
}

/* =====================
   HEADER
===================== */
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

header select,
header button {
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

body.theme-dark header select,
body.theme-dark header button {
  background: #333;
  color: white;
}

body.theme-light header select,
body.theme-light header button {
  background: #ddd;
  color: black;
}

body.theme-blue header select,
body.theme-blue header button {
  background: #1d4f7a;
  color: white;
}

/* =====================
   PANTALLA
===================== */
.screen {
  border-radius: 10px;
  padding: 10px;
  text-align: right;
  margin-bottom: 10px;
}

body.theme-dark .screen {
  background: #000;
}

body.theme-light .screen {
  background: #e6e6e6;
}

body.theme-blue .screen {
  background: #14395a;
}

#preview {
  font-size: 14px;
  opacity: 0.6;
}

#display {
  font-size: 28px;
}

/* =====================
   BOTONES
===================== */
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

button {
  padding: 14px;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.1s;
}

button:active {
  transform: scale(0.95);
}

body.theme-dark button {
  background: #333;
  color: white;
}

body.theme-light button {
  background: #ddd;
  color: black;
}

body.theme-blue button {
  background: #1d4f7a;
  color: white;
}

/* =====================
   MODO CIENTÍFICO
===================== */
.scientific {
  display: none;
  margin-top: 10px;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.scientific.show {
  display: grid;
}

/* =====================
   HISTORIAL
===================== */
.history {
  margin-top: 10px;
}

.history-row {
  display: flex;
  justify-content: space-between;
  padding: 6px;
  border-radius: 6px;
  margin-bottom: 5px;
}

body.theme-dark .history-row {
  background: rgba(255,255,255,0.08);
}

body.theme-light .history-row {
  background: #e0e0e0;
}

body.theme-blue .history-row {
  background: rgba(255,255,255,0.1);
}

.history-delete {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}
