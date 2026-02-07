const display = document.getElementById("display");
const preview = document.getElementById("preview");
const historyDiv = document.getElementById("history");
const scientific = document.getElementById("scientific");
const toggleSci = document.getElementById("toggleSci");
const themeSelect = document.getElementById("themeSelect");

let expr = "";
let history = JSON.parse(localStorage.getItem("history")) || [];

/* MODO CIENTÍFICO */
toggleSci.onclick = () => {
  scientific.classList.toggle("show");
};

/* TEMAS */
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.className = savedTheme;
  themeSelect.value = savedTheme;
}

themeSelect.onchange = () => {
  document.body.className = themeSelect.value;
  localStorage.setItem("theme", themeSelect.value);
};

/* HISTORIAL */
function renderHistory() {
  historyDiv.innerHTML = "";
  history.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "history-row";
    row.innerHTML = `<span>${item}</span><button class="history-delete">✖</button>`;
    row.querySelector("button").onclick = () => {
      history.splice(i, 1);
      saveHistory();
    };
    historyDiv.appendChild(row);
  });
}
function saveHistory() {
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}
renderHistory();

/* BOTONES */
document.querySelectorAll(".buttons button, .scientific button")
  .forEach(btn => btn.onclick = () => handle(btn.textContent));

function handle(val) {
  if (val === "AC") return reset();
  if (val === "⌫") return back();
  if (val === "=") return calculate();
  if (val === "%") return addPercent();

  if (val === "π") expr += Math.PI;
  else if (val === "e") expr += Math.E;
  else if (["sin","cos","tan","log","ln"].includes(val)) expr += val + "(";
  else if (val === "√") expr += "sqrt(";
  else expr += val;

  update();
}

function reset() {
  expr = "";
  display.textContent = "0";
  preview.textContent = "";
}

function back() {
  expr = expr.slice(0,-1);
  update();
}

function addPercent() {
  if (!expr.endsWith("%")) expr += "%";
  update();
}

function update() {
  display.textContent = expr || "0";
  try {
    preview.textContent = "= " + evaluate(expr);
  } catch {
    preview.textContent = "";
  }
}

function calculate() {
  try {
    const res = evaluate(expr);
    history.push(`${expr} = ${res}`);
    saveHistory();
    expr = res.toString();
    update();
    preview.textContent = "";
  } catch {
    display.textContent = "Error";
  }
}

function evaluate(e) {
  e = e.replace(/(\d+\.?\d*)\s*%\s*(\d+\.?\d*)/g, "($1/100)*$2");
  e = e.replace(/(\d+\.?\d*)%/g, "($1/100)");

  return Function("return " +
    e.replace(/×/g,"*")
     .replace(/÷/g,"/")
     .replace(/−/g,"-")
     .replace(/sqrt/g,"Math.sqrt")
     .replace(/sin/g,"Math.sin")
     .replace(/cos/g,"Math.cos")
     .replace(/tan/g,"Math.tan")
     .replace(/ln/g,"Math.log")
     .replace(/log/g,"Math.log10")
  )();
}
