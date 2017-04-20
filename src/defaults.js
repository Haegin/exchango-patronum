import {subMonths} from 'date-fns';

const toDate = new Date();
const fromDate = subMonths(toDate, 1);
const fromCurrency = "GBP";
const toCurrency = "CAD";

export default {
  fromDate,
  toDate,
  fromCurrency,
  toCurrency,
}
