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

export function createTableOfContents(parentSelector = '') {
  let element;
  let title;
  let link;
  let newLine;
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
    "<nav role='navigation' class='table-of-contents'>" +
    '<h2>Table of Contents:</h2>' +
    '<ul>';

  // Only show the table of contents if there are headings in the document.
  if (newLine) {
    tableOfContents += allLines;
    tableOfContents += '</ul>' + '</nav>';
    if (parentSelector) {
      $(parentSelector).prepend(tableOfContents);
    }
  }

  return tableOfContents;
}
