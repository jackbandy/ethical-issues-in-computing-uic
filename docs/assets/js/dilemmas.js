// NOTICE: Moved verbatim out of an inline <script> in dilemmas.html by an LLM coding
// system (Claude Code), so the Content-Security-Policy can drop 'unsafe-inline'.

const grid = document.getElementById("cardGrid");
const baseurl = grid.dataset.baseurl || "";
const searchInput = document.getElementById("searchInput");
const countEl = document.getElementById("dilemmaCount");
const noResults = document.getElementById("noResults");

function render(list) {
  grid.innerHTML = "";
  list.forEach(dilemma => {
    const card = document.createElement("a");
    card.className = "dilemma-card";
    card.href = baseurl + "/dilemmas/" + dilemma.slug + "/";

    const title = document.createElement("h3");
    title.textContent = dilemma.title;
    const summary = document.createElement("p");
    summary.textContent = dilemma.summary;
    card.append(title, summary);

    grid.appendChild(card);
  });
  countEl.textContent = list.length + " of " + dilemmas.length + " dilemmas";
  noResults.hidden = list.length > 0;
}

let order = [...dilemmas].sort(() => Math.random() - 0.5);

function applyFilter() {
  const query = searchInput.value.trim().toLowerCase();
  render(order.filter(d =>
    d.title.toLowerCase().includes(query) ||
    d.summary.toLowerCase().includes(query)
  ));
}

searchInput.addEventListener("input", applyFilter);

document.getElementById("shuffleBtn").addEventListener("click", () => {
  order = [...order].sort(() => Math.random() - 0.5);
  applyFilter();
});

const readMoreToggle = document.getElementById("readMoreToggle");
const dilemmasAbout = document.getElementById("dilemmasAbout");
readMoreToggle.addEventListener("click", () => {
  const expanded = readMoreToggle.getAttribute("aria-expanded") === "true";
  readMoreToggle.setAttribute("aria-expanded", String(!expanded));
  dilemmasAbout.hidden = expanded;
  readMoreToggle.textContent = expanded ? "Read more" : "Read less";
});

render(order);

