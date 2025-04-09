/**
 * @param {Number} millis
 * @returns Promise
 */
export async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}
