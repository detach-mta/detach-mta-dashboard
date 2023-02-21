export function round(num: number, fractionDigits = 2): number {
  return Number(num.toFixed(fractionDigits));
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function parseToPlural(str: string, count: number) {
  return count >= 2 ? str + "s" : str;
}

export function fromOToMo(octet: number) {
  const mo = 1000000;
  return octet / mo;
}
