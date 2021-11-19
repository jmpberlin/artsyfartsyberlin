export function formatPrice(cents) {
  if (cents % 10 === 0) {
    const divided = cents / 100;
    if (divided % 1 !== 0) {
      return cents / 100 + '0 €';
    } else {
      return cents / 100 + '.00 €';
    }
  } else {
    return cents / 100 + ' €';
  }
}

export function formatDescription(string) {
  if (string.length < 15) {
    return string;
  } else {
    let splitted = string.split(' ');
    let formatted = splitted.slice(0, 5);
    formatted.push('...');
    return formatted.join(' ');
  }
}
