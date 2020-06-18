if (!window.Symbol) {
  var root = document.querySelector("#root");
  root.innerHTML = "This browser is not supported. Please use a modern web browser like Google Chrome or Mozilla Firefox.";
  root.style.fontFamily = "Arial, sans-serif";
  root.style.fontSize = "24px";
}