import { getData, saveData } from "./main.js";
const list = document.getElementById("list");
const data = getData("budget");
document.getElementById("add").onclick = () => {
  const val = document.getElementById("amount").value;
  if (val) {
    data.push(val);
    saveData("budget", data);
    render();
  }
};
function render() {
  list.innerHTML = data.map((x) => `<li>${x}</li>`).join("");
}
render();
