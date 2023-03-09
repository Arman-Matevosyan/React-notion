/**
 *
 * @param parentSelector: Where to insert the new table of contents.
 * Leave blank if you only wnat to return the table of contents without
 * automatically prepending to the parent component.
 * @see: https://css-tricks.com/automatic-table-of-contents/
 * @see: Used in https://atila.ca/blog/tomiwa/how-to-embed-a-notion-page-in-a-react-website/
 */
import $ from 'jquery';

const slugify = require('slugify');

const pageId = '575d3ec590204c938adc349bef9cabc9';
const baseUrl = 'https://notion-api.splitbee.io/v1';

export function createTableFromTabel(jsonData) {
  const newData = Object.values(jsonData).filter(
    (item) => item.value.type === 'table_row'
  );

  const container = $('#Pricing');
  const table = $('<table>');

  newData.forEach(function (key, index) {
    const row = key.value.properties;

    const [klpe] = row.kLPe || [null];

    const tableRow = $('<tr>');

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

export function replaceElement(selector) {
  const oldElement = document.getElementById(selector);

  console.log(oldElement);
  const newDiv = document.createElement('div');

  oldElement?.append(`<p>Here is an equation: \(E = mc^2\)</p>`);
  // if (oldElement) {
  //   oldElement.replaceWith(newElement);
  // }
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
