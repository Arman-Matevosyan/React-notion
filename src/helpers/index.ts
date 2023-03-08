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
  // Assume that the JSON data is stored in a variable called 'jsonData'
  // Find the container where the table will be appended
  const container = $('#Pricing');

  // Create the table element
  const table = $('<table>');

  // Create the table header row element
  const headerRow = $('<tr>');

  // Iterate over the keys of the first object in the JSON data to create the table headers
  Object.keys(jsonData[Object.keys(jsonData)[0]].value.properties).forEach(
    function (key) {
      const headerCell = $('<th>').text(key);

      headerRow.append(headerCell);
    }
  );

  // Append the table header row to the table
  table.append(headerRow);

  // Iterate over the JSON data to create the table rows
  Object.keys(jsonData).forEach(function (key) {
    const row = jsonData[key].value.properties;

    const tableRow = $('<tr>');

    // Iterate over the properties of each row to create the table cells
    row &&
      Object.keys(row).forEach(function (prop) {
        const cell = $('<td>').text(row[prop][0][0]);

        tableRow.append(cell);
      });

    // Append the table row to the table
    table.append(tableRow);
  });

  console.log(table);
  // Append the table to the container
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
