# Simple React Blog
> A really really simple blog


## Install

```bash
git clone https://github.com/Meodinger/meo-blog.git
cd meo-blog
npm install
cd server
npm install
npm start
cd ..
npm run-script start
```
> That's so long

You should type a password for Diary posts during first start.<br/>
If you want to change the password, replace the field `password`
in `server/config,json` with `-null-` or simply delete the file

## How to Use

Write post in this style
```
abstract //In one line
tag1#tag2#tag3
---@@@---
# some markdown content
```
and throw your posts in `post` by category.

There are four categories: `Code`, `Diary`, `Essay` and `Other`.
Category `Code` and `Essay` can be accessed by everyone through the website.
Category `Diary` requires password to explore, or through Server API to get a specific article without password
(I don't think anyone can guess out an article's time stamp).
Articles in Category `Other` can only be accessed through Server API. 

You can get articles' `Title - Time Stamp` pair in server console.
Then use `<yourhost>/?category=<Category>&time=<TimeStamp>` (order doesn't matter) to directly access an article.
And use `<yourhost>/?time=<TimeStamp>` to directly access an article in category `Other`.
(Url `<yourhost>/?category=Other&time=<TimeStamp>` also available). 
`<yourhost>/?category=<Category>` will display the specific page of `Category`.

If `Category` is invalid, will display all articles (same as open the website and don't press any nav buttons)

If `TimeStamp` is invalid, will display an error message.

## Server API

server listens on port 3002<br/>

|method|argument_1|argument_2|return|
|---|---|---|---|
|/getArticles?|category="Code" &verbar; "Diary" &verbar; "Essay"|password?: string|{"articles": Article[]}|
|/getArticle?|category="Code" &verbar; "Diary" &verbar; "Essay" &verbar; "Other"|time: number|article: string|
|other|any|any|{"err": {"name": string, "message": string}}|

`access denied` and `argument invalid` also return in its method style 

For example: `/getArticles?category=Error`

Get: `{"articles":[{"title": "Denied", "abstract": "category invalid", "category": "Error", "time": 0, "tags": ["NO","TAG","HERE"]}]}`



## License

[GPL](http://www.opensource.org/licenses/gpl-2.0.php)
