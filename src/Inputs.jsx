import React from 'react';
import {Row, Column} from './styles/layout';
import {withHandlers, compose} from 'recompose';
import {format} from 'date-fns';
import {setFromCurrency, setToCurrency, setFromDate, setToDate} from './actions';
import {connect} from 'react-redux';
import CURRENCIES from './currencies';
import {Label, Select, Input} from './styles/forms';

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
})

const DateInput = enhance(({label, name, value, onChange}) => {
  return (
    <Row>
      <Label htmlFor={name}>{label}</Label>
      <Input type="date" name={name} id={name} onChange={onChange} value={value} />
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
      <DateInput label="From" name="from" onChange={props.setFromDate} value={format(props.fromDate, 'YYYY-MM-DD')} />
      <DateInput label="To" name="to" onChange={props.setToDate} value={format(props.toDate, 'YYYY-MM-DD')} />
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
