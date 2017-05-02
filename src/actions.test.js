import {
  setFromCurrency,
  setToCurrency,
  setFromDate,
  setToDate,
  datesChanged,
} from './actions';

describe('setFromCurrency', () => {
  it('creates the correct action', () => {
    expect(setFromCurrency('CAD')).toEqual({
      type: 'SET_FROM_CURRENCY',
      currency: 'CAD'
    })
  });
});

describe('setToCurrency', () => {
  it('creates the correct action', () => {
    expect(setToCurrency('CAD')).toEqual({
      type: 'SET_TO_CURRENCY',
      currency: 'CAD'
    })
  });
});

describe('setFromDate', () => {
  it('dispatches an action to set the from date', () => {
    let thunk = setFromDate(new Date(2017, 8, 13))
    expect(thunk).toBeInstanceOf(Function);
    let dispatch = jest.fn()
    thunk(dispatch, () => ({
      dates: {
        from: new Date(2017, 3, 1),
        to: new Date(2017, 3, 31)
      }
    }));
    expect(dispatch.mock.calls.length).toEqual(2);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'SET_FROM_DATE',
      date: new Date(2017, 8, 13)
    })
  });
});

// describe('setToDate', () => {
//   it('creates the correct action', () => {
//     expect(setToDate(new Date(2017, 8, 13))).toEqual({
//       type: 'SET_TO_DATE',
//       date: new Date(2017, 8, 13)
//     })
//   });
// });
