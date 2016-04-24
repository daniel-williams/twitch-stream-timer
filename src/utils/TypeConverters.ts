export let booleanConverter = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  } else if (typeof value === 'boolean') {
    return value;
  }
  return value.toString() === 'true';
}
export let numberConverter = (value: any) => {
  if (value === null || value === undefined || typeof value === 'number') {
    return value;
  }
  return parseFloat(value.toString());
}