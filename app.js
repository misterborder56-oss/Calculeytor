var exp = "";
var history = [];

// CARGAR HISTORIAL
(function loadHistory() {
  try {
    var h = localStorage.getItem("calcHistory");
    if(h && h!=="undefined" && h!=="null"){
      var parsed = JSON.parse(h);
      if(Array.isArray(parsed)) history = parsed;
    }
  } catch(e){ history=[]; }
})();

function screen(){ return document.getElementById("screen"); }
function updateHistoryUI(){
  var list = document.getElementById("historyList");
  if(!list) return;
  list.innerHTML="";
  if(!Array.isArray(history)) history=[];
  for(var i=history.length-1;i>=0;i--){
    var li=document.createElement("li");
    li.textContent=history[i];
    list.appendChild(li);
  }
}
updateHistoryUI();

function add(v){ exp+=v; screen().value=exp; }
function clearAll(){ exp=""; screen().value=""; }
function del(){ exp=exp.slice(0,-1); screen().value=exp; }

function parseExpression(e){
  e = e.replace(/×/g,"*").replace(/÷/g,"/");
  e = e.replace(/(\d+(?:\.\d+)?)%(\d+(?:\.\d+)?)/g,function(_,a,b){
    return "("+a+"*"+b+"/100)";
  });
  return e;
}
function isValidExpression(e){ return !/[+\-*/%]$/.test(e); }

function calc(){
  if(!exp || !isValidExpression(exp)) return;
  try{
    var parsed = parseExpression(exp);
    var result = Function('"use strict"; return ('+parsed+')')();
    if(!Array.isArray(history)) history=[];
    history.push(exp+" = "+result);
    localStorage.setItem("calcHistory",JSON.stringify(history));
    updateHistoryUI();
    exp=String(result);
    screen().value=exp;
  } catch(e){ screen().value="Error"; exp=""; }
}

function clearHistory(){ history=[]; localStorage.removeItem("calcHistory"); updateHistoryUI(); }
function sci(type){
  if(!exp) return;
  var v = Number(exp), r;
  if(type==="sin") r=Math.sin(v);
  if(type==="cos") r=Math.cos(v);
  if(type==="tan") r=Math.tan(v);
  if(type==="sqrt") r=Math.sqrt(v);
  if(type==="pow") r=v*v;
  if(type==="pi") r=Math.PI;
  exp=String(r); screen().value=exp;
}
function toggleSci(){ document.getElementById("scientific").classList.toggle("hidden"); }
function applyTheme(){
  var value = document.getElementById("themeSelect").value;
  document.body.className = value;
    }
