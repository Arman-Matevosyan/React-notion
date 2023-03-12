import React from 'react';
import { render, screen } from '@testing-library/react';
import { Notion } from '../../../components/notion';
import { blockMapDataMock } from '../../../__mocks__/dataMock';
import * as helpers from '../../../helpers';

describe('Notion', () => {
  test('should render correctly', async () => {
    render(<Notion data={{}} />);
    expect(await screen.findByTestId('notion-renderer')).toBeInTheDocument();
  });

  it('Creates table of contents', () => {
    const createTableOfContentsMock = jest.spyOn(
      helpers,
      'createTableOfContents'
    );

    render(<Notion data={blockMapDataMock} />);
    expect(createTableOfContentsMock).toHaveBeenCalledWith('.notion');
  });

  it('should render math equations', () => {
    const renderMathEquationBlockMock = jest.spyOn(
      helpers,
      'renderMathEquationBlock'
    );

    render(<Notion data={blockMapDataMock} />);
    expect(renderMathEquationBlockMock).toHaveBeenCalledWith(
      blockMapDataMock,
      '#Pricing'
    );
  });

  it('should create table from page data', () => {
    const createTableFromPageDataMock = jest.spyOn(
      helpers,
      'createTableFromPageData'
    );

    render(<Notion data={blockMapDataMock} />);
    expect(createTableFromPageDataMock).toHaveBeenCalledWith(
      blockMapDataMock,
      '#Pricing'
    );
  });

  it('should create toggle', () => {
    const createToggleMock = jest.spyOn(helpers, 'createToggle');

    render(<Notion data={blockMapDataMock} />);
    expect(createToggleMock).toHaveBeenCalledWith(
      blockMapDataMock,
      '#Getting-Started'
    );
  });
});
