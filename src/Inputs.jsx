import React from 'react';
import {Row, Column} from './layout';
import {withHandlers, compose} from 'recompose';
import {format} from 'date-fns';

const enhance = compose(
  withHandlers({
    onChange: props => event => {
      props.onChange(event.target.value);
    }
  })
)

const Input = enhance(({label, name, value, onChange}) => {
  return (
    <Row>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} id={name} onChange={onChange} value={value} />
    </Row>
  );
})

const DateInput = enhance(({label, name, value, onChange}) => {
  return (
    <Row>
      <label htmlFor={name}>{label}</label>
      <input type="date" name={name} id={name} onChange={onChange} value={value} />
    </Row>
  );
})

const Inputs = (props) => {
  return (
    <Column>
      <h2>Currencies</h2>
      <Input label="From" name="from" onChange={props.setFromCurrency} value={props.fromCurrency} />
      <Input label="To" name="to" onChange={props.setToCurrency} value={props.toCurrency} />
      <hr />
      <h2>Dates</h2>
      <DateInput label="From" name="from" onChange={props.setFromDate} value={format(props.fromDate, 'YYYY-MM-DD')} />
      <DateInput label="To" name="to" onChange={props.setToDate} value={format(props.toDate, 'YYYY-MM-DD')} />
    </Column>
  );
}

export default Inputs;
