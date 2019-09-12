/* eslint-disable no-global-assign */

const moment = require('moment');

const howOld = function howOld(birthday) {
  return moment().diff(birthday, 'years');
};

module.exports = {
  howOld,
};

// tests
const birthday = require('./index');

describe('Determines age based on birthday', () => {
  let tempDate;
  beforeAll(() => {
    // Save original date module
    tempDate = Date;
  });

  afterAll(() => {
    // Reset Date
    Date = tempDate;
  });

  beforeEach(() => {
    // Set a fixed date
    Date.now = jest.fn(() => new Date('01 Jan 2018').valueOf());
  });

  test('Returns 0 if birthday is today', () => {
    expect(birthday.howOld(new Date('01 Jan 2018'))).toBe(0);
  });

  test('Returns 1 if birthday is exactly a year ago', () => {
    expect(birthday.howOld(new Date('01 Jan 2017'))).toBe(1);
  });

  test('Returns 1 if birthday is a day over a year ago', () => {
    expect(birthday.howOld(new Date('31 Dec 2016'))).toBe(1);
  });

  test('Returns 0 if birthday is a day under a year ago', () => {
    expect(birthday.howOld(new Date('02 Jan 2017'))).toBe(0);
  });

  test('Returns 100 if birthday is 100 years ago', () => {
    expect(birthday.howOld(new Date('01 Jan 1918'))).toBe(100);
  });
});
