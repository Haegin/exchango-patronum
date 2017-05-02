import reducer from './reducers';

let initialState = {
  currencies: {from: 'GBP', to: 'USD'},
  dates: {
    from: new Date(2017, 3, 1),
    to: new Date(2017, 3, 31)
  },
  rates: {}
};

describe('SET_FROM_CURRENCY', () => {
  it('sets the from currency', () => {
    const action = {
      type: 'SET_FROM_CURRENCY',
      currency: 'CAD'
    };
    expect(
      reducer(initialState, action).currencies
    ).toEqual({from: 'CAD', to: 'USD'})
  });
})

describe('SET_TO_CURRENCY', () => {
  it('sets the to currency', () => {
    const action = {
      type: 'SET_TO_CURRENCY',
      currency: 'CAD'
    };
    expect(
      reducer(initialState, action).currencies
    ).toEqual({from: 'GBP', to: 'CAD'})
  });
})

describe('SET_FROM_DATE', () => {
  it('sets the from date', () => {
    const action = {
      type: 'SET_FROM_DATE',
      date: new Date(2017, 1, 1)
    };
    expect(
      reducer(initialState, action).dates
    ).toEqual({
      from: new Date(2017, 1, 1),
      to: new Date(2017, 3, 31)
    })
  });
})

describe('SET_TO_DATE', () => {
  it('sets the to date', () => {
    const action = {
      type: 'SET_TO_DATE',
      date: new Date(2017, 4, 10)
    };
    expect(
      reducer(initialState, action).dates
    ).toEqual({
      from: new Date(2017, 3, 1),
      to: new Date(2017, 4, 10)
    })
  });
})

describe('RATES_LOADED', () => {
  it('adds the rates to the cached set', () => {
    const action = {
      type: 'RATES_LOADED',
      date: new Date(2017, 4, 10),
      rates: {
        CAD: 1.4188,
        GBP: 0.85618,
        JPY: 123.4,
        USD: 1.0541,
      }
    };
    expect(
      reducer(initialState, action).rates
    ).toEqual({
      [new Date(2017, 4, 10)]: {
        CAD: 1.4188,
        GBP: 0.85618,
        JPY: 123.4,
        USD: 1.0541,
      }
    })
  });

  it('overwrites existing data for the given date', () => {
    initialState.rates = {
      [new Date(2017, 4, 10)]: {
        CAD: 4,
        GBP: 3,
        JPY: 9001,
        USD: 1,
      }
    }
    const action = {
      type: 'RATES_LOADED',
      date: new Date(2017, 4, 10),
      rates: {
        CAD: 1.4188,
        GBP: 0.85618,
        JPY: 123.4,
        USD: 1.0541,
      }
    };
    expect(
      reducer(initialState, action).rates
    ).toEqual({
      [new Date(2017, 4, 10)]: {
        CAD: 1.4188,
        GBP: 0.85618,
        JPY: 123.4,
        USD: 1.0541,
      }
    })
  });
})
