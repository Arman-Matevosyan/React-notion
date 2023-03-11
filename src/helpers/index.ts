/* eslint-disable max-lines */
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-this */
import { BlockMapType } from 'react-notion';
import $ from 'jquery';
import katex from 'katex';
import slugify from 'slugify';
import Prism from 'prismjs';
import { typeMapping } from '../constants';

/**
Renders a table from Notion page data.
@param data - A map of block objects representing the database.
@param containerSelector - A CSS selector for the container element where the math equation block will be appended to.
*/
export function createTableFromPageData(
  data: BlockMapType,
  containerSelector: string
) {
  const rows = Object.values(data).filter(
    (item) => item.value.type === typeMapping.TABLEROW
  );

  const table = $('<table>').appendTo(containerSelector);

  table.css({
    'margin-top': '20px',
    'font-size': '16px',
    'border-collapse': 'collapse',
    width: '50%',
    'table-layout': 'fixed',
  });

  rows.forEach(function (row, index) {
    const cells = row.value.properties;

    const [klpe] = cells.kLPe || [null];

    const tableRow = $('<tr>').addClass('table-row');

    if (index === 0) {
      tableRow.css({
        'background-color': '#edf3ec',
      });
    }

    tableRow.append($('<td>').text(klpe));

    Object.values(cells).forEach(function (cellValue) {
      if (cellValue[0] !== klpe) {
        tableRow.append($('<td>').text(cellValue));
      }
    });

    table.append(tableRow);
  });

  table.find('td').css({
    width: '25%',
    'vertical-align': 'middle',
    padding: '10px',
    'text-align': 'left',
    border: '1px solid black',
  });
}

/**
 * Renders a math equation block from a Notion database.
 *
 * @param data - A map of block objects representing the database.
 * @param containerSelector - A CSS selector for the container element where the math equation block will be appended to.
 */
export function createToggle(data: BlockMapType, containerSelector: string) {
  const foundElements = Object.values(data)
    .filter((item) => {
      const title = item.value.properties?.title?.[0]?.[0]?.toLowerCase();

      return title && title.includes('getting started');
    })
    .flatMap((item) => item.value.content.map((id) => data[id]))
    .filter(Boolean);

  const parentSelector = $(containerSelector);

  const arrowDiv = $('<div>').css({
    cursor: 'pointer',
    position: 'absolute',
    height: '40px',
    'margin-left': '-15px',
  });

  const arrowSpan = $('<span>').css({
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

  const newDiv = $('<div>').addClass('getting-started-content').css({
    display: 'none',
  });

  foundElements.forEach((item) => {
    if (item.value.properties?.language) {
      const codeTitle = item.value.properties.title[0];
      const codeLanguage = item.value.properties.language[0][0];

      const codeBlock = $('<code>')
        .text(codeTitle)
        .addClass(`language-${codeLanguage} notion-code`)
        .css({
          overflow: 'hidden',
        });

      const codePre = $('<pre>')
        .addClass(`language-${codeLanguage} notion-code`)
        .css({
          'font-size': '0.5em',
        })
        .append(codeBlock);

      newDiv.append(codePre);
      Prism.highlightAll();
    } else {
      const title = item.value.properties.title[0][0];

      const titleContainer = $(`<p>${title}</p>`).css({
        'white-space': 'pre-wrap',
        'caret-color': 'rgb(55, 53, 47)',
        padding: '3px 2px',
        'font-size': '16px',
        color: 'rgb(55, 53, 47)',
        'font-weight': 'normal',
      });

      newDiv.append(titleContainer);
    }
  });

  arrowDiv.append(arrowSpan);

  arrowDiv.click(() => {
    newDiv.toggle();
    arrowSpan.toggleClass('rotated', newDiv.is(':visible')).css({
      transform: `rotate(${newDiv.is(':visible') ? '135deg' : '45deg'})`,
    });
  });

  parentSelector.prepend(arrowDiv);
  parentSelector.append(newDiv);
}

/**
 * Renders a math equation block from a Notion database.
 *
 * @param {BlockMapType} data - A map of block objects representing the database.
 * @param {string} containerSelector - A CSS selector for the container element where the math equation block will be appended to.
 */
export function renderMathEquationBlock(
  data: BlockMapType,
  containerSelector: string
) {
  const filteredData = Object.values(data).filter(
    (item) => item.value.type === typeMapping.EQUATION
  );

  if (filteredData.length === 0) {
    // eslint-disable-next-line no-console
    console.error('No math equation block found in the database.');

    return;
  }

  const mathEquationValue = filteredData[0].value.properties.title[0][0];

  const mathSpan = $('<p>', {
    text: mathEquationValue,
    css: {
      color: 'black',
      display: 'block',
      margin: '1em 0',
      'text-align': 'center',
      'font-size': '21px',
    },
  });

  katex.render(mathEquationValue, mathSpan[0]);

  const div = $('<div>', {
    class: 'equation-class',
    css: {
      display: 'flex',
      'justify-content': 'center',
    },
    append: mathSpan,
  });

  const container = $(containerSelector);

  container.prepend(div);
}

/**
Renders a table of contents for headings in a given parent element.
@param {string} parentSelector - A CSS selector for the parent element containing the headings to generate the table of contents from.
@returns {string} The generated table of contents HTML string.
*/

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

    newLine = `<li style="${indentStyle}"><a href="${link}" style="display: block; padding: 5px; color: #000; text-decoration: none; transition: opacity 0.3s ease-out; }" onmouseover="this.style.opacity='0.5';" onmouseout="this.style.opacity='1';">${title}</a></li>`;

    allLines += newLine;
  });

  let tableOfContents =
    "<nav role='navigation' class='table-of-contents' style='margin-top: 20px; margin-left: 30px;'>" +
    '<ul>';

  // Only show the table of contents if there are headings in the document.
  if (allLines) {
    // use allLines instead of newLine to check if there are headings
    tableOfContents += allLines;
    tableOfContents += '</ul>' + '</nav>';

    $('.notion-row').prepend(tableOfContents);
  }

  return tableOfContents;
}

export function setFullWidth(parentSelector = '') {
  const container = $(parentSelector);

  container.css({
    width: '100%',
    'max-width': '100%',
  });
}
