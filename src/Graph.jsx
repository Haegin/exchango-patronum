import React from 'react';
import {Column} from './layout';
import {dateToStr} from './utils';
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts';
import {connect} from 'react-redux';

const Graph = ({fromCurrency, toCurrency, fromDate, toDate}) => {
  return (
    <Column>
      <LineChart
        width={800}
        height={250}
        data={[
          {name: dateToStr(new Date(2017, 1, 1)), value: 1.049},
          {name: dateToStr(new Date(2017, 2, 1)), value: 1.047},
          {name: dateToStr(new Date(2017, 3, 1)), value: 1.039},
          {name: dateToStr(new Date(2017, 4, 1)), value: 1.041},
          {name: dateToStr(new Date(2017, 5, 1)), value: 1.046},
          {name: dateToStr(new Date(2017, 6, 1)), value: 1.042},
        ]}
      >
        <XAxis dataKey="name" />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid />
        <Line type="monotone" dataKey="value" />
        <Tooltip />
      </LineChart>
      <p>From: {dateToStr(fromDate)}</p>
      <p>To: {dateToStr(toDate)}</p>
    </Column>
  );
}

const mapStateToProps = (state) => {
  return {
    fromCurrency: state.currencies.from,
    toCurrency: state.currencies.to,
    fromDate: state.dates.from,
    toDate: state.dates.to,
    rates: state.rates
  }
}

export default connect(mapStateToProps)(Graph);
