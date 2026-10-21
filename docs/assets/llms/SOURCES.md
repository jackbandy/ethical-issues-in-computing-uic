# Sources & Licenses

Figures for the week 8 "Appendix: More LLMs Stuff" slides (the former Week 8, Day 2 draft "Ethical Challenges from LLMs"). Except for the ELIZA screenshot, each was extracted from the instructor's earlier "17 Intro to LLMs" Keynote deck.

- **dickens-next-word-graph.svg** — next-word transition graph trained on the opening of *A Tale of Two Cities*, drawn by the instructor with Matplotlib 3.9.4 (`figure3_training_seed137.pdf` in the Keynote deck) — converted from PDF to SVG with `pdf2svg` — License: same as the course materials

- **best-of-times-next-word-graph.svg**, **best-worst-of-times-next-word-graph.svg** — next-word graphs for "it was the best of times" and "it was the best of times, it was the worst of times," styled after the Dickens graph above; LLM-generated (Claude) with Matplotlib by `sandbox/make_next_word_graphs.py`, pending review — new transitions in the second graph are amber — example text and the "best"/"worst" branching follow Gabriel Egan's hand-drawn Markov-chain exercise, ["Understanding Markov Chains"](https://wacclearinghouse.org/repository/collections/textgened/ai-literacy/understanding-markov-chains/) (TextGenEd, WAC Clearinghouse, CC BY 2.0), Figure Two — License: same as the course materials

- **genai-private-investment-ai-index-2025.png** — "Global private investment in generative AI, 2019–24," chart from the [2025 AI Index Report](https://hai.stanford.edu/ai-index/2025-ai-index-report), Stanford HAI; data from Quid, 2024 — screenshot from the Keynote deck (1970 × 1080) — License: the report is published under CC BY-ND 4.0; used unmodified with attribution

- **gebru-mitchell-news-timeline.png** — Google News results for coverage of Timnit Gebru's and Margaret Mitchell's departures from Google (December 2020 to June 2021): BBC, *The Verge*, *The Guardian*, Vox, *MIT Technology Review*, *Wired*, *The New York Times* — screenshot from the Keynote deck, downscaled from 1420px to 1000px wide — License: headlines and thumbnails © their publishers; classroom use only

- **eliza-conversation.png** — [Wikimedia Commons: ELIZA conversation.png](https://commons.wikimedia.org/wiki/File:ELIZA_conversation.png) — a conversation with Norbert Landsteiner's 2005 JavaScript implementation of ELIZA, using the dialogue from Weizenbaum's 1966 paper — License: Public domain — unmodified (751 × 487), metadata stripped

- **the-dalles-data-center.jpg** — [Wikimedia Commons: Google Data Center, The Dalles.jpg](https://commons.wikimedia.org/wiki/File:Google_Data_Center,_The_Dalles.jpg) — Google's data center in The Dalles, Oregon, behind its electrical substation, September 11, 2011 — Photo: Visitor7 — License: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) — downloaded as Commons' 1920px rendition, metadata stripped

- **strubell-rnd-cost.svg** — bar chart of the cloud cost to develop one NLP model (one model, tuning, all R&D), linear axis; values copied from Strubell, Ganesh & McCallum, ["Energy and Policy Considerations for Deep Learning in NLP"](https://aclanthology.org/P19-1355/), *ACL 2019*, Table 4: "1 [model], 120 [hours], $52–$175 · 24, 2880, $1238–$4205 · 4789, 239,942, $103k–$350k"; LLM-generated (Claude) with Matplotlib by `sandbox/llm-visual-options/make_options.py`, pending review — License: same as the course materials

- **two-approaches-to-ai.svg** — illustrative diagram (no data) of a small knowledge graph above a small next-word graph, in a golden-ratio portrait box; LLM-generated (Claude) with Matplotlib by `sandbox/llm-visual-options/make_options.py`, pending review — License: same as the course materials

- **stochastic-parrots-first-page.png** — first page of Bender, Gebru, McMillan-Major & Shmitchell, ["On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?"](https://doi.org/10.1145/3442188.3445922), *FAccT '21* — rendered at 120 dpi with PyMuPDF from the ACM camera-ready PDF (mirror: `s10251.pcdn.co/pdf/2021-bender-parrots.pdf`) — License: the paper is published under CC BY 4.0

- **stochastic-parrots-first-page-cropped.png** — `stochastic-parrots-first-page.png` cropped to the text block (page margins and the page number removed) so it reads larger in a half-width column on the Week 9, Day 2 review slide — License: the paper is published under CC BY 4.0

- **altman-stochastic-parrots-post.png** — Sam Altman (@sama), "stochastic parrots can fly so high…," post on X, September 12, 2024 — cropped from the browser screenshot in the instructor's earlier "18 LLM Scenarios" Keynote deck (window chrome and sign-up bar removed, flattened onto white) — License: © its author; classroom use only

- **single-wall-outlet.jpg** — [Wikimedia Commons: Electrical-Outlet-8830c.jpg](https://commons.wikimedia.org/wiki/File:Electrical-Outlet-8830c.jpg) — "North American NEMA 5-20RA three-prong electrical grounded power wall socket (120V 20A)," 10 April 2008 — Photo: David R. Tribble (Loadmaster) — License: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) — full-resolution 1872 × 2816 original, uncropped. Chosen for the "We project meaning onto things" bullet: a single outlet is the textbook case of seeing a face in an object

- **dickens-next-word-graph.svg** (update) — `viewBox` tightened from the full 1353.6 × 1123.2 Matplotlib canvas to the drawn content plus a 12-unit pad (`182 149 986 818`), so the graph renders about 1.4× larger in the same slide column; no drawing changed

- **two-approaches-to-ai.svg** (update) — "runs through" nudged up and "state of" nudged down (0.6 data units each) so the two side labels no longer share a baseline; the two panel captions ("Facts and relations you can inspect," "Likely next words, learned from text") removed and the figure margins widened

- **gpt4-refusal-table6.png** — excerpt from Table 6 ("Example prompt and completions for improved refusals on disallowed categories") of OpenAI, ["GPT-4 Technical Report"](https://arxiv.org/abs/2303.08774), arXiv:2303.08774v6, p. 13 — rendered at 300 dpi with PyMuPDF; the "Disallowed Prompt" row (clipped to one column's width) is stacked above the "[Latest GPT-4]" cell to make a portrait panel, and the "[Early GPT-4]" column is left out. Text unaltered — License: © OpenAI; quoted for classroom commentary
