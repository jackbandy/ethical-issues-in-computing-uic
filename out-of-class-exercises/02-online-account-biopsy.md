# Online Account Biopsy

Big Tech companies [don't need to listen through your microphone to serve you creepy ads](https://www.eff.org/deeplinks/2018/04/facebook-doesnt-need-listen-through-your-microphone-serve-you-creepy-ads). Some ads make it seem like they are listening, but in reality, these companies are _simulating_ the kinds of conversations, purchases, and other behaviors you will carry out in the real world. These simulations are based on a digital profile made up of extensive online trace data: digital "scraps" like locations, clicks, watch history, and more. These scraps are combined to create a [doll-like](https://futurism.com/the-byte/google-company-voodoo-doll-avatar) model of you.

Thanks to the General Data Protection Regulation (GDPR), and especially [Article 15](https://gdpr-info.eu/art-15-gdpr/), companies now provide various ways to access some of the digital sraps and trace data held about us. This is usually buried in the privacy settings, under a name like "export my data," "data export request," or "download my profile."

*The purpose of this exercise is to retrieve and meditate on these data, guided by the metaphor of a "digital scrap doll."*


## Part 1: Collect Personal Trace Data

First, request some of the data these companies have about you. Choose one of the platforms below, or another app you use that offers this feature.

**Note**: many companies take a few days to actually send you the data, so request it a few days before you plan to do Part 2.

Exports vary a lot in what they contain. Platforms built on watching, listening, and/or scrolling (TikTok, YouTube, Spotify, Instagram) usually return the richest behavioral history, so they give you the most to work with in Part 2.

| Platform | Download Your Data Guide |
| :-- | :-- |
| Google | [Google Takeout](https://support.google.com/accounts/answer/3024190?hl=en) |
| TikTok | [TikTok Help: Requesting Your Data](https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data) |
| Instagram | [Review and Export a Copy of Your Instagram Information](https://help.instagram.com/181231772500920) |
| YouTube | [Your Data in YouTube](https://support.google.com/youtube/answer/9315727?hl=en) |
| Facebook | [Export a Copy of Your Facebook Information](https://www.facebook.com/help/212802592074644) |
| Apple | [Get a Copy of the Data Associated with Your Apple Account](https://support.apple.com/en-us/102208) |
| Snapchat | [Snapchat: How to Download My Data](https://help.snapchat.com/hc/en-us/articles/7012305371156-How-do-I-download-my-data-from-Snapchat) |
| Reddit | [Reddit Data Request](https://support.reddithelp.com/hc/en-us/articles/360043048352-How-do-I-request-a-copy-of-my-Reddit-data-and-information) |
| X (Twitter) | [How to Download Your X Archive](https://help.x.com/en/managing-your-account/how-to-download-your-x-archive) |
| LinkedIn | [LinkedIn Data Download](https://www.linkedin.com/help/linkedin/answer/a1343196/downloading-your-account-data?lang=en) |
| Discord | [Requesting a Copy of Your Data](https://support.discord.com/hc/en-us/articles/360004027692-Requesting-a-Copy-of-your-Data) |
| Spotify | [Data Rights and Privacy Choices](https://support.spotify.com/us/article/data-rights-and-privacy-settings/) |
| Twitch | [Twitch Privacy Choices](https://legal.twitch.com/en/legal/privacy-choices/) |
| Netflix | [What Personal Information Netflix Holds About You](https://help.netflix.com/en/node/100624) |
| Amazon | [Request Your Personal Information](https://www.amazon.com/gp/help/customer/display.html?nodeId=TP1zlemejtTn6pwYKS) |
| Strava | [How Do I Export My Strava Data?](https://support.strava.com/en-us/articles/15401919-how-do-i-export-my-strava-data) |


## Part 2: Review Trace Data

Spend some time reviewing the data. If your exported includes [CSV](https://pandas.pydata.org/docs/dev/reference/api/pandas.read_csv.html#) or [JSON](https://pandas.pydata.org/docs/dev/reference/api/pandas.read_json.html) files, they can easily load directly into a data analysis library like Pandas. Then, you can do some exploring!

The following are suggested starting points.

**Get oriented in the dataset:**
* How many total data points are in the export, and what time period do they cover?
* How many days are in that period, and how many of those days were you "active"? What was your longest streak of consecutive active days? Consecutive non-active days?
* Is anything missing that you expected? Is anything there that should not be (e.g. deleted messages, removed likes)?

**Calculate some lifetime statistics:**
* How many total items have you watched, liked, posted, or commented on?
* Which accounts, topics, or hashtags have you engaged with most? How well do those match your real interests?
* How many unique accounts have you engaged with? What is recorded about follows and unfollows?
* How has your activity changed over time?

**Consider what the data reveal about you:**
* If someone had only this data about a person, what would they infer? Which advertisers would try to reach them?
* How specific is this profile? How many other people could fit it?
* Which data represent you accurately? Inaccurately? Are some time periods captured better than others?
* Which statistics seem "safe" to share publicly, and which inferences would you want to keep private?


## AI/LLM Policy

**Signal: yellow over red**: "proceed with caution on main route, prepared to stop." See the [FAQ](https://doethics.fun/faq.html) and the [syllabus](https://doethics.fun/syllabus/) for more background.

🟡 AI/LLM-based tools are allowed (but not required) for **analyzing the data** in Part 2. For example, you might use it to write and/or debug analysis code.

I advise agaiinst pasting or uploading your full data export anywhere. Instead, try to develop and run code locally so that your data stays only on your machine. For example, an LLM might generate some code, but make sure your machine is the one that actually runs the code. If take your data export from Google, for example, and upload it to ChatGPT, you just gave OpenAI a free, extensive digital profile with your digital scrap data.

🔴 AI/LLM-based tools are **not** allowed for writing the reflection.

If you do use a tool for the analysis, cite it in your report, at a minimum:
> I used [tool and version] to [what you asked it to do].


## Submission

Submit a **1-page PDF reflection** in Canvas: about 200-400 words, in complete sentences, grounded in the data you analyzed. Charts and graphs are welcome but not required (if you include them, your report can run longer than 1 page).

You will build on these observations in the next exercise: the [Online Account Scrap Doll](./03-online-account-rag-doll.md).
