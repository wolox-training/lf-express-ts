export function isAlphabetic(value: string): boolean {
  const regex: RegExp = /^[a-zA-Z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

  return regex.test(value);
}

export function isAlphaNumeric(value: string): boolean {
  const regex: RegExp = /^[a-zA-Z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]+$/;

  return regex.test(value);
}

export function isEmailValid(email: string): boolean {
  const regex: RegExp = /(@wolox.com)\r?$/;
  return regex.test(email);
}
export default { isAlphabetic, isAlphaNumeric, isEmailValid };
