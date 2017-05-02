import React from 'react';
import {Column} from './styles/layout';
import {dateToStr, relativeRate} from './utils';
import {ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts';
import {connect} from 'react-redux';
import {eachDay} from 'date-fns';
import _ from 'lodash/fp';

const Graph = ({data, from, to}) => {
  return (
    <Column grow>
      <ResponsiveContainer width="100%" height={660}>
        <LineChart data={data} >
          <XAxis dataKey="name" label={to} />
          <YAxis domain={["auto", "auto"]} label={from} />
          <CartesianGrid />
          <Line type="monotone" dataKey="value" name={to} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Column>
  );
}

const mapStateToProps = (state) => {
  const startDate = state.dates.from;
  const endDate = state.dates.to;
  const fetchRate = (rates, from, to) => {
    const fromRate = (rates === undefined || from === "EUR") ? 1 : rates[from]
    const toRate = (rates === undefined || to === "EUR") ? 1 : rates[to]
    return relativeRate(fromRate, toRate)
  };
  return {
    data: eachDay(startDate, endDate).map((day) => {
      return {
        name: dateToStr(day),
        value: fetchRate(state.rates[day], state.currencies.from, state.currencies.to)
      }
    }),
    from: state.currencies.from,
    to: state.currencies.to,
  }
}

export default connect(mapStateToProps)(Graph);
