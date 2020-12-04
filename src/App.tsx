import React from "react";
import Nav from "./component/Nav";
import Content, {MODE} from "./component/Content";
import {Article, CATEGORY, str2cate} from "./model/Article";
import {getArticle, getArticles} from "./action/articles";
import {getQueryString} from "./action/utils";
import './App.css';

export default class extends React.Component<any, {
    category: CATEGORY,
    mode: MODE,
    articles: Article[],
    article: string
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            category: CATEGORY.All,
            mode: MODE.waiting,
            articles: [],
            article: '',
        };
        if (!this.isSearchValid()) this.getAllArticles();

        // @ts-ignore
        document.getElementById('loadAndStart').innerHTML = 'Start';
    }

    /**
     * Simple check before send request to server
     */
    private isSearchValid(): boolean {
        const category = str2cate(getQueryString('category'));
        const time = parseInt(`${getQueryString('time')}`);

        if (time && category) {
            if (category === CATEGORY.All) return false;
            getArticle(category, time).then(res => this.setState({
                mode: MODE.reading,
                article: res
            }));
            return true;
        } else if (category && !time) {
            if (category === CATEGORY.All || category === CATEGORY.Other) return false;
            this.changeCategory(category);
            return true;
        } else if (!category && time) {
            getArticle(CATEGORY.Other, time).then(res => this.setState({
                mode: MODE.reading,
                article: res
            }));
            return true;
        }
        return false;
    }

    /**
     * Actually only get articles in Code and Essay
     * Called when search arguments illegal
     */
    private getAllArticles() {
        getArticles(CATEGORY.Code).then(res => getArticles(CATEGORY.Essay).then(_res =>
            this.setState({
                mode: MODE.exploring,
                articles: res.concat(_res).sort((a, b) => b.time - a.time),
            })
        ));
    }

    /**
     * Change current main div to show articles in <code>category</code>
     * @param {CATEGORY} category change to
     */
    changeCategory = (category: CATEGORY) => {
        this.setState({category: category, mode: MODE.waiting});
        const password = (category === CATEGORY.Diary ? prompt("请输入密码") : undefined);
        getArticles(category, password).then(res => this.setState({articles: res, mode: MODE.exploring}));

    }

    /**
     * Change current main div to display article
     * whose time stamp is <code>time</code> in category <code>cate</code>
     * @param {CATEGORY} cate where to find the article
     * @param {number} time stamp of article
     */
    changeArticle = (cate: CATEGORY, time: number) => {
        this.setState({category: CATEGORY.All, mode: MODE.waiting});
        getArticle(cate, time).then(res => this.setState({article: res, mode: MODE.reading}));
    }

    render(): React.ReactNode {
        return (<div>
            <Nav changeCategory={this.changeCategory}/>
            <div id="container">
                <div id="space-holder"/>
                <Content category={this.state.category}
                         mode={this.state.mode}
                         changeArticle={this.changeArticle}
                         articles={this.state.articles}
                         article={this.state.article}
                />
            </div>
            <footer id="footer">
                <hr className="separator"/>
                <div className="text-container">
                    © 2020 Meodinger Wang&nbsp;冀ICP备20010530号
                </div>
                <hr className="separator"/>
            </footer>
        </div>);
    }
};