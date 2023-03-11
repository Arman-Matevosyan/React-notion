import $ from 'jquery';
import katex from 'katex';

const Prism = require('prismjs');

const slugify = require('slugify');

const pageId = '575d3ec590204c938adc349bef9cabc9';
const baseUrl = 'https://notion-api.splitbee.io/v1';

export function createTableFromTable(jsonData) {
  const newData = Object.values(jsonData).filter(
    (item) => item.value.type === 'table_row'
  );

  const container = $('#Pricing');
  const table = $('<table>');

  newData.forEach(function (key, index) {
    const row = key.value.properties;

    const [klpe] = row.kLPe || [null];

    const tableRow = $('<tr>');

    tableRow.addClass('table-row');
    tableRow.append($('<td>').text(klpe));

    Object.values(row).forEach(function ([value], index) {
      if (value !== klpe) {
        tableRow.append($('<td>').text(value));
      }
    });

    table.append(tableRow);
  });

  container.append(table);
}

export function createToggle(data) {
  const idsMapping = [];

  for (const [key, value] of Object.entries(data)) {
    if (
      value.value.properties?.title &&
      value.value.properties?.title[0][0]
        .toLowerCase()
        .includes('getting started')
    ) {
      for (let i = 0; i < value.value.content.length; i++) {
        idsMapping.push(value.value.content[i]);
      }
    }
  }
  const foundElements = [];

  idsMapping.forEach((id) => {
    const element = data[id];

    if (element) {
      foundElements.push(element);
    }
  });

  const parentSelector = $('#Getting-Started');
  const arrowDiv = $('<div>');
  const arrowSpan = $('<span>');
  const newDiv = $('<div>');

  arrowDiv.css({
    cursor: 'pointer',
    position: 'absolute',
    height: '40px',
    'margin-left': '-15px',
  });

  newDiv.addClass('getting-started-content');
  newDiv.css({
    display: 'none',
    width: '1000px',
  });

  foundElements.forEach(function (item) {
    if (item.value.properties.language) {
      // If the properties include a language, render a <pre> tag with <code> inside
      const codeTitle = item.value.properties.title[0];
      const codeLanguage = item.value.properties.language[0][0];
      const codePre = $('<pre>');
      const codeBlock = $('<code>');

      codeBlock.text(codeTitle);
      codeBlock.addClass(`language-${codeLanguage}`);
      codeBlock.addClass('notion-code');

      codePre.addClass('notion-code');
      codePre.addClass(`language-${codeLanguage}`);
      codeBlock.css({
        'font-size': '0.5em',
      });

      codePre.append(codeBlock[0]);
      newDiv.append(codePre);
      Prism.highlightAll();
    } else {
      // Otherwise, just render the title in a <div>
      const title = item.value.properties.title[0][0];

      const titleContainer = $(`<p>${title}</p>`);

      titleContainer.css({
        'white-space': 'pre-wrap',
        'caret-color': 'rgb(55, 53, 47)',
        padding: '3px 2px',
        'font-size': '16px',
        color: ' rgb(55, 53, 47)',
        'font-weight': 'normal',
      });

      newDiv.append(titleContainer);
    }
  });

  arrowDiv.append(arrowSpan);
  arrowSpan.css({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    'border-top': '2px solid #000',
    'border-right': '2px solid #000',
    transform: 'rotate(45deg)',
    transition: 'transform 0.3s ease-in-out',
    'margin-left': '0px',
    'margin-bottom': '5px',
  });

  arrowDiv.click(function () {
    newDiv.toggle();
    if (arrowSpan.hasClass('rotated')) {
      arrowSpan.removeClass('rotated');
      arrowSpan.css({
        transform: 'rotate(45deg)',
      });
    } else {
      arrowSpan.addClass('rotated');
      arrowSpan.css({
        transform: 'rotate(135deg)',
      });
    }
  });

  parentSelector.prepend(arrowDiv);
  parentSelector.append(newDiv);
}

export function mathEquation(data) {
  const filteredData = Object.values(data).filter(
    (item) => item.value.type === 'equation'
  );

  const div = $('<div>');
  const mathSpan = $(`<p>`);

  div.addClass('equation-class');
  mathSpan.css({
    color: 'black',
    display: 'block',
    margin: '1em 0',
    'text-align': 'center',
    'font-size': '21px',
  });

  const mathEquation = filteredData[0].value.properties.title[0][0];

  katex.render(mathEquation, mathSpan[0]);
  div.append(mathSpan[0]);

  const container = $('#Pricing');

  div.css({
    display: 'flex',
    'justify-content': 'center',
  });

  container.prepend(div);
}
export function createTableOfContents(parentSelector = '') {
  let element;
  let title;
  let link;
  let newLine = ''; // initialize to empty string
  let allLines = '';

  const titleSelectors = `${parentSelector}-h1, ${parentSelector}-h2, ${parentSelector}-h3`;

  $(titleSelectors).each(function () {
    element = $(this);
    if (!element || !element.text || !element.text()) {
      return;
    }
    title = element.text();

    link = element.attr('id');
    if (!link) {
      link = slugify(title, 50);
      element.attr('id', link);
    }
    if (!link) {
      return;
    }

    link = `${window.location.pathname}${window.location.search}#${link}`;

    let indentStyle = '';

    if (element[0].localName === 'h1') {
      indentStyle = `font-size: larger`;
    } else {
      const indentAmount = element[0].localName === 'h2' ? '3%' : '5%';

      indentStyle = `margin-left: ${indentAmount}`;
    }

    newLine = `<li style="${indentStyle}"><a href="${link}">${title}</a></li>`;
    allLines += newLine;
  });

  let tableOfContents =
    "<nav role='navigation' class='table-of-contents'>" + '<ul>';

  // Only show the table of contents if there are headings in the document.
  if (allLines) {
    // use allLines instead of newLine to check if there are headings
    tableOfContents += allLines;
    tableOfContents += '</ul>' + '</nav>';
    if (parentSelector) {
      $(parentSelector).prepend(tableOfContents);
    }
  }

  return tableOfContents;
}

export const fetchPageBlockFromNotion = async () => {
  const res = await fetch(`${baseUrl}/page/${pageId}`);

  const data = res.json();

  return data;
};
