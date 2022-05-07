`use strict`;

// selecting elements: bill and number-of-people input fields
const elementBillInputField = document.getElementById(`bill`);
const elementPeopleInputField = document.getElementById(`number-people`);

// selecting elements: tip-per-person and total-per-person text elements
const elementTipPerPersonResult = document.getElementById(`tip-per-person`);
const elementTotalPerPersonResult = document.getElementById(`total-per-person`);

// selecting elements: tip selection radio buttons
const elementTipButtons = document.querySelectorAll(`.preset-tip-btn`);

// selecting elements: custom tip radio button and input field
const elementCustomRadioBtn = document.getElementById(`custom-radio`);
const elementCustomBtn = document.querySelector(`.custom-radio`);
const elementCustomInputField = document.getElementById(`custom-field`);

// selecting elements: reset button
const elementResetBtn = document.getElementById(`reset-btn`);

// selecting elements: number-of-people small validation text element
const elementValidationText = document.querySelector(`.invalid-input`);

let tipPerPerson;
let totalPerPerson;

const hideEmptyInputFieldError = function () {
  elementPeopleInputField.classList.remove(`invalid`);
  elementValidationText.classList.add(`hidden`);
};

// assign and set values and elements back to starting point, uncheck any selected tip button, disable reset button, and hide error validation
const init = function () {
  tipPerPerson = 0;
  totalPerPerson = 0;

  elementBillInputField.value = ``;
  elementPeopleInputField.value = ``;

  for (let i = 0; i < elementTipButtons.length; i++) {
    elementTipButtons[i].checked = false;
  }

  if (elementCustomInputField !== ``) {
    elementCustomInputField.value = ``;
  }

  elementResetBtn.disabled = true;

  hideEmptyInputFieldError();

  elementTipPerPersonResult.textContent = `$${tipPerPerson.toFixed(2)}`;
  elementTotalPerPersonResult.textContent = `$${totalPerPerson.toFixed(2)}`;
};

// invoke function to initialize app on load
init();

const enableResetButton = function () {
  elementResetBtn.disabled = false;
};

const displayEmptyInputFieldError = function () {
  tipPerPerson = 0;
  totalPerPerson = 0;

  elementPeopleInputField.classList.add(`invalid`);
  elementValidationText.classList.remove(`hidden`);
  elementTipPerPersonResult.textContent = `$${tipPerPerson.toFixed(2)}`;
  elementTotalPerPersonResult.textContent = `$${totalPerPerson.toFixed(2)}`;
  enableResetButton();
};

const calculateAndDisplayTip = function (selectedTip) {
  const decimal = selectedTip.value / 100;
  const tip = decimal * elementBillInputField.value;
  tipPerPerson = (tip / elementPeopleInputField.value).toFixed(2);
  const total = Number(elementBillInputField.value) + tip;
  totalPerPerson = (total / elementPeopleInputField.value).toFixed(2);
  if (selectedTip.checked || elementCustomInputField.value !== ``) {
    elementTipPerPersonResult.textContent = `$${tipPerPerson}`;
    elementTotalPerPersonResult.textContent = `$${totalPerPerson}`;
    enableResetButton();
  }
};

const updateTipOnInputUpdate = function () {
  if (elementPeopleInputField.value !== ``) {
    for (let i = 0; i < elementTipButtons.length; i++) {
      if (elementTipButtons[i].checked) {
        hideEmptyInputFieldError();
        calculateAndDisplayTip(elementTipButtons[i]);
      } else if (elementCustomInputField.value !== ``) {
        hideEmptyInputFieldError();
        calculateAndDisplayTip(elementCustomInputField);
      } else {
        hideEmptyInputFieldError();
      }
    }
  } else {
    displayEmptyInputFieldError();
  }
};

// tip button elements click event: calculate tip on click with validation
for (let i = 0; i < elementTipButtons.length; i++) {
  elementTipButtons[i].addEventListener(`click`, function () {
    elementCustomInputField.value = ``;
    if (elementPeopleInputField.value !== ``) {
      hideEmptyInputFieldError();
      calculateAndDisplayTip(elementTipButtons[i]);
    } else {
      displayEmptyInputFieldError();
    }
  });
}

// custom tip input field element click and input event: uncheck other selected tip button on click and update data on input
elementCustomInputField.addEventListener(`click`, function (e) {
  for (let i = 0; i < elementTipButtons.length; i++) {
    if (elementTipButtons[i].checked) {
      elementTipButtons[i].checked = false;
    }
  }
  e.target.addEventListener(`input`, updateTipOnInputUpdate);
});

elementBillInputField.addEventListener(`input`, updateTipOnInputUpdate);
elementPeopleInputField.addEventListener(`input`, updateTipOnInputUpdate);
elementResetBtn.addEventListener(`click`, init);
