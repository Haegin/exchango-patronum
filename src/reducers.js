import {combineReducers} from 'redux';
import {parse} from 'date-fns';

const currencies = (state = {from: "GBP", to: "CAD"}, action) => {
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

const dates = (state = {from: parse("2017/04/01"), to: new Date()}, action) => {
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
      return {
        ...state,
        rates: {...state.rates, [action.date]: action.rates}
      }
    default:
      return state;
  }
}

export default combineReducers({
  currencies,
  dates,
  rates
})
