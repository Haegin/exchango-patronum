import React from 'react';
import {Column} from './layout';
import {dateToStr, relativeRate} from './utils';
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts';
import {connect} from 'react-redux';
import {eachDay} from 'date-fns';
import _ from 'lodash/fp';

const Graph = ({data}) => {
  return (
    <Column>
      <LineChart
        width={800}
        height={250}
        data={data}
      >
        <XAxis dataKey="name" />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid />
        <Line type="monotone" dataKey="value" />
        <Tooltip />
      </LineChart>
    </Column>
  );
}

const mapStateToProps = (state) => {
  const startDate = state.dates.from;
  const endDate = state.dates.to;
  return {
    data: eachDay(startDate, endDate).map((day) => {
      const dayRates = state.rates[day]
      const toRate = dayRates === undefined ? 1 : dayRates[state.currencies.to]
      const fromRate = dayRates === undefined ? 1 : dayRates[state.currencies.from]
      return {name: dateToStr(day), value: relativeRate(fromRate, toRate)}
    }
  )}
}

export default connect(mapStateToProps)(Graph);
