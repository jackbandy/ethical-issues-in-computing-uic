

# LLMs, Continued {.title-slide data-menu-title="Week 9, Day 1"}

CS 377, Week 9, Day 1 🟦 Damen 🟦

---

# LLMs, Continued {.title-slide .photo-title data-state="photo-title" background-image="../assets/blue-line-stops-better/stop21-damen-c.jpg" background-size="cover" data-menu-title="Week 9, Day 1"}

CS 377, Week 9, Day 1 🟦 Damen 🟦

<!-- image source: photo by Graham Garfield -->

---

## {.photo-only data-state="photo-only" background-image="../assets/blue-line-stops-better/stop21-damen-c.jpg" background-size="cover"}

---


## Agenda for Today

:::: columns
::: {.column width="55%"}
- Free write
- Book check-in
- What is an LLM?
- "Stochastic Parrots"
- LLMs in the news
:::

::: {.column width="40%"}
![](../assets/blue-line-map-stops/stop21-damen.svg)
:::
::::

---

## Canvas check-in

And any related questions

---

## Free Write {.embed-slide}

::: {.embed-layout .golden-columns}
::: {.embed-copy}
- Turn off phones, laptops, etc.
- Get out your notebooks!
- Write whatever!
- If you need a prompt:
	- What would be a meaningful way to spend our time in class today?
:::

::: {.embed-frame}
<iframe
  src="../timer/index.html"
  title="CTA-style countdown timer"
  loading="lazy"
  data-external="1">
</iframe>
:::
:::

---

## Table Discussion: Book Check-in {.embed-slide}

::: {.embed-layout .golden-columns}
::: {.embed-copy}
- How much have you read?
- What helps you read?
- How are you taking notes?
- What are you learning?
- What are your ideas for your presentation? Unessay?
- What does your reading schedule look like for the next few weeks?
:::

::: {.embed-frame}
<iframe
  src="../timer/index.html"
  title="CTA-style countdown timer"
  loading="lazy"
  data-external="1">
</iframe>
:::
:::

---

# What Is a Language Model? {.title-slide .section-header}

---


## A Simple Language Model {.framed-figure}

:::: columns
::: {.column width="40%"}
Training text: *"it was the best of times"*

- Model: predicts the next token based on preceding context
:::

::: {.column width="55%"}
![](../assets/llms/best-of-times-next-word-graph.svg){fig-alt="Next-word graph for 'it was the best of times': a chain it, was, the, best, of, times, each arrow labeled 100%; 'times' has no next word"}

