import React from 'react';
import {Column} from './styles/layout';
import {dateToStr, relativeRate} from './utils';
import {ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts';
import {connect} from 'react-redux';
import {eachDay} from 'date-fns';
import _ from 'lodash/fp';

const Graph = ({data}) => {
  return (
    <Column>
      <ResponsiveContainer width="100%" height={460}>
        <LineChart
          data={data}
        >
          <XAxis dataKey="name" />
          <YAxis domain={["auto", "auto"]} />
          <CartesianGrid />
          <Line type="monotone" dataKey="value" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
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
