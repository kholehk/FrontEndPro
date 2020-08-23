"use strict";

function clicCalc () {

    const wrapper = document.querySelector('#wrapper');
    const tagsCalc = {};
    const contentCalc = {};
    let contentKey;

    for (let elem of wrapper.children) {
        tagsCalc[elem.tagName] = (tagsCalc[elem.tagName] || 0) + 1;
        contentKey = Number.isNaN(+elem.innerHTML)?'text' :'number';
        contentCalc[contentKey] = (contentCalc[contentKey] || 0) + 1;
    }

    let strResult = '<ul>';

    for (let key in tagsCalc) {
        strResult += `<li>${key}: ${tagsCalc[key]};</li>`;
    }

    strResult += '</ul><ul>';
    
    for (let key in contentCalc) {
        strResult += `<li>${key}: ${contentCalc[key]};</li>`;
    }

    strResult += '</ul>';
    strResult += `<b>amount</b>: ${wrapper.children.length}`;

    document.querySelector('#result').innerHTML = strResult;
}

document.querySelector('button[type="button"]')
        .addEventListener('click', clicCalc);
