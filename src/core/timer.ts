/* jshint browser: true */
/* global setTimeout */

export async function sleep(millis: number): Promise<number> {
  return new Promise((resolve) => setTimeout(resolve, millis))
}
