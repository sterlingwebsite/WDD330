import { getData, saveData } from "./main.js";
let data = getData("guests");
const list = document.getElementById("list");
document.getElementById("add").onclick = () => {
  const v = document.getElementById("name").value;
  if (v) {
    data.push(v);
    saveData("guests", data);
    render();
  }
};
function render() {
  list.innerHTML = data.map((x) => `<li>${x}</li>`).join("");
}
render();
