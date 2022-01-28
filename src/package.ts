const readline = require('readline');
const fs = require('fs');

function isAlphanumeric(input: string) {
  return input.match(/^[\p{L}\p{N}]*$/u) ? true : false;
}

// reversing string and switching letters case
function processString(input: string) {
  return input
    .split('')
    .reverse()
    .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join('');
}

function saveResultToFile(result: { input: string; output: string; duration: number }) {
  if (!fs.existsSync('result')) {
    fs.mkdirSync('result', {}, (err: Error) => {
      if (err) throw err;
    });
  }

  fs.writeFileSync('result/processed.json', JSON.stringify(result, null, 4), function (err: Error) {
    if (err) throw err;
  });
}

function main() {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  console.log('Please enter alphanumeric string:');

  rl.on('line', function (input: string) {
    performance.mark('start-script');

    if (!isAlphanumeric(input)) {
      console.log("Entered string isn't alphanumeric, try one more time.");
      return;
    }

    const output = processString(input);

    console.log(output);

    performance.mark('end-script');

    const { duration } = performance.measure('execution-time', 'start-script', 'end-script');

    const result = {
      input,
      output,
      duration,
    };

    saveResultToFile(result);

    process.exit(0);
  });
}

module.exports = {
  isAlphanumeric,
  processString,
  saveResultToFile,
  main,
};
