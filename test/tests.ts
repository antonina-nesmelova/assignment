const expect = require('chai').expect;
const fs = require('fs');
const { isAlphanumeric, processString, saveResultToFile } = require('../src/package.ts');

const alphanumericStrings = [
  { input: 'abCD12', output: '21dcBA' },
  { input: 'Jòhn꠵Çoe日本語3rd', output: 'DR3語本日EOç꠵NHÒj' },
];
const notAlphanumericStrings = ['abCD12!', 'Jòhn꠵Çoe 日本語3rd'];

describe('Assignment tests', function () {
  for (const string of alphanumericStrings) {
    it(`${string.input} should be alphanumeric`, function () {
      expect(isAlphanumeric(string.input)).to.be.equal(true);
    });
  }

  for (const string of notAlphanumericStrings) {
    it(`${string} should be alphanumeric`, function () {
      expect(isAlphanumeric(string)).to.be.equal(false);
    });
  }

  for (const string of alphanumericStrings) {
    it(`${string.input} should be processed to ${string.output}`, function () {
      expect(processString(string.input)).to.be.equal(string.output);
    });
  }

  for (const string of alphanumericStrings) {
    it(`${string.input} should be saved to file as correct JSON`, function () {
      const input = {
        ...string,
        duration: 1.3,
      };

      saveResultToFile(input);

      const result = fs.readFileSync('./result/processed.json', 'utf8');
      expect(JSON.parse(result)).to.deep.equal(input);
    });
  }
});
