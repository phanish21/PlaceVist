import React from 'react';

const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

export function VALIDATOR_REQUIRE() {
  return { type: 'REQUIRE' };
}

export function VALIDATOR_FILE() {
  return { type: 'FILE' };
}

export function VALIDATOR_MINLENGTH(val) {
  return { type: 'MINLENGTH', val };
}

export function VALIDATOR_MAXLENGTH(val) {
  return { type: 'MAXLENGTH', val };
}

export function VALIDATOR_MIN(val) {
  return { type: 'MIN', val };
}

export function VALIDATOR_MAX(val) {
  return { type: 'MAX', val };
}

export function VALIDATOR_EMAIL() {
  return { type: 'EMAIL' };
}

export const validators = {
  VALIDATOR_REQUIRE,
  VALIDATOR_FILE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
  VALIDATOR_EMAIL
};

export function Validate(value, validatorsArray) {
  let isValid = true;
  for (const validator of validatorsArray) {
    switch (validator.type) {
      case 'REQUIRE':
        isValid = isValid && value.trim().length > 0;
        break;
      case 'MINLENGTH':
        isValid = isValid && value.trim().length >= validator.val;
        break;
      case 'MAXLENGTH':
        isValid = isValid && value.trim().length <= validator.val;
        break;
      case 'MIN':
        isValid = isValid && +value >= validator.val;
        break;
      case 'MAX':
        isValid = isValid && +value <= validator.val;
        break;
      case 'EMAIL':
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        break;
      default:
        break;
    }
  }
  return isValid;
}
