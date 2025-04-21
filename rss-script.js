const backend = "https://veille-finance.onrender.com/rss/";

const feeds = [
  { name: "Le Temps", source: "letemps" },
  { name: "Le Monde (Économie)", source: "lemonde" },
  { name: "WSJ Markets", source: "wsj" },
  { name: "Bloomberg", source: "bloomberg" },
  { name: "Financial Times", source: "ft" },
  { name: "WallStreetBets (Reddit)", source: "reddit" },
  { name: "Business Insider", source: "bi" },
  { name: "CNBC", source: "cnbc" },
  { name: "Reuters", source: "reuters" },
  { name: "Fortune", source: "fortune" }
];

async function loadFeeds() {
  const container = document.getElementById("rss-container");

  for (const feed of feeds) {
    try {
      const res = await fetch(`${backend}${feed.source}`);
      const data = await res.json();

      const box = document.createElement("div");
      box.className = "bg-white p-4 rounded shadow";

      box.innerHTML = `
        <h2 class="text-xl font-semibold mb-2">${feed.name}</h2>
        <ul class="space-y-1">
          ${data.items.map(item =>
            `<li><a href="${item.link}" class="text-blue-600 hover:underline" target="_blank">${item.title}</a></li>`
          ).join("")}
        </ul>
      `;
      container.appendChild(box);
    } catch (error) {
      console.error("Erreur flux :", feed.name, error);
    }
  }
}

loadFeeds();
