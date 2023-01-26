export const generateRandomString = (maxLength = 10) => {
  let text = "";
  const possible = "abcdefghijklmnopqrstuvwxyz1234567890";

  for (let i = 0; i < maxLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export function generateUsername(data: string) {
	return `${data}${generateRandomString(4)}`;
}
