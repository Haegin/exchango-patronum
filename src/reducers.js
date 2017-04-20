import {combineReducers} from 'redux';
import defaults from './defaults';

const currencies = (state = {from: defaults.fromCurrency, to: defaults.toCurrency}, action) => {
  switch (action.type) {
    case 'SET_FROM_CURRENCY':
      return {
        ...state,
        from: action.currency
      };
    case 'SET_TO_CURRENCY':
      return {
        ...state,
        to: action.currency
      };
    default:
      return state;
  }
}

const dates = (state = {from: defaults.fromDate, to: defaults.toDate}, action) => {
  switch (action.type) {
    case 'SET_FROM_DATE':
      return {
        ...state,
        from: action.date
      };
    case 'SET_TO_DATE':
      return {
        ...state,
        to: action.date
      };
    default:
      return state;
  }
}

const rates = (state =  {}, action) => {
  switch (action.type) {
    case 'RATES_LOADED':
      return {...state, [action.date]: action.rates}
    default:
      return state;
  }
}

export default combineReducers({
  currencies,
  dates,
  rates
})
