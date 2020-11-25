const {verifyTimeStamp, md5_2} = require('./Util/Utils');
const {articleErr, articlesErr, articlesDenied} = require('./Util/Article');
const {ConfigManager, ArticleManager} = require('./Manager');
const {CATEGORY} = require('./Constants');

const http = require('http');
const url = require('url');
const {readdir} = require('fs');


const articleManager = new ArticleManager();
const configMgr = new ConfigManager();


// Main server
http.createServer((req, res) => {
    const {pathname: method, query} = url.parse(req.url, true);

    res.setHeader("Access-Control-Allow-Origin", "*");
    switch (method) {
        case "/getArticles": {
            const {category, password} = query;
            if (!category || CATEGORY[category] === undefined || category === CATEGORY.Other) {
                res.write(articlesDenied(category, `Category '${category}' Invalid`));
                res.end();
            } else {
                if ((category === CATEGORY.Diary && password && md5_2(password) === configMgr.get('password')) || category !== CATEGORY.Diary) {
                    readdir(`../post/${category}`, {encoding: "utf8"}, (err, files) => {
                        if (err) {
                            res.write(articlesErr(err, category));
                        } else if (files.length > 0) {
                            res.write(articleManager.getArticlesInfo(category));
                        } else {
                            res.write(articlesErr({
                                name: `No Articles in ${category}`,
                                message: 'There are no articles in this category'
                            }, category));
                        }
                        res.end();
                        articleManager.refreshArticlesInfo(files, category);
                    });
                } else {
                    res.write(articlesDenied(category, 'Password Invalid'));
                    res.end();
                }
            }
            break;
        }
        case "/getArticle": {
            const {category, time} = query;
            const isTimeStampValid = verifyTimeStamp(parseInt(time), time);
            const isCategoryValid = CATEGORY[category] !== undefined;
            if (category === CATEGORY.Other) { // Refresh Other Category
                articleManager.getArticlesInfo(CATEGORY.Other);
            }
            if (!isTimeStampValid) res.write(articleErr(`Time Stamp '${time}' Invalid\n`));
            if (!isCategoryValid) res.write(articleErr(`Category '${category}' Invalid\n`));
            if (isTimeStampValid && isCategoryValid) res.write(articleManager.getArticle(category, time));
            res.end();
            break;
        }
        default: {
            res.write(`{"err": {"name": "NoSuchMethodError", "message": "You are using an invalid method"}}`);
            res.end();
            break;
        }
    }
}).listen(3002);
