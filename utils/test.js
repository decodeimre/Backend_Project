import {formatInTimeZone} from 'date-fns-tz';


const timeZone = 'Europe/Berlin';

const now = new Date();
console.log('now:', now)
const localTime = formatInTimeZone(now, timeZone, 'yyyy-MM-dd HH:mm:ss zzz');
console.log('localTime:', localTime)


  console.log('localTime.getDay():', today.getDay())
  const daysUntilNextMonday = 8 - today.getDay();
  console.log('daysUntilNextMonday:', daysUntilNextMonday)
  const startOfNextNextWeek = new Date();
  startOfNextNextWeek.setDate(today.getDate() + daysUntilNextMonday + 7);
  console.log('startOfNextNextWeek:', startOfNextNextWeek)