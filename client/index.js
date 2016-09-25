import $ from 'jquery';
import layOutDay, { generateRandomEvents } from './layOutDay';

$('.randomize-button').click(() => {
  const numEvents = Math.floor(Math.random() * 20) + 5;
  const minEventTime = 20;
  const maxEventTime = 180;
  layOutDay(generateRandomEvents(numEvents, maxEventTime, minEventTime));
});

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
