import React from 'react';
import {Column} from './layout';
import {dateToStr} from './utils';

const Graph = ({fromCurrency, toCurrency, fromDate, toDate}) => {
  return (
    <Column>
      <p>This is a graph</p>
      <p>From: {dateToStr(fromDate)}</p>
      <p>To: {dateToStr(toDate)}</p>
    </Column>
  );
}

export default Graph;
