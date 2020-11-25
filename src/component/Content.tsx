import React from "react";
import '../styles/Content.css'
import {Article, CATEGORY} from "../model/Article";
import Markdown from "./Markdown"
import {stamp2date} from "../action/utils";

/**
 * An enum to distinguish which state the main div in
 */
export enum MODE {
    exploring,
    reading,
    waiting,
}

/**
 * Function component whose props contains the info of the article it refers to
 * and a function to show the article in main div
 * @param props
 * @constructor
 */
function ArticleCard(props: { article: Article, showArticle: (cate: CATEGORY, time: number) => void }) {
    const time = stamp2date(props.article.time);
    return (<div className="Article-card">
        <span className="title" onClick={() => props.showArticle(props.article.category, props.article.time)}>
            {props.article.title}
        </span>
        <hr className="dashed"/>
        <span className="abstract"><em className="em">Abstract </em>{props.article.abstract}</span>
        <span className="info">{time} - {props.article.category} - {props.article.tags.join('#')}</span>
    </div>);
}

export default class Content extends React.Component<{
    category: CATEGORY;
    mode: MODE;
    articles: Article[];
    article: string;
    getArticle: (cate: CATEGORY, time: number) => void;
}> {

    /**
     * @See ../App.tsx::changeArticle
     */
    showArticle = (cate: CATEGORY, time: number) => this.setState({article: this.props.getArticle(cate, time)});

    render(): React.ReactNode {
        if (this.props.mode === MODE.exploring)
            return (<main id="main">
                {this.props.articles.map((prop: Article) => (
                    <ArticleCard
                        article={prop}
                        showArticle={this.showArticle}
                        key={prop.time}
                    />))}
            </main>);
        else if (this.props.mode === MODE.reading) {
            return (<main id="main">
                <Markdown source={this.props.article}/>
            </main>);
        } else if (this.props.mode === MODE.waiting)
            return (<main id="main">
                Please wait...
            </main>);
        else
            return (<main id="main" style={{fontSize: '40px', textAlign: 'center'}}>How You Get Here?</main>);
    }
}
