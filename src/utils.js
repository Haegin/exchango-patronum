import format from 'date-fns/format';

const dateToStr = (date) => (format(date, "Do MMM YYYY"));

export {dateToStr};
