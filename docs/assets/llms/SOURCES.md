# Sources & Licenses

Figures for the week 8 "Appendix: More LLMs Stuff" slides (the former Week 8, Day 2 draft "Ethical Challenges from LLMs"). Except for the ELIZA screenshot, each was extracted from the instructor's earlier "17 Intro to LLMs" Keynote deck.

- **dickens-next-word-graph.svg** — next-word transition graph trained on the opening of *A Tale of Two Cities*, drawn by the instructor with Matplotlib 3.9.4 (`figure3_training_seed137.pdf` in the Keynote deck) — converted from PDF to SVG with `pdf2svg` — License: same as the course materials

- **best-of-times-next-word-graph.svg**, **best-worst-of-times-next-word-graph.svg** — next-word graphs for "it was the best of times" and "it was the best of times, it was the worst of times," styled after the Dickens graph above; LLM-generated (Claude) with Matplotlib by `sandbox/make_next_word_graphs.py`, pending review — new transitions in the second graph are amber — License: same as the course materials

- **genai-private-investment-ai-index-2025.png** — "Global private investment in generative AI, 2019–24," chart from the [2025 AI Index Report](https://hai.stanford.edu/ai-index/2025-ai-index-report), Stanford HAI; data from Quid, 2024 — screenshot from the Keynote deck (1970 × 1080) — License: the report is published under CC BY-ND 4.0; used unmodified with attribution

- **gebru-mitchell-news-timeline.png** — Google News results for coverage of Timnit Gebru's and Margaret Mitchell's departures from Google (December 2020 to June 2021): BBC, *The Verge*, *The Guardian*, Vox, *MIT Technology Review*, *Wired*, *The New York Times* — screenshot from the Keynote deck, downscaled from 1420px to 1000px wide — License: headlines and thumbnails © their publishers; classroom use only

- **eliza-conversation.png** — [Wikimedia Commons: ELIZA conversation.png](https://commons.wikimedia.org/wiki/File:ELIZA_conversation.png) — a conversation with Norbert Landsteiner's 2005 JavaScript implementation of ELIZA, using the dialogue from Weizenbaum's 1966 paper — License: Public domain — unmodified (751 × 487), metadata stripped

- **the-dalles-data-center.jpg** — [Wikimedia Commons: Google Data Center, The Dalles.jpg](https://commons.wikimedia.org/wiki/File:Google_Data_Center,_The_Dalles.jpg) — Google's data center in The Dalles, Oregon, behind its electrical substation, September 11, 2011 — Photo: Visitor7 — License: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) — downloaded as Commons' 1920px rendition, metadata stripped

- **strubell-rnd-cost.svg** — bar chart of the cloud cost to develop one NLP model (one model, tuning, all R&D), linear axis; values copied from Strubell, Ganesh & McCallum, ["Energy and Policy Considerations for Deep Learning in NLP"](https://aclanthology.org/P19-1355/), *ACL 2019*, Table 4: "1 [model], 120 [hours], $52–$175 · 24, 2880, $1238–$4205 · 4789, 239,942, $103k–$350k"; LLM-generated (Claude) with Matplotlib by `sandbox/llm-visual-options/make_options.py`, pending review — License: same as the course materials

- **two-approaches-to-ai.svg** — illustrative diagram (no data) of a small knowledge graph above a small next-word graph, in a golden-ratio portrait box; LLM-generated (Claude) with Matplotlib by `sandbox/llm-visual-options/make_options.py`, pending review — License: same as the course materials
