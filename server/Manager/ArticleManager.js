const {CATEGORY} = require('../Constants');
const {verifyTimeStamp} = require('../Utils/Utils');
const {articleErr} = require('../Utils/Article');

const {
    readdirSync,
    statSync,
    readFileSync
} = require('fs')

class Article {

    /**
     *
     * @param {number} time
     * @param {string} title
     * @param {string} category
     * @param {string} abstract
     * @param {string[]} tags
     */
    constructor(time, title, category, abstract, tags) {
        this.time = time;
        this.title = title;
        this.category = category;
        this.abstract = abstract;
        this.tags = tags;
    }

    toString() {
        return JSON.stringify({
            time: this.time,
            title: this.title,
            category: this.category,
            abstract: this.abstract,
            tags: this.tags
        });
    }
}


exports.default = class ArticleManager {

    /**
     * Article Array's Array, ues `articles[CATEGORY]` to get Article Array
     * @type {{title: string, abstract: string, category: string, time: number, tags: string[]}[][]}
     */

    constructor() {

        this.articles = [];
        this.articlesInfo = [];
        for (const category in CATEGORY) this.articlesInfo[category] = [];

        for (const category in CATEGORY) {
            const files = readdirSync(`../post/${category}`, {encoding: "utf-8"});
            if (files) this.refreshArticlesInfo(files, category);
        }

    }

    /**
     * Get Article by its category and time stamp
     * @param {string} cate Article category
     * @param {number} time Article time stamp (ms)
     * @return {string}
     */
    getArticle(cate, time) {
        if (verifyTimeStamp(time, 0)) return `# You should know this card is an error message to you`;

        for (const article of this.articles) {
            if (verifyTimeStamp(time, article.time) && cate === article.category) {
                let data;
                try {
                    data = readFileSync(`../post/${article.category}/${article.title}.md`);
                } catch (e) {
                    this.articles.slice(this.articles.indexOf(article), 1);
                    return articleErr('Article Deleted');
                }
                data = data.toString();
                if (data.length > 0) {
                    const data_ = data.split('---@@@---');
                    if (data_[1])
                        return data_[1];
                    else
                        return articleErr('Article Format Error')
                } else
                    return articleErr('Article File Is Empty');
            }
        }
        return articleErr(this.articles ? `Time Stamp '${time}' Invalid` : 'Server Article List Cache Cleared, Please Re-get Article List');
    }

    /**
     * Get infos of articles of {files} in {cate}
     * @param {string[]} files in `../post/{cate}/`
     * @param {string} cate where files get
     */
    refreshArticlesInfo(files, cate) {
        outer:for (const file of files) {
            const time = statSync(`../post/${cate}/${file}`).birthtimeMs;
            for (const articleTime of this.articlesInfo[cate]) {
                if (articleTime === time) {
                    continue outer;
                }
            }

            const title = file.slice(0, -3);
            let abstract = '';
            const category = cate;
            let tags = [];
            let data = readFileSync(`../post/${cate}/${file}`);
            if (data) {
                data = data.toString();
                const brief = data.indexOf('\n') !== -1 ? data.split('\n', 3) : data.split('\r', 3);
                if (brief.length >= 2) {
                    abstract = brief[0];
                    tags = brief[1].split('#');
                } else {
                    data = false;
                }
            }
            if (!data) {
                abstract = 'Get Article Brief Info failed';
                tags = ['NO', 'TAG', 'HERE'];
            }
            const article = new Article(time, title, category, abstract, tags);
            this.articles.push(article);
            this.articlesInfo[article.category].push(article.time);

            process.stdout.write(`Title: ${article.title}\n - Cate: ${article.category}\n - Time: ${article.time}\n`);
        }
        this.articles.sort((a, b) => b.time - a.time);
        this.articlesInfo.sort((a, b) => b - a);
    }

    /**
     * Get infos of articles in {cate}
     * @param {string} cate where files get
     * @return {string} a json style string with only an `articles` key
     */
    getArticlesInfo(cate) {
        let result = [], next = 0;

        for (let i = 0; i < this.articlesInfo[cate].length; i++) {
            for (let j = next; j < this.articles.length; j++) {
                if (this.articles[j].time === this.articlesInfo[cate][i]) {
                    result.push(this.articles[j]);
                    next = j + 1;
                }
            }
        }

        return `{"articles": ${JSON.stringify(result)}}`;
    }
}