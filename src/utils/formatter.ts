export function getHumanSize(sizeInBytes: number, precision: number = 2): string {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " b"
  }
  // 1048576 = 1 Mb
  if (sizeInBytes < 1048576) {
    return (sizeInBytes / 1024).toFixed(precision) + " kb"
  }

  return (sizeInBytes / 1024 / 1024).toFixed(precision) + " mb"
}
