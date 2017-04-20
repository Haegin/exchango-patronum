import {eachDay, format} from 'date-fns';

const setFromCurrency = (currency) => {
  return {
    type: 'SET_FROM_CURRENCY',
    currency
  }
}

const setToCurrency = (currency) => {
  return {
    type: 'SET_TO_CURRENCY',
    currency
  }
}

const ratesLoaded = (date, rates) => {
  return {
    type: 'RATES_LOADED',
    date: date,
    rates: rates
  }
}

const datesChanged = (from, to) => {
  return (dispatch, getState) => {
    const rates = getState().rates;
    eachDay(from, to).forEach((date) => {
      if (!rates.hasOwnProperty(date)) {
        fetch(`https://api.fixer.io/${format(date, "YYYY-MM-DD")}`)
          .then((resp) => (resp.json()))
          .then((json) => { dispatch(ratesLoaded(date, json.rates)) })
      }
    })
  }
}

const setFromDate = (date) => {
  return (dispatch, getState) => {
    dispatch({type: 'SET_FROM_DATE', date})
    return dispatch(datesChanged(date, getState().dates.to));
  }
}

const setToDate = (date) => {
  return (dispatch, getState) => {
    dispatch({type: 'SET_TO_DATE', date})
    return dispatch(datesChanged(getState().dates.from, date));
  }
}

export {
  setFromCurrency,
  setToCurrency,
  setFromDate,
  setToDate,
  datesChanged,
}
