'use strict';

const themeSwitcher = document.querySelector('#check');
themeSwitcher.addEventListener('click', function () {
  document.body.classList.toggle('light-theme');
});
const keys = document.querySelector('.calc-button');
const container = document.querySelector('.container');

keys.addEventListener('click', function (e) {
  const target = e.target;
  const targetContent = target.textContent;
  const action = e.target.dataset.action;
  const display = document.querySelector('.calc-display');
  const displayContent = display.textContent;
  const previousKeyType = container.dataset.previousKeyType;
  let firstValue = Number(container.dataset.firstValue);
  let operator = container.dataset.operator;
  let secondValue = Number(displayContent);
  let arr = [];
  arr.push(firstValue, operator, secondValue);
  
  const calc = function (...arr) {
    if (operator === 'add') return firstValue + secondValue;
    if (operator === 'subtract') return firstValue - secondValue;
    if (operator === 'multiply') return firstValue * secondValue;
    if (operator === 'divide') return firstValue / secondValue;
  };

  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    container.dataset.firstValue = displayContent;
    container.dataset.operator = action;
    secondValue;
    if (firstValue && operator && previousKeyType === 'number') {
      const calcValue = calc(arr);
      display.textContent = calcValue;
      container.dataset.firstValue = calcValue;
    }
    if (previousKeyType === 'equal') {
      return;
    }
    container.dataset.previousKeyType = 'operator';
  }
  if (!action) {
    displayContent === '0' ||
    previousKeyType === 'operator' ||
    previousKeyType === 'equal'
      ? (display.textContent = targetContent)
      : (display.textContent = displayContent + targetContent);

    container.dataset.previousKeyType = 'number';
  }
  if (action === 'decimal') {
    display.textContent = displayContent + '.';

    if (displayContent.includes('.')) {
      display.textContent = displayContent + '';
    } else if (previousKeyType === 'operator' || previousKeyType === 'equal') {
      display.textContent = '0.';
    }

    container.dataset.previousKeyType = 'decimal';
  }

  if (action === 'delete') {
    arr.pop();
    secondValue = ' ';
    display.textContent = ' ';
  }
  if (action === 'reset') {
    container.dataset.firstValue = ' ';
    container.dataset.operator = ' ';
    container.dataset.secondValue = ' ';
    arr = [];
    container.dataset.previousKeyType = ' ';
    display.textContent = ' ';
  }
  if (action === 'equal') {
    if (previousKeyType === 'equal') {
      firstValue = displayContent;
      secondValue = container.dataset.modValue;
      return;
    }
    display.textContent = calc(firstValue, operator, secondValue);

    container.dataset.modValue = secondValue;
    container.dataset.previousKeyType = 'equal';
  }
});
