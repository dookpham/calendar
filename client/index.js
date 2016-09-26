import $ from 'jquery';
import layOutDay, { generateRandomEvents } from './layOutDay';

/** Generates a random number of events (between 5 and 25)
*   of length 20 - 180 minutes
*/
$('.randomize-button').click(() => {
  const numEvents = Math.floor(Math.random() * 20) + 5;
  const minEventTime = 20;
  const maxEventTime = 180;
  layOutDay(generateRandomEvents(numEvents, maxEventTime, minEventTime));
});

// testData for the default Calendar view
const testData = [
  {
    start: 30,
    end: 150,
  },
  {
    start: 540,
    end: 600,
  },
  {
    start: 560,
    end: 620,
  },
  {
    start: 610,
    end: 670,
  },
];

layOutDay(testData);

// for calling and testing layOutDay directly from browser console.
window.layOutDay = layOutDay;
window.generateRandomEvents = generateRandomEvents;
