import {dateToStr, relativeRate} from './utils';
import {parse} from 'date-fns';

it('formats dates nicely', () => {
  expect(dateToStr(parse("2017-04-06"))).toEqual("6th Apr 2017");
  expect(dateToStr(parse("1940-12-28"))).toEqual("28th Dec 1940");
  expect(dateToStr(parse("1994-09-01"))).toEqual("1st Sep 1994");
});

it('calculates an exchange rate from the rates between two currencies and a base currency', () => {
  const gbp = 0.84;
  const cad = 1.45;
  expect(relativeRate(gbp, cad)).toBeCloseTo(1.73)
  expect(relativeRate(cad, gbp)).toBeCloseTo(0.58)
});
