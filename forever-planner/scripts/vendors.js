document.getElementById("btn").onclick = async () => {
  const q = document.getElementById("search").value;
  const r = await fetch(
    "https://api.unsplash.com/search/photos?query=" + q + "&client_id=DEMO_KEY",
  );
  const d = await r.json();
  document.getElementById("results").innerHTML = d.results
    .map((p) => `<img src="${p.urls.thumb}">`)
    .join("");
};
