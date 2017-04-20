import {format} from 'date-fns';

const dateToStr = (date) => (format(date, "Do MMM YYYY"));

export {dateToStr};
