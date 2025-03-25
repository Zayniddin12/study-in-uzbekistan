export const useDateFormatter = (date: Date | string) => {
  if (typeof date !== 'string') {
    const localFormat = date.toLocaleDateString()
    return localFormat.replaceAll('/', '-').split('').reverse().join('')
  }
}
