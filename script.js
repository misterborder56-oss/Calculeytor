const display = document.getElementById("display");
const preview = document.getElementById("preview");
const historyDiv = document.getElementById("history");
const scientific = document.getElementById("scientific");
const toggleSci = document.getElementById("toggleSci");

let expr = "";
let sciOpen = false;
let history = JSON.parse(localStorage.getItem("history")) || [];

/* ======================
   MODO CIENTÍFICO
====================== */
toggleSci.onclick = () => {
  sciOpen = !sciOpen;
  scientific.classList.toggle("show", sciOpen);
  toggleSci.textContent = sciOpen ? "❌" : "🔬";
};
/* ======================
   HISTORIAL
====================== */
function renderHistory() {
  historyDiv.innerHTML = "";

  history.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "history-row";

    const text = document.createElement("span");
    text.textContent = item;

    const del = document.createElement("button");
    del.textContent = "✖";
    del.className = "history-delete";

    del.onclick = () => {
      history.splice(index, 1);
      saveHistory();
    };

    row.appendChild(text);
    row.appendChild(del);
    historyDiv.appendChild(row);
  });
}

function saveHistory() {
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

renderHistory()

renderHistory();

function saveHistory() {
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

/* ======================
   BOTONES (FIX REAL)
====================== */
// SOLO botones de cálculo
document
  .querySelectorAll(".buttons button, .scientific button")
  .forEach(btn => {
    btn.addEventListener("click", () => {
      handle(btn.textContent.trim());
    });
  });

/* ======================
   MANEJO DE BOTONES
====================== */
function handle(val) {

  if (val === "AC") {
    expr = "";
    display.textContent = "0";
    preview.textContent = "";
    return;
  }

  if (val === "⌫") {
    expr = expr.slice(0, -1);
    display.textContent = expr || "0";
    livePreview();
    return;
  }

  if (val === "=") {
    calculate();
    return;
  }

  if (val === "%") {
    if (expr && !expr.endsWith("%")) {
      expr += "%";
      display.textContent = expr;
      livePreview();
    }
    return;
  }

  if (val === "π") {
    expr += Math.PI;
  } else if (val === "e") {
    expr += Math.E;
  } else if (["sin", "cos", "tan", "log", "ln", "√"].includes(val)) {
    expr += (val === "√" ? "sqrt(" : val + "(");
  } else {
    expr += val;
  }

  display.textContent = expr;
  livePreview();
}

/* ======================
   CALCULAR
====================== */
function calculate() {
  try {
    const result = evaluate(expr);
    history.push(`${expr} = ${result}`);
    saveHistory();
    expr = result.toString();
    display.textContent = expr;
    preview.textContent = "";
  } catch {
    display.textContent = "Error";
  }
}

/* ======================
   PREVIEW
====================== */
function livePreview() {
  try {
    preview.textContent = "= " + evaluate(expr);
  } catch {
    preview.textContent = "";
  }
}

/* ======================
   EVALUADOR
====================== */
function evaluate(e) {

  // A % B → (A/100)*B
  e = e.replace(
    /(\d+\.?\d*)\s*%\s*(\d+\.?\d*)/g,
    "($1/100)*$2"
  );

  // porcentaje simple
  e = e.replace(/(\d+\.?\d*)%/g, "($1/100)");

  return Function("return " +
    e.replace(/×/g, "*")
     .replace(/÷/g, "/")
     .replace(/−/g, "-")
     .replace(/sqrt/g, "Math.sqrt")
     .replace(/sin/g, "Math.sin")
     .replace(/cos/g, "Math.cos")
     .replace(/tan/g, "Math.tan")
     .replace(/ln/g, "Math.log")
     .replace(/log/g, "Math.log10")
  )();
}