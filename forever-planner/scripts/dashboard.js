const el = document.getElementById("countdown");
const t = new Date();
t.setDate(t.getDate() + 30);
setInterval(() => {
  el.textContent =
    Math.floor((t - new Date()) / (1000 * 60 * 60 * 24)) + " days";
}, 1000);
