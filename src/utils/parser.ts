function round(num: number, fractionDigits = 2): number {
  return Number(num.toFixed(fractionDigits));
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function parseToPlural(str: string, count: number) {
  return count >= 2 ? str + "s" : str;
}

export { round, capitalizeFirstLetter, parseToPlural };
