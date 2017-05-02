import React from 'react';
import {withHandlers, compose} from 'recompose';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import {Row, Column} from './styles/layout';
import {setFromCurrency, setToCurrency, setFromDate, setToDate} from './actions';
import CURRENCIES from './currencies';
import {Label, Select} from './styles/forms';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const enhance = compose(
  withHandlers({
    onChange: props => event => {
      props.onChange(event.target.value);
    }
  })
)

const SelectInput = enhance(({label, name, values, selected, onChange}) => {
  return (
    <Row>
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} id={name} value={selected} onChange={onChange}>
    {values.map((value) => (<option value={value} key={value}>{value}</option>))}
      </Select>
    </Row>
  );
});

const DateInputs = enhance(({setFromDate, setToDate, fromDate, toDate}) => {
  return (
    <Row>
      <DatePicker
        inline
        selectsStart
        startDate={fromDate}
        endDate={toDate}
        onChange={setFromDate}
        locale="en-gb"
        todayButton="Today"
      />
      <DatePicker
        inline
        selectsEnd
        startDate={fromDate}
        endDate={toDate}
        onChange={setToDate}
        locale="en-gb"
        todayButton="Today"
      />
    </Row>
  );
})

const Inputs = (props) => {
  return (
    <Column>
      <h2>Currencies</h2>
      <SelectInput
        label="From"
        name="from"
        onChange={props.setFromCurrency}
        values={CURRENCIES}
        selected={props.fromCurrency}
      />
      <SelectInput
        label="To"
        name="to"
        onChange={props.setToCurrency}
        values={CURRENCIES}
        selected={props.toCurrency}
      />
      <hr />
      <h2>Dates</h2>
      <DateInputs
        fromDate={moment(props.fromDate)}
        toDate={moment(props.toDate)}
        setFromDate={props.setFromDate}
        setToDate={props.setToDate}
      />
    </Column>
  );
}

const mapStateToProps = (state) => {
  return {
    fromCurrency: state.currencies.from,
    toCurrency: state.currencies.to,
    fromDate: state.dates.from,
    toDate: state.dates.to
  }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    setFromCurrency: (currency) => { dispatch(setFromCurrency(currency)) },
    setToCurrency: (currency) => { dispatch(setToCurrency(currency)) },
    setFromDate: (date) => { dispatch(setFromDate(date)) },
    setToDate: (date) => { dispatch(setToDate(date)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);
