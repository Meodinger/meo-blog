import React from "react";
import '../styles/Nav.css'
import {CATEGORY} from "../model/Article";

const openAside = () => {
    // @ts-ignore
    document.getElementById("aside").style.display = 'block';
    // @ts-ignore
    document.getElementById('container').style.backgroundColor = 'darkgrey';
    // @ts-ignore
    document.getElementById('footer').style.backgroundColor = 'darkgrey';
}

export default function Nav(props: {
    changeCategory: (cate: CATEGORY) => void;
}) {
    return (<nav className="Nav-bar" id="nav">
            <p className="Side-button" onClick={openAside}>≡</p>
            <p className="Link Nav-button" onClick={() => props.changeCategory(CATEGORY.Code)} title="Code">Code</p>
            <p className="Link Nav-button" onClick={() => props.changeCategory(CATEGORY.Diary)} title="Diary">Diary</p>
            <p className="Link Nav-button" onClick={() => props.changeCategory(CATEGORY.Essay)} title="Essay">Essay</p>
    </nav>);
}
