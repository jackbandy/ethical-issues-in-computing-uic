---
layout: exercise
title: 'Online Account Biopsy'
exercise_number: 2
summary: 'Request the trace data a platform holds about you, explore what is in it, and write a one-page reflection on the profile it builds.'
ai_policy: yellow-over-red
---

Big Tech companies [don't need to listen through your microphone to serve you creepy ads](https://www.eff.org/deeplinks/2018/04/facebook-doesnt-need-listen-through-your-microphone-serve-you-creepy-ads). Some ads make it seem like they are listening, but in reality, these companies are _simulating_ the kinds of conversations, purchases, and other behaviors you will carry out in the real world. These simulations are based on a digital profile made up of extensive online trace data -- digital "scraps" like locations, clicks, watch history, and more -- which are combined to create a [doll-like](https://futurism.com/the-byte/google-company-voodoo-doll-avatar) model of you.

Thanks to the General Data Protection Regulation (GDPR), and especially [Article 15](https://gdpr-info.eu/art-15-gdpr/), companies now provide various ways to access this trace data they hold about us. This is often an option buried in the privacy settings menu somewhere and titled "export my data," "data export request," "download my profile," or something like that.

*The purpose of this exercise is to retrieve and meditate on these data, guided by the metaphor of a "digital rag doll."*


## Part 1: Collect Personal Trace Data

First, retrieve some of the data these companies have about you. You can choose one of the options below, or another app you use that offers this feature.

**Note**: many companies take a few days to actually send you the data, so try to request the data a few days before you plan to make the doll.

| # | Platform | Download Your Data Guide |
| :-- | :-- | :-- |
| 1 | Google (including YouTube) | [How to download your Google data](https://support.google.com/accounts/answer/3024190?hl=en) |
| 2 | TikTok | [Requesting your data](https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data) |
| 3 | Instagram | [Review and export a copy of your Instagram information](https://help.instagram.com/181231772500920) |
| 4 | Facebook | [Export a copy of your Facebook information](https://www.facebook.com/help/212802592074644) |
| 5 | Apple | [Get a copy of the data associated with your Apple Account](https://support.apple.com/en-us/102208) |
| 6 | Snapchat | [How do I download my data from Snapchat?](https://help.snapchat.com/hc/en-us/articles/7012305371156-How-do-I-download-my-data-from-Snapchat) |
| 7 | Reddit | [How do I request a copy of my Reddit data and information?](https://support.reddithelp.com/hc/en-us/articles/360043048352-How-do-I-request-a-copy-of-my-Reddit-data-and-information) |
| 8 | X (Twitter) | [How to download your X archive](https://help.x.com/en/managing-your-account/how-to-download-your-x-archive) |
| 9 | LinkedIn | [Downloading your account data](https://www.linkedin.com/help/linkedin/answer/a1343196/downloading-your-account-data?lang=en) |


## Part 2: Review Trace Data

Spend some time reviewing the data. It should be fairly straightforward to bring it into a structured data analysis library (i.e. Pandas) if you were given a [CSV](https://pandas.pydata.org/docs/dev/reference/api/pandas.read_csv.html#) or [JSON](https://pandas.pydata.org/docs/dev/reference/api/pandas.read_json.html). Then, do some exploring!

The following are suggested starting points for exploration and reflection -- not requirements.

You might begin with some basic descriptive information from the dataset:
* How many total data points are available in the export?
* What time period was included in this export?
  * Check earliest date and latest date included
* How many days are in that time period, and how many of those days was I "active"?
  * What was my longest streak of consecutive active days? Consecutive non-active days?
* Does the export include the expected data, in terms of time period and activities?
  * If not, what is missing?
  * Is anything there that should not be there (e.g. deleted messages, removed likes)?
 
After you get a high-level view of the data, try to find some interesting lifetime statistics, such as:
* How many total TikToks have I watched?
* How many total posts have I liked on Instagram?
* Which accounts have I engaged with the most?
* Which topics or hashtags have I engaged with the most?
  * How do these align with my real interests?
* How many unique accounts have I engaged with? How many total engagements are captured?
* What information is available about follows/unfollows?
* How many comments have I posted?
* How many hours of YouTube videos have I watched?
* How has my activity changed over time?

Finally, in addition to these quantitative questions, consider the substance represented in the data, particularly in terms of your privacy. Guiding questions might include:
* If someone only had this data about a person, what would they infer about that person?
* Which advertisers might try to reach a person with this kind of data?
* How specific is this data -- how many others could fit the emerging "profile?"
* Which data represents me accurately? Inaccurately? Unsure?
* Does this data capture specific time periods with more or less accuracy?
* How much of this data would I feel comfortable sharing more broadly?
  * Which statistics seem "safe" to share publicly?
  * Which inferences/statistics would I want to keep private?


## Submission

Turn in a **1-page PDF reflection** through Canvas, which should include about 200-400 words, written in complete sentences. Make sure your reflection is grounded in the data you collected and analyzed. Charts and graphs are welcome but not required (if you do include them, your report can be more than 1 page).
