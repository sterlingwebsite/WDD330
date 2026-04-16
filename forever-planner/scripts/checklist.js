import { getData, saveData } from "./main.js";
let data = getData("tasks");
const list = document.getElementById("list");
document.getElementById("add").onclick = () => {
  const v = document.getElementById("task").value;
  if (v) {
    data.push({ text: v, done: false });
    saveData("tasks", data);
    render();
  }
};
function toggle(i) {
  data[i].done = !data[i].done;
  saveData("tasks", data);
  render();
}
function render() {
  list.innerHTML = data
    .map(
      (t, i) =>
        `<li onclick="toggle(${i})">${t.done ? "✔" : ""} ${t.text}</li>`,
    )
    .join("");
}
window.toggle = toggle;
render();
