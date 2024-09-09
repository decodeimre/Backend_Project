import {formatInTimeZone} from 'date-fns-tz';


const timeZone = 'Europe/Berlin';

const now = new Date();
console.log('now:', now)



  console.log('localTime.getDay():', now.getDay())
  const daysUntilNextMonday = 8 - now.getDay();
  console.log('daysUntilNextMonday:', daysUntilNextMonday)
  const startOfNextNextWeek = new Date();
  startOfNextNextWeek.setDate(now.getDate() + daysUntilNextMonday + 7);
  console.log('startOfNextNextWeek:', startOfNextNextWeek)