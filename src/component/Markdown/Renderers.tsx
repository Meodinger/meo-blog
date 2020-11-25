import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/esm/styles/hljs";
import './Style.css';

export const link = (props: { href: string, target: string, rel: string, children: string }) =>
    <a href={props.href} target={props.target || "_blank"} rel={props.rel || "noreferrer noopener"}>{props.children}</a>

export const CodeBlock = (props: { value: string, language: string }) =>
    <figure className="highlight">
        <SyntaxHighlighter language={props.language} style={darcula} showLineNumbers={true}>
            {props.value}
        </SyntaxHighlighter>
    </figure>

export const inlineCode = (props: { value: string }) =>
    <span className="inlineCode">{props.value}</span>

