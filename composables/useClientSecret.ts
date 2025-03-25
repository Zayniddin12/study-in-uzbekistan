export const useClientSecret = () => {
  const secretId = useCookie('client_secret_id')
  function generateRandomHexString(length: number) {
    if (process.client) {
      const byteCount = Math.ceil(length / 2) // 2 hex characters per byte
      const randomBytes = new Uint8Array(byteCount)
      crypto.getRandomValues(randomBytes)
      let hexString = ''
      for (let i = 0; i < byteCount; i++) {
        hexString += randomBytes[i].toString(16).padStart(2, '0')
      }
      return hexString.substr(0, length)
    } // truncate to the desired length
  }
  // Example usage: generate a 16-character long random hex string
  const randomHex = generateRandomHexString(16)
  function init() {
    if (!secretId.value) {
      secretId.value = randomHex
    }
  }
  return { randomHex, init, secretId }
}
