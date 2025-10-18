export function getRandomString(greetings: string[]): string {
  return greetings[Math.floor(Math.random() * greetings.length)];
}
