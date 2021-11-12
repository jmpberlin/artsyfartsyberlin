export function formatPrice(cents) {
  if (cents % 10 === 0) {
    return cents / 100 + '.' + '00' + ' €';
  } else {
    return cents / 100 + ' €';
  }
}
