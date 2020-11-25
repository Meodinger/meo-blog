import React from "react";
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import MathJax from 'react-mathjax';
import {link, CodeBlock, inlineCode} from "./Renderers";
import './Style.css'

/**
 * @property props {source:string}
 */
export default class Markdown extends React.Component {
    render() {
        return (<MathJax.Provider input="tex">
            <ReactMarkdown
                className="markdown"
                source={this.props.source}
                escapeHtml={false}
                plugins={[
                    RemarkMathPlugin,
                ]}
                renderers={{
                    link: link,
                    code: CodeBlock,
                    inlineCode: inlineCode,
                    math: props => <MathJax.Node formula={props.value}/>,
                    inlineMath: props => <MathJax.Node inline formula={props.value}/>,
                }}
            />
        </MathJax.Provider>);
    }
}
