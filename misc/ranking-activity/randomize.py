import pandas as pd
df=pd.read_csv('uic-subreddit-feb-2026.csv')

fdf = df[df['score'] > 1]
#fdf = fdf[fdf.NSFW==False]
fdf = fdf[['title','submission_flair','text']]
fdf['text'] = fdf['text'].fillna('').apply(lambda x: ' '.join(x.split()[:20]) + '...' if len(x.split()) > 20 else x)


fdf=fdf.sample(50)

fdf.to_csv('uic-subreddit-50-rando-sp26.csv',index=False)

