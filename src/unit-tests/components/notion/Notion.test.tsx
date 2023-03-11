import React from 'react';
import { render, screen } from '@testing-library/react';
import { Notion } from '../../../components/notion';
import { blockMapDataMock } from '../../../__mocks__/dataMock';

describe('Home', () => {
  test('should render correctly', async () => {
    render(<Notion data={{}} />);
    expect(await screen.findByTestId('notion-renderer')).toBeInTheDocument();
  });

  it('should call createTableOfContents with the .notion selector', () => {
    const createTableOfContentsMock = jest.fn();

    render(<Notion data={blockMapDataMock} />);

    expect(createTableOfContentsMock).toHaveBeenCalled();
  });

  it('should call renderMathEquationBlock with the data and the #Pricing selector', () => {
    const renderMathEquationBlockMock = jest.fn();

    render(<Notion data={blockMapDataMock} />);

    expect(renderMathEquationBlockMock).toHaveBeenCalledWith(
      blockMapDataMock,
      '#Pricing'
    );
  });
});