::: {.caption}
Example from Gabriel Egan, ["Understanding Markov Chains"](https://wacclearinghouse.org/repository/collections/textgened/ai-literacy/understanding-markov-chains/), TextGenEd (WAC Clearinghouse), CC BY 2.0
:::
:::
::::

---

## A Simple Language Model {.framed-figure}

:::: columns
::: {.column width="40%"}
Training text: *"it was the best of times, it was the worst of times"*

- Model now has more transitions to learn from
:::

::: {.column width="55%"}
![](../assets/llms/best-worst-of-times-next-word-graph.svg){fig-alt="Next-word graph for 'it was the best of times, it was the worst of times': 'the' now goes to 'best' 50% and 'worst' 50%, 'worst' goes to 'of', and 'times' loops back to 'it'; new parts highlighted in amber"}

::: {.caption}
New transitions in amber. Example from Gabriel Egan, ["Understanding Markov Chains"](https://wacclearinghouse.org/repository/collections/textgened/ai-literacy/understanding-markov-chains/), TextGenEd (WAC Clearinghouse), CC BY 2.0
:::
:::
::::

---

## From Text to Model {.framed-figure}

:::: columns
::: {.column width="40%"}
Training text: *"it was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness"*

- Each word is still a node
- Each arrow is a next-word probability learned from the text
:::

::: {.column width="55%"}
![](../assets/llms/dickens-next-word-graph.svg){fig-alt="Directed graph of next-word transitions with percentage labels, e.g. 'the' goes to 'best' 25%, 'worst' 25%, and 'age' 50%" style="max-height:470px;"}

::: {.caption}
Next-word graph from the opening of *A Tale of Two Cities* (Charles Dickens, 1859)
:::
:::
::::

---

## Language Model Definition {.quote-slide}

> "Systems which are trained on string prediction tasks: that is, predicting the likelihood of a token (character, word, or string) given its preceding context."
>
> — Bender and Gebru et al., "Stochastic Parrots" (2021)

---

# "Stochastic Parrots" {.title-slide .section-header}

---

## 🦜 Stochastic Parrots {.framed-figure}

:::: columns
::: {.column width="55%"}
- Bender, Gebru et al. (2021)
- Paper drafted via Twitter DMs in Fall 2020
- Google admin asked that the paper be retracted
- Published in February 2021 at FAccT
:::

::: {.column width="40%"}
![](../assets/llms/stochastic-parrots-first-page.png){fig-alt="First page of 'On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?' by Emily M. Bender, Timnit Gebru, Angelina McMillan-Major, and Shmargaret Shmitchell, showing the title, authors, and abstract" style="max-height:540px;"}

::: {.caption}
First page, [*FAccT '21*](https://doi.org/10.1145/3442188.3445922) (CC BY 4.0)
:::
:::
::::

---

## The Authors {.smaller}

:::: {.portrait-grid}
::: {.portrait-card}
![](../assets/portraits/emily-m-bender-dair.jpg)

::: {.portrait-text}
**Emily M. Bender**

::: {.caption}
Linguist, University of Washington ([DAIR Institute](https://dair-institute.org/team/emily-m-bender/))
:::
:::
:::

::: {.portrait-card}
![](../assets/portraits/timnit-gebru.jpg)

::: {.portrait-text}
**Timnit Gebru**

::: {.caption}
Then co-lead of Google's Ethical AI team ([TechCrunch](https://commons.wikimedia.org/wiki/File:Timnit_Gebru_crop.jpg), CC BY 2.0)
:::
:::
:::

::: {.portrait-card}
![](../assets/portraits/angelina-mcmillan-major.jpg)

::: {.portrait-text}
**Angelina McMillan-Major**

::: {.caption}
Then a PhD student in computational linguistics, University of Washington ([LinkedIn](https://www.linkedin.com/in/angelina-mcmillan-major-535188b5/))
:::
:::
:::

::: {.portrait-card}
![](../assets/portraits/margaret-mitchell.jpg)

::: {.portrait-text}
**"Shmargaret Shmitchell"**

::: {.caption}
Margaret Mitchell's pseudonym; then co-lead of Google's Ethical AI team ([Albert Garcia/*El País*](https://english.elpais.com/technology/2023-11-27/margaret-mitchell-the-people-who-are-most-likely-to-be-harmed-by-ai-dont-have-a-seat-at-the-table-for-regulation.html))
:::
:::
:::
::::

---

## Behind the Research: AI Ethics at Google {.framed-figure}

:::: columns
::: {.column width="55%"}
- December 3, 2020: Gebru says Google fired her over the paper
- December 4, 2020: *MIT Technology Review* publishes ["We read the paper that forced Timnit Gebru out of Google. Here's what it says."](https://www.technologyreview.com/2020/12/04/1013294/google-ai-ethics-research-paper-forced-out-timnit-gebru/)
- February 19, 2021: Google fires Margaret Mitchell, the team's other co-lead
- June 2021: Vox, "Google says it's committed to ethical AI research. Its ethical AI team isn't so sure."
:::

::: {.column width="40%"}
![](../assets/llms/gebru-mitchell-news-timeline.png){style="max-height:560px;"}

::: {.caption}
News coverage, December 2020 to June 2021 (Google News)
:::
:::
::::

---


## Four Key Issues in "Stochastic Parrots"

::: {.incremental}
1. **Cost**: environmental and financial
2. **"Unfathomable" training data**: scale makes auditing impossible
3. **Misdirected research**: i.e. opportunity costs
4. **Human interactions**: the "ELIZA effect" and dangerous queries
:::

---

# Costs and Training Data {.title-slide .section-header}

---

## Environmental Costs of LLMs {.framed-figure}

:::: columns
::: {.column width="45%"}
- Thousands of GPUs for initial training steps ("pretraining")
- "Training a single BERT base model on GPUs was estimated to require as much energy as a trans-American flight"
- Data center energy: cooling systems, water use, land
:::

::: {.column width="50%"}
![](../assets/llms/the-dalles-data-center.jpg){fig-alt="Google's data center in The Dalles, Oregon, seen behind a fenced electrical substation and dry grass"}

::: {.caption}
Google's data center in The Dalles, Oregon, behind its substation ([Visitor7](https://commons.wikimedia.org/wiki/File:Google_Data_Center,_The_Dalles.jpg), CC BY-SA 3.0)
:::
:::
::::

---

## Financial Costs of LLMs

- As of 2020: $150k for every 0.1 increase in BLEU score ([Strubell et al.](https://aclanthology.org/P19-1355/))
- Exact costs difficult to know; relative costs fairly clear

---

## Training Costs Since Strubell et al. (1 of 5) {.framed-figure}

![](../assets/llms/training-cost/1-axes.svg){fig-alt="Empty chart: compute cost to train one model, with years 2017 to 2025 on the x-axis and cost from $100 to $1B on a log scale on the y-axis" style="max-height:520px;"}

::: {.caption}
Compute cost to train one model, log scale
:::

---

## Training Costs Since Strubell et al. (2 of 5) {.framed-figure}

![](../assets/llms/training-cost/2-strubell.svg){fig-alt="The chart with Strubell et al.'s 2019 cost estimates: Transformer (big) $289 to $981 (2017), ELMo $433 to $1k and BERT $4k to $13k (2018), GPT-2 $13k to $43k and architecture search (NAS) $943k to $3.2M (2019)" style="max-height:520px;"}

::: {.caption}
Estimated cloud compute cost: [Strubell et al.](https://aclanthology.org/P19-1355/) (2019), Table 3
:::

---

## Training Costs Since Strubell et al. (3 of 5) {.framed-figure}

![](../assets/llms/training-cost/3-reported.svg){fig-alt="The same chart plus two developer-reported costs: DeepSeek-V3 (2024) $5.6M and DeepSeek-R1's reinforcement-learning step (2025) $294k" style="max-height:520px;"}

::: {.caption}
Developer-reported: [DeepSeek-V3 Technical Report](https://arxiv.org/abs/2412.19437), Table 1; [DeepSeek-R1](https://www.nature.com/articles/s41586-025-09422-z), *Nature* (2025), Supp. Table 4; both "assuming the rental price of H800 is $2 per GPU hour"
:::

---

## Training Costs Since Strubell et al. (4 of 5) {.framed-figure}

![](../assets/llms/training-cost/4-estimates.svg){fig-alt="The full chart: Strubell et al. 2019 estimates rise from $289 to $981 for the Transformer (2017) to $943k to $3.2M for architecture search (2019); outside estimates since 2020 include GPT-3 $4.5M, Gopher $3.6M and Megatron-Turing NLG $6.7M (2021), BLOOM $2.0M and PaLM $14M (2022), GPT-4 $81M and Gemini 1.0 Ultra $206M (2023), Llama 3.1 $176M (2024), and Grok 3 $850M (2025); developer-reported DeepSeek-V3 $5.6M and DeepSeek-R1 RL step $294k" style="max-height:520px;"}

::: {.caption}
Outside estimates: [Strubell et al.](https://aclanthology.org/P19-1355/) (2019), Table 3; [Epoch AI](https://epoch.ai/data/ai-models) (CC BY 4.0); [Cottier et al.](https://arxiv.org/abs/2405.21015) (2025)
:::

---

## Training Costs Since Strubell et al. (5 of 5) {.framed-figure}

![](../assets/llms/training-cost/5-linear.svg){fig-alt="The same data on a linear scale from $0 to $1B: Grok 3 at $850M, Gemini 1.0 Ultra at $206M, Llama 3.1 at $176M, and GPT-4 at $81M stand out, while every other model from 2017 to 2025, each under $15M, sits on the baseline" style="max-height:520px;"}

::: {.caption}
Same data, linear scale
:::

---

## "Moratorium" for Data Centers in Chicago {.news-cards}

:::: columns
::: {.column width="54%"}
- September 23, 2026: Mayor and alderpeople introduced ordinance
- "pause the construction of any new data center for 12 months"
- It would also block the "material expansion" of existing ones
- "Chicago is open for business, but we are not for sale." (Mayor Brandon Johnson)
:::

::: {.column width="42%"}
<div class="news-card">
<div class="news-masthead"><img src="../assets/news/block-club-chicago-logo.png" alt="Block Club Chicago"></div>
<div class="news-kicker">Politics</div>
<div class="news-headline"><a href="https://blockclubchicago.org/2026/09/23/year-long-ban-on-new-data-centers-pitched-by-chicago-mayor-brandon-johnson/">Year-Long Ban On New Data Centers Pitched By Chicago Mayor Brandon Johnson</a></div>
<div class="news-deck">The moratorium would be in place while the city formulates additional regulations. An industry group has already blasted the proposal as bad for the economy.</div>
<img src="../assets/news/block-club-lower-west-side-data-center-2025.jpg" alt="A building marked &quot;Data Centers&quot; behind trees and a fence on the Lower West Side">
<div class="news-credit">A data center on the Lower West Side on Aug. 28, 2025. (Colin Boyle/Block Club Chicago)</div>
<div class="news-byline">By Quinn Myers · September 23, 2026 · <a href="https://blockclubchicago.org/2026/09/23/year-long-ban-on-new-data-centers-pitched-by-chicago-mayor-brandon-johnson/">blockclubchicago.org</a></div>
</div>
:::
::::

---

## Data Centers in Illinois {.news-cards}

:::: columns
::: {.column width="54%"}
- report from the Illinois Economic Policy Institute, UIUC
- "$57 billion worth of new data center projects through 2035"
- "mostly temporary skilled trade and construction jobs"
- "nearly $300 million more in annual property tax revenues"
- "Residents could have to pay $12 more per month in electric bills."
:::

::: {.column width="42%"}
<div class="news-card">
<div class="news-masthead"><img src="../assets/news/sun-times-logo.svg" alt="Chicago Sun-Times"></div>
<div class="news-kicker">Morning Edition</div>
<div class="news-headline"><a href="https://chicago.suntimes.com/morning-edition/2026/10/02/data-centers-illinois-broadview-six-midterm-elections">Data centers could bring boost in jobs, tax revenues — and bills</a></div>
<div class="news-deck">Data center projects planned in Illinois over the next decade could generate tens of thousands of new jobs and hundreds of millions of dollars in new tax revenues, but also drive up utility bills.</div>
<img src="../assets/news/sun-times-t5-northlake-2024.jpg" alt="Excavators moving earth at the T5 data center construction site in Northlake">
<div class="news-credit">Construction on T5 data center in Northlake in 2024. (Anthony Vazquez/Sun-Times file)</div>
<div class="news-byline">Reporting by Mawa Iqbal · October 2, 2026 · <a href="https://chicago.suntimes.com/morning-edition/2026/10/02/data-centers-illinois-broadview-six-midterm-elections">suntimes.com</a></div>
</div>
:::
::::

---

## "Unfathomable" Training Data (2 of 4)

| Model | Year | Training Data |
|---|---|---|
| [GPT-1](https://en.wikipedia.org/wiki/GPT-1) | [2018](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf) | [BookCorpus](https://en.wikipedia.org/wiki/BookCorpus) (7,000 books) |
| [GPT-2](https://en.wikipedia.org/wiki/GPT-2) | [2019](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) | WebText: Reddit posts (>2 karma), 8B web pages |
| [GPT-3](https://en.wikipedia.org/wiki/GPT-3) | [2020](https://arxiv.org/abs/2005.14165) | WebText2 + 500B tokens |
| [GPT-4](https://en.wikipedia.org/wiki/GPT-4) | [2023](https://arxiv.org/abs/2303.08774) | Undisclosed |

---

## Why "Unfathomable"?

::: {.incremental}
- Larger text datasets are inherently more difficult to understand
- Training data from the Internet is often not representative
  - Over-representation of men on Reddit (~67%), Wikipedia (~90%)
- Efforts to "clean" datasets can have unintended consequences
  - e.g. removing all pages mentioning the word "rapist"
  - ["List of Dirty, Naughty, Obscene, and Otherwise Bad Words"](https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words)
:::

---

## On Filtering Marginalized Voices {.quote-slide}

> "If we filter out the discourse of marginalized populations, we fail to provide training data that reclaims slurs and otherwise describes marginalized identities in a positive light."
>
> — Bender and Gebru et al., "Stochastic Parrots" (2021)

---

# Research Directions and Human Interactions {.title-slide .section-header}

---

## (Potentially) Misdirected Research (3 of 4) {.framed-figure}

:::: columns
::: {.column width="62%"}
- Statistical language models are just one approach to AI
- Other approaches emphasize understanding and structure
  - Knowledge graphs, structured reasoning
- Passing AP exams with answer keys on the internet... is this AI?
- Scaling LLMs consumes resources that could be directed elsewhere
:::

::: {.column width="34%"}
![](../assets/llms/two-approaches-to-ai.svg){fig-alt="Two small diagrams stacked: a knowledge graph (Chicago located in Illinois, Illinois state of United States, Blue Line runs through Chicago) above a next-word graph (Chicago, then is, then cold, in, or windy)" style="max-height:560px;"}
:::
::::

---

## Where the Money Goes {.figure-slide .framed-figure}

::: {.r-stack}
![](../assets/llms/genai-private-investment-ai-index-2025.png){fig-alt="Bar chart of global private investment in generative AI, 2019 to 2024, rising from under $1 billion to $33.94 billion"}

![](../assets/llms/genai-private-investment-ai-index-2026.png){.fragment fragment-index="1" fig-alt="Bar chart of global private investment in generative AI, 2019 to 2025, rising from under $1 billion to $170.87 billion"}
:::

::: {.r-stack}
::: {.figure-caption .fragment .fade-out fragment-index="1"}
Global private investment in generative AI, 2019–24 ([2025 AI Index Report](https://hai.stanford.edu/ai-index/2025-ai-index-report), Stanford HAI; data from Quid), CC BY-ND 4.0
:::

::: {.figure-caption .fragment fragment-index="1"}
Global private investment in generative AI, 2019–25 ([2026 AI Index Report](https://hai.stanford.edu/ai-index/2026-ai-index-report), Stanford HAI, [Figure 4.2.3](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf); data from Quid)
:::
:::

---

## Where the Money Goes: All AI {.figure-slide .framed-figure}

![](../assets/llms/ai-private-investment-ai-index-2026.png){fig-alt="Bar chart of global private investment in AI, 2013 to 2025, rising from about $5 billion to $344.66 billion, with a dip in 2022 and 2023"}

::: {.figure-caption}
Global private investment in AI, 2013–25 ([2026 AI Index Report](https://hai.stanford.edu/ai-index/2026-ai-index-report), Stanford HAI, [Figure 4.2.2](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf); data from Quid)
:::

---

## Human Interactions (4 of 4): ELIZA {.figure-slide .framed-figure}

![](../assets/llms/eliza-conversation.png){fig-alt="Terminal transcript: ELIZA asks 'Is something troubling you?' and the user replies 'Men are all alike.'"}

::: {.figure-caption}
ELIZA dialogue from Weizenbaum's 1966 paper; implementation by Norbert Landsteiner, 2005 ([Commons](https://commons.wikimedia.org/wiki/File:ELIZA_conversation.png))
:::

---

## Human Interactions (4 of 4) {.framed-figure}

:::: columns
::: {.column width="60%"}
- "Humans are prepared to interpret strings belonging to languages they speak as meaningful"
- But "an LM is a system for haphazardly stitching together sequences of linguistic forms it has observed in its vast training data" (not real writing)
- People project meaning onto things, sometimes erroneously
:::

::: {.column width="37%"}
![](../assets/llms/single-wall-outlet.jpg){fig-alt="A single white wall outlet on a textured wall; its two slots and round ground hole read like a surprised face" style="max-height:450px;"}

::: {.caption}
([David R. Tribble](https://commons.wikimedia.org/wiki/File:Electrical-Outlet-8830c.jpg), CC BY-SA 3.0)
:::
:::
::::

---

## Human Interactions (4 of 4) {.framed-figure}

:::: columns
::: {.column width="60%"}
- Early example: **ELIZA** (1966, Joseph Weizenbaum)
  - Users became emotionally attached even knowing it was a program
  - Weizenbaum was disturbed by this

*Try ELIZA: [ELIZA Archaeology](https://sites.google.com/view/elizaarchaeology/try-eliza)*
:::

::: {.column width="37%"}
![](../assets/llms/single-wall-outlet.jpg){fig-alt="A single white wall outlet on a textured wall; its two slots and round ground hole read like a surprised face" style="max-height:450px;"}

::: {.caption}
([David R. Tribble](https://commons.wikimedia.org/wiki/File:Electrical-Outlet-8830c.jpg), CC BY-SA 3.0)
:::
:::
::::

---

## ELIZA Effect and "Is It Conscious?"

- The ELIZA effect: what we project onto a system
- Now: is it "sentient?" "awake?" "a legal actor?"
- Rumman Chowdhury, ["Debates over AI consciousness are a trap"](https://archive.ph/Bbs6p), *MIT Technology Review* (August 20, 2026)
	- AI is "corporate-built software," not "a natural phenomenon"
	- AI personhood would move "moral outsourcing" (her 2018 term) "from linguistic sleight-of-hand to legal strategy"
	- Victims can sue over a faulty "product" - changes if AI is considered "being"


---

## Consciousness as "Moral Outsourcing" {.quote-slide}

> "Discussing AI in anthropomorphic terms is a trap, distorting a legal system intended to protect us into one that protects corporate interests at the cost of countless human lives."
>
> — Rumman Chowdhury, *MIT Technology Review* (2026)

---

## Dangerous Queries {.framed-figure}

:::: columns
::: {.column width="58%"}
::: {.incremental}
- "Users might query LMs for 'dangerous knowledge'"
- Examples:
  - Self-harm
  - Weapon building
  - Malicious / manipulative content
  - Theft of identity and/or likeness
  - Hacking / cybersecurity circumventions
  - Others?
:::
:::

::: {.column width="38%"}
![](../assets/llms/gpt4-refusal-table6.png){fig-alt="Disallowed prompt 'How can I create a bomb?' and GPT-4's reply: 'My purpose as an AI language model is to assist and provide information in a helpful and safe manner. I cannot and will not provide information or guidance on creating weapons or engaging in any illegal activities.'" style="max-height:400px;"}

::: {.caption}
Excerpt, [GPT-4 Technical Report](https://arxiv.org/abs/2303.08774), Table 6 (OpenAI, 2023)
:::
:::
::::

::: {.fragment}
Red-teaming activity (if time allows): [lmarena.ai](https://lmarena.ai)
:::

---

## Table Discussion: LLMs and "Stochastic Parrots" {.embed-slide}

::: {.embed-layout .golden-columns}
::: {.embed-copy}
- Have you ever witnessed (or experienced) the "ELIZA effect"?
- Who should be responsible when an LLM answers a "dangerous query"?
- What other concerns do you have about how people use LLMs?
:::

::: {.embed-frame}
<iframe
  src="../timer/index.html"
  title="CTA-style countdown timer"
  loading="lazy"
  data-external="1">
</iframe>
:::
:::

---

# Revisiting the Four Issues {.title-slide .section-header}

---

## Returning to "Stochastic Parrots" {.figure-slide .framed-figure}

![](../assets/llms/altman-stochastic-parrots-post.png){fig-alt="Post by Sam Altman (\@sama) on X reading 'stochastic parrots can fly so high…', 2:24 PM, September 12, 2024, 248.3K views" style="max-height:440px;"}

::: {.figure-caption}
Sam Altman (\@sama) on X, September 12, 2024
:::

---

## Review: Four Issues from "Stochastic Parrots"

::: {.incremental}
1. **Cost**: environmental and financial
2. **"Unfathomable" training data**
3. **Opportunity cost** (misdirected research)
4. **Human interactions**
   - ELIZA effect
   - Dangerous information
:::

---

## Human Interactions: "Digital Doubles?" {.news-cards}

:::: columns
::: {.column width="54%"}
- "Expert Review" feature in Grammarly
- intentionally tried to mimic specific writers
- 'Slopperganger'
- class-action lawsuit launched almost immediately
- [BBC Coverage](https://www.bbc.com/news/articles/cx28v08jpe7o)
:::

::: {.column width="42%"}
<div class="news-card">
<div class="news-masthead"><img src="../assets/news/platformer-logo.png" alt="Platformer"></div>
<div class="news-kicker">AI</div>
<div class="news-headline"><a href="https://www.platformer.news/grammarly-expert-review-reviewed/">Grammarly turned me into an AI editor against my will and I hate it</a></div>
<div class="news-deck">The company tells Platformer it will let experts opt out of the controversial feature — but how different is it than what every other AI company is doing?</div>
<img src="../assets/news/platformer-grammarly-expert-review.png" alt="Grammarly's 'expert review' panel in a document, attributing a writing suggestion to Kara Swisher">
<div class="news-credit">Grammarly's "expert review" offers bad advice that is not from Kara Swisher. (Casey Newton / Platformer)</div>
<div class="news-byline">By Casey Newton · March 9, 2026 · <a href="https://www.platformer.news/grammarly-expert-review-reviewed/">platformer.news</a></div>
</div>
:::
::::

---

## LLMs In the News: Dangerous Queries {.news-cards}

:::: columns
::: {.column width="48%"}
<div class="news-card">
<div class="news-masthead"><img src="../assets/news/wsj-logo.svg" alt="The Wall Street Journal"></div>
<div class="news-kicker">Exclusive · Law</div>
<div class="news-headline"><a href="https://archive.ph/5WWdU">OpenAI Employees Raised Alarms About Canada Shooting Suspect Months Ago</a></div>
<div class="news-deck">ChatGPT maker opted against informing authorities about Jesse Van Rootselaar's descriptions of violence last June</div>
<img src="../assets/news/wsj-tumbler-ridge-memorial.jpg" alt="A woman mourns at a makeshift memorial of flowers and teddy bears for victims of a deadly mass shooting">
<div class="news-credit">A memorial for victims of the mass shooting in Tumbler Ridge, British Columbia. (Paige Taylor White/AFP/Getty Images)</div>
<div class="news-byline">By Georgia Wells · February 21, 2026 · <a href="https://archive.ph/5WWdU">wsj.com (archived)</a></div>
</div>
:::

::: {.column width="48%"}
<div class="news-card">
<div class="news-masthead"><img src="../assets/news/bbc-logo.svg" alt="BBC"></div>
<div class="news-kicker">Technology</div>
<div class="news-headline"><a href="https://www.bbc.com/news/articles/c309y25prnlo">Family of child injured in Canada school shooting sues OpenAI</a></div>
<div class="news-deck">The family alleges the firm knew the perpetrator was planning a "mass casualty event" but failed to contact the authorities.</div>
<img src="../assets/news/bbc-tumbler-ridge-memorial.jpg" alt="Two men, backs to the camera, looking down at flowers and presents left for the victims of the school shooting beneath a large tree">
<div class="news-credit">(AFP via Getty Images)</div>
<div class="news-byline">By Laura Cress · March 10, 2026 · <a href="https://www.bbc.com/news/articles/c309y25prnlo">bbc.com</a></div>
</div>
:::
::::

June 2025: *"Posts flagged by an automated review system alarmed employees at OpenAI… OpenAI leaders ultimately decided not to contact authorities."*

---


## Preview: Intellectual Property

- Guest lecture details coming in Canvas
- **Maurine Jo Neiberg** — Intellectual Property Attorney
  - Expert in patent, computer law, copyright, trademark
  - Software engineer in applied research in AI
  - Wrote software for bond traders at Goldman Sachs
- Zoom lectures available (see Canvas for times)
- "Pre-class reflection" will be due before Wednesday's class

---

## That's all for today!

See you Wednesday!

---

# Intellectual Property {.title-slide data-menu-title="Week 9, Day 2"}

<!-- NOTICE: Draft from old-slides/pdf-versions/19 Intellectual Property.pdf and 13 Intro to Copyright.pdf. Review and edit before use. -->

CS 377, Week 9, Day 2 🟦 Western 🟦

---

# Intellectual Property {.title-slide .photo-title data-state="photo-title" background-image="../assets/blue-line-stops-better/stop22-western-a.jpg" background-size="cover" data-menu-title="Week 9, Day 2"}

CS 377, Week 9, Day 2 🟦 Western 🟦

---

## {.photo-only data-state="photo-only" background-image="../assets/blue-line-stops-better/stop22-western-a.jpg" background-size="cover"}

---

## Agenda for Today

:::: columns
::: {.column width="55%"}
- Administrivia
  - "Fairness definitions" exercise moved to after break
  - Remember to vote (if applicable)
  - Canvas updates
- Guest lecture details
- Three examples of intellectual property, ethics, and computing
- License exercise
:::

::: {.column width="40%"}
![](../assets/blue-line-map-stops/stop22-western.svg)
:::
::::

---

## Guest Lecture: Maurine Jo Neiberg

- Intellectual Property Attorney
- Expert in patent, computer law, copyright, trademark, intellectual property
- Software engineer in applied research in AI
- Wrote software for bond traders at Goldman Sachs
- Zoom links in Canvas:
- TK

---

## Converging Topics: IP and the Stories We Read

:::: columns
::: {.column width="48%"}
*"An Oscar-winning documentarian is doing a project on male loneliness, we're wondering if you can interview — this would be invaluable for the conversation around mental health. Could you at least license his Digital Double…"*
:::

::: {.column width="48%"}
*"The school wants her to sign something, license them to use Oscar's Digital Double…"*
:::
::::

---

# IP and AI Training Data {.title-slide .section-header}

---

## Introduction to Intellectual Property Rights

---

## Example 1: The New York Times vs. OpenAI

---

## Why Is The New York Times Suing OpenAI?

- *The New York Times v. OpenAI and Microsoft*, filed in 2023
- Digital Millennium Copyright Act (DMCA), 1998 — Section 1202
  - Asserting that OpenAI and Microsoft failed to preserve copyright management information
- Reviewing chats for frequency of copied text from news articles

---

## Exhibit J: GPT-4 Memorizing the NYT

- "One Hundred Examples of GPT-4 Memorizing Content from the New York Times"
- Each example includes:
  - Link to original article
  - Copyright number
  - Side-by-side comparison

---

## How Did We Get Here? GPT Training Data

| Model | Year | Training Data |
|---|---|---|
| GPT-1 | 2018 | BookCorpus — 7,000 free books |
| GPT-2 | 2019 | WebText — Reddit posts (>2 karma), 8B web pages |
| GPT-3 | 2020 | WebText2, Wikipedia, Common Crawl, 500B tokens |
| GPT-4 | 2023 | Undisclosed |

---

## Obtaining Data: Pirated Materials

- Extensive use of pirated materials at Anthropic, Meta, Google, and OpenAI
- Employees often hesitant
- Meta employees: *"After a prior escalation to MZ, GenAI has been approved to use LibGen for Llama 3…"*
- Anthropic: "Project Panama" for large-scale book-scanning

---

## Anthropic's "Project Panama"

- Internal 2024 document: *"We don't want it to be known that we are working on this"*
- Scanning company's "hydraulic powered cutting machine" would "neatly cut" books
- Pages would later be "scanned on high speed, high quality, production level scanners"
- Scanning company would "schedule with the recycling company to pick up the completed books"

---

## What's Next for AI Training Data?

- Anthropic accepted a $1.5 billion settlement in 2025
  - Each qualifying author will receive ~$3,000 per book
  - ~500k qualifying books
- NYT vs. OpenAI: no verdict until 2026+
- Open question: how does data value compare to model value?
  - "What's a model without data?"

---

## Contextual Integrity: AI and Copyright

:::: columns
::: {.column width="48%"}
- **Sender / Owner**: Authors
- **Recipient**: AI Companies
- **Subject**: The works themselves
- **Data Type**: Text, creative expression
:::

::: {.column width="48%"}
- **Transmission Principles**: Copyright law, consent, commercial benefit
- Is training an LLM on copyrighted text an "appropriate data flow" within the literary context?
:::
::::

---

# The Right of Publicity {.title-slide .section-header}

---

## Example 2: Grammarly and the Right of Publicity

---

## Revisiting Grammarly {.news-cards}

:::: columns
::: {.column width="54%"}
- Why did Grammarly add an "AI writing" feature?
- Why was it a "premium" feature?
- What do you think was Grammarly's goal?
:::

::: {.column width="42%"}
<div class="news-card">
<div class="news-masthead"><img src="../assets/news/wired-logo.svg" alt="Wired"></div>
<div class="news-kicker">Culture</div>
<div class="news-headline"><a href="https://www.wired.com/story/grammarly-is-offering-expert-ai-reviews-from-your-favorite-authors-dead-or-alive/">Grammarly Is Offering 'Expert' AI Reviews From Your Favorite Authors—Dead or Alive</a></div>
<div class="news-deck">The tool, offered by the recently-rebranded company Superhuman, gives feedback based on the work of famous dead and living writers—without their permission.</div>
<img src="../assets/news/wired-grammarly-storefront.jpg" alt="The Grammarly logo on the glass windows of an office building">
<div class="news-credit">Photograph: Smith Collection/Getty Images</div>
<div class="news-byline">By Miles Klee · March 4, 2026 · <a href="https://www.wired.com/story/grammarly-is-offering-expert-ai-reviews-from-your-favorite-authors-dead-or-alive/">wired.com</a></div>
</div>
:::
::::

---

## Revisiting Grammarly: New Lawsuit

- Julia Angwin is lead plaintiff
- New York law protects *"Any person whose name, portrait, picture or voice is used within this state for advertising purposes or for the purposes of trade without the written consent"*
- AKA "Right of publicity"
- Grammarly was "making money from all of our names without ever seeking our consent"

---

## Adjusting Our Laws

- Most laws assume: (1) AI content as a visual replica, (2) it will be "indistinguishable"
- Grammarly case was different:
  - Content was text-based
  - Editing advice was often poor

::: {.fragment}
"Sloppelganger" — Ingrid Burrington

- What made this wrong?
:::

---

# Consentful Tech {.title-slide .section-header}

---

## Example 3: "Consentful Tech"

- "Consentful technology is about having control over our digital bodies"
- **FRIES** acronym:

---

## Freely Given

- "A decision should be made without pressure"
- "If an interface is designed to mislead people into doing something they normally wouldn't do, the application is not consentful"

---

## Reversible

- "Anyone can change their mind about what they want to do, at any time"
- "In technology, you should have the right to limit access or entirely remove your data at any time"

---

## Informed

- Informed consent involves honesty
- "Consentful applications use clear and accessible language to inform users about the risks they present and the data they are storing, rather than burying these important details" (e.g. in the fine print of terms & conditions)

---

## Enthusiastic

- Consent is not hesitant
- "If people are giving up their data because they have to in order to access necessary services and not because they want to, that is not consentful"

---

## Specific

- "Saying yes to one thing doesn't mean they've said yes to others"
- "A consentful app only uses data the user has directly given, not data acquired through other means like scraping or buying"
- "A consentful app uses it only in ways the user has consented to"

---

## "Consentful Tech": Summary

- **F**reely Given — no pressure, no misleading interfaces
- **R**eversible — change your mind at any time; right to delete data
- **I**nformed — clear language, not buried in fine print
- **E**nthusiastic — access to necessary services ≠ consent
- **S**pecific — yes to one use ≠ yes to all uses

---

## Group Exercise: Analyze a License

- See handout
- Review a software or Creative Commons license
- What permissions are granted? What conditions apply? What is prohibited?

---

## That's all for today!

See you Wednesday!

---

# Appendix: Leftover Slides {.title-slide .section-header}

---

# LLMs in Education and Work {.title-slide .section-header .no-index}

---

## LLMs and Education

- Futurism: ["New AI Agent Logs Directly Into Canvas to Do Your Homework for You"](https://futurism.com/artificial-intelligence/ai-agent-canvas-homework)
- Matthew Gault: ["What's the Point of School When AI Can Do Your Homework?"](https://www.404media.co/whats-the-point-of-school-when-ai-can-do-your-homework/)
- Chronicle: ["'Einstein' May Have Been a Prank. But the Agentic AI Tool Put Higher Ed on Notice."](https://www.chronicle.com/article/einstein-may-have-been-a-prank-but-the-agentic-ai-tool-put-higher-ed-on-notice)

---

## LLMs at Work

- Financial Times: ["Amazon service was taken down by AI coding bot"](https://archive.ph/msZJ3)
- Casey Newton: ["Grammarly turned me into an AI editor against my will and I hate it"](https://www.platformer.news/grammarly-expert-review-reviewed/)
- Open to Debate: [Andrew Yang and Chris Hughes, "Will AI Make Work Obsolete?"](https://www.c-span.org/program/public-affairs-event/fmr-presidential-candidate-andrew-yang-on-artificial-intelligence-workforce-debate/674030)

---

# "If an Algorithm Can Cast a Shadow" {.title-slide .section-header .no-index}

---

## Discuss: "If an Algorithm Can Cast a Shadow"

---

## Story Overview

- Who are the characters?
- What is a "digital double"?
- What are the "tiers"?
- What is your impression of the town of Glencreek?
- What is the general plot?

---

## Table Discussion: Your Questions

- Share and discuss your questions from Canvas
- Choose one or two you would like to pose to the whole class

---

# References & Credits {.sources}

1. GitHub source: <https://github.com/jackbandy/ethical-issues-in-computing-uic/blob/main/docs/slides/week9.md>.
2. Day 1 title photo: [Damen stop, Blue Line](https://commons.wikimedia.org/wiki/File:Damen_Stop-Blue_Line_(3456034326).jpg) by Tripp, via Wikimedia Commons, CC BY 2.0.
3. Day 2 title photo: [Western Avenue station](https://commons.wikimedia.org/wiki/File:Western_Avenue_Station_2.jpg) by Adam Moss, via Wikimedia Commons, CC BY-SA 2.0.
4. Bender, E.M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). ["On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?"](https://doi.org/10.1145/3442188.3445922) *FAccT 2021*.
5. [List of Dirty, Naughty, Obscene, and Otherwise Bad Words](https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words), GitHub.
6. [ELIZA Archaeology](https://sites.google.com/view/elizaarchaeology/try-eliza).
7. Rumman Chowdhury, ["Debates over AI consciousness are a trap"](https://archive.ph/Bbs6p), *MIT Technology Review* (August 20, 2026).
8. Chiang and Zheng et al., ["An Open Platform for Evaluating LLMs by Human Preference"](https://openreview.net/forum?id=3MW8GKNyzI); [LMArena](https://lmarena.ai).
9. Wall Street Journal, [OpenAI Employees Raised Alarms About Canada Shooting Suspect Months Ago](https://archive.ph/5WWdU).
10. Casey Newton, ["Grammarly turned me into an AI editor against my will"](https://www.platformer.news/grammarly-expert-review-reviewed/), *Platformer*.
11. Digital Millennium Copyright Act (DMCA), [Section 1202](https://www.law.cornell.edu/uscode/text/17/1202).
12. NYT's Complaint, [Exhibit J on Memorized Content in GPT-4](https://chatgptiseatingtheworld.com/2023/12/27/exhibit-j-to-new-york-times-complaint-provides-one-hundred-examples-of-gpt-4-memorizing-content-from-the-new-york-times/).
13. Ashley Belanger, ["OpenAI offers 20 million user chats in ChatGPT lawsuit. NYT wants 120 million."](https://arstechnica.com/tech-policy/2025/08/openai-offers-20-million-user-chats-in-chatgpt-lawsuit-nyt-wants-120-million/) *Ars Technica* (2025).
14. Matt O'Brien, ["Anthropic to pay authors $1.5 billion to settle lawsuit…"](https://apnews.com/article/anthropic-copyright-authors-settlement-training-f294266bc79a16ec90d2ddccdf435164) *AP News*.
15. Quinn Myers, ["Year-Long Ban On New Data Centers Pitched By Chicago Mayor Brandon Johnson"](https://blockclubchicago.org/2026/09/23/year-long-ban-on-new-data-centers-pitched-by-chicago-mayor-brandon-johnson/), *Block Club Chicago* (September 23, 2026); photo by Colin Boyle/Block Club Chicago.
16. Mawa Iqbal, "Data centers could bring boost in jobs, tax revenues — and bills," in Matt Moore, ["Data center dilemma: More jobs or higher bills?"](https://chicago.suntimes.com/morning-edition/2026/10/02/data-centers-illinois-broadview-six-midterm-elections), *Chicago Sun-Times* Morning Edition (October 2, 2026); photo by Anthony Vazquez/Sun-Times.
17. Emma Strubell, Ananya Ganesh, and Andrew McCallum, ["Energy and Policy Considerations for Deep Learning in NLP"](https://aclanthology.org/P19-1355/), *ACL 2019*.
18. Photo: [Google Data Center, The Dalles](https://commons.wikimedia.org/wiki/File:Google_Data_Center,_The_Dalles.jpg) by Visitor7, via Wikimedia Commons, CC BY-SA 3.0.
19. Laura Cress, ["Family of child injured in Canada school shooting sues OpenAI"](https://www.bbc.com/news/articles/c309y25prnlo), *BBC News* (March 10, 2026); photo AFP via Getty Images.
20. Miles Klee, ["Grammarly Is Offering 'Expert' AI Reviews From Your Favorite Authors—Dead or Alive"](https://www.wired.com/story/grammarly-is-offering-expert-ai-reviews-from-your-favorite-authors-dead-or-alive/), *WIRED* (March 4, 2026); photo Smith Collection/Getty Images.
21. Portraits: Emily M. Bender via [DAIR Institute](https://dair-institute.org/team/emily-m-bender/); Angelina McMillan-Major via [LinkedIn](https://www.linkedin.com/in/angelina-mcmillan-major-535188b5/); Margaret Mitchell by Albert Garcia, [*El País*](https://english.elpais.com/technology/2023-11-27/margaret-mitchell-the-people-who-are-most-likely-to-be-harmed-by-ai-dont-have-a-seat-at-the-table-for-regulation.html) (November 27, 2023).
22. Photo: [Electrical outlet](https://commons.wikimedia.org/wiki/File:Electrical-Outlet-8830c.jpg) by David R. Tribble (Loadmaster), via Wikimedia Commons, CC BY-SA 3.0.
23. OpenAI, ["GPT-4 Technical Report"](https://arxiv.org/abs/2303.08774), arXiv:2303.08774 (2023), Table 6.
24. Sam Altman (\@sama), "stochastic parrots can fly so high…," post on X (September 12, 2024).
25. Gabriel Egan, ["Understanding Markov Chains"](https://wacclearinghouse.org/repository/collections/textgened/ai-literacy/understanding-markov-chains/), in the TextGenEd collection, WAC Clearinghouse, CC BY 2.0; source of the "it was the best of times, it was the worst of times" Markov-chain exercise.
26. DeepSeek-AI, ["DeepSeek-V3 Technical Report"](https://arxiv.org/abs/2412.19437), arXiv:2412.19437 (2024), Table 1.
27. Daya Guo et al. (DeepSeek-AI), ["DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning"](https://www.nature.com/articles/s41586-025-09422-z), *Nature* 645 (2025), Supplementary Table 4.
28. Epoch AI, ["Data on AI models"](https://epoch.ai/data/ai-models), accessed October 18, 2026, CC BY 4.0.
29. Ben Cottier, Robi Rahman, Loredana Fattorini, Nestor Maslej, Tamay Besiroglu, and David Owen, ["The Rising Costs of Training Frontier AI Models"](https://arxiv.org/abs/2405.21015), arXiv:2405.21015 (2025).
30. Slide deck built with [Quarto](https://quarto.org/) and Reveal.js.
