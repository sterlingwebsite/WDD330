import { getData, saveData } from "./main.js";
let data = getData("music");
const list = document.getElementById("list");
document.getElementById("add").onclick = () => {
  const v = document.getElementById("song").value;
  if (v) {
    data.push(v);
    saveData("music", data);
    render();
  }
};
function render() {
  list.innerHTML = data.map((x) => `<li>${x}</li>`).join("");
}
render();
