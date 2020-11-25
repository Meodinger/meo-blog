import {Article, CATEGORY} from '../model/Article';
import http from "http";
import querystring from 'querystring';

export async function getArticles(category: CATEGORY, password: null | undefined | string = 'default'): Promise<Article[]> {

    return new Promise(resolve => {
        const data = {
            category: category.toString(),
            password: password
        };
        const options = {
            hostname: window.location.hostname,
            port: 3002,
            path: '/getArticles?' + querystring.stringify(data),
            method: 'GET'
        };
        const req = http.request(options, (res => {
            res.setEncoding("utf-8");
            res.on('data', chunk => resolve(JSON.parse(chunk).articles));
        }));
        req.on('error', err => {
            resolve([{
                title: 'ERROR:' + err.name,
                abstract: err.message,
                time: 0,
                category: CATEGORY.All,
                tags: ['NO', 'TAG', 'HERE']
            }]);
        });
        req.end();
    });
}

export async function getArticle(cate: CATEGORY, time: number): Promise<string> {
    return new Promise(resolve => {
        const data = {
            category: cate,
            time: time
        };
        const options = {
            hostname: window.location.hostname,
            port: 3002,
            path: '/getArticle?' + querystring.stringify(data),
            method: 'GET'
        };
        const req = http.request(options, (res => res.on('data', chunk => resolve(chunk))));
        req.on('error', err => {
            resolve(`# ${err.name}: ${err.message}`);
        });
        req.end();
    });
}
