import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.sendMessage({
  // will change to get the content of the required div.
  text: document.querySelector('body').textContent,
});
