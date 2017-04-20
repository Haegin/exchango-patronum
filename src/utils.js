import {format} from 'date-fns';

const dateToStr = (date) => (format(date, "Do MMM YYYY"));
const relativeRate = (from, to) => (to/from);

export {dateToStr, relativeRate};
