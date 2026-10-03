// NOTICE: Moved verbatim out of an inline <script> in _layouts/dilemma.html by an LLM coding
// system (Claude Code), so the Content-Security-Policy can drop 'unsafe-inline'.

const contextToggle = document.querySelector(".context-toggle");
if (contextToggle) {
  const context = document.getElementById("dilemmaContext");
  contextToggle.addEventListener("click", () => {
    const expanded = contextToggle.getAttribute("aria-expanded") === "true";
    contextToggle.setAttribute("aria-expanded", String(!expanded));
    context.hidden = expanded;
    contextToggle.textContent = expanded ? "Show sources and context" : "Hide sources and context";
  });
}

