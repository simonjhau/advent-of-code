const totalRocks = 1000000000000;

const rocksPerLoop = 1750; // Found by running part 1 and looking for patterns
const numRocksToMakeFirstFullRow = 107;
const heightOfFirstFullRow = 162;
const heightOfSecondFullRow = 2958;

const heightOfLoop = heightOfSecondFullRow - heightOfFirstFullRow;

const totalRocksMinusFirstFullRow = totalRocks - numRocksToMakeFirstFullRow;

const numLoops = Math.floor(totalRocksMinusFirstFullRow / rocksPerLoop);
const heightOfLoops = numLoops * heightOfLoop;
const numRocksRemaindingAtEnd =
  totalRocks - numLoops * rocksPerLoop - numRocksToMakeFirstFullRow;

console.log({
  heightOfLoop,
  totalRocksMinusFirstFullRow,
  numLoops,
  numRocksRemaindingAtEnd,
});

const heightOfEndRemainder = 1020;

const totalHeight = heightOfFirstFullRow + heightOfLoops + heightOfEndRemainder;
console.log({ totalHeight });
