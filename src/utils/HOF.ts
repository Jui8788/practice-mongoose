// Example of Higher Order Function

const calculator = (calc: any) => {
  const dynamicCalculator = (a: number, b: number) => {
    const value = calc(a, b);
    console.log(value);
  };
  return dynamicCalculator;
};

const myCalculator = calculator((a: number, b: number) => a % b); // dynamicCalculator

console.log(myCalculator(1, 2));
