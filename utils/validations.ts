export const validateUrlOrTelegramOrWhatsapp = (value: string) => {
  if (value) {
    return (
      value?.includes('https://') ||
      value?.includes('http://') ||
      value?.includes('t.me/') ||
      value?.includes('wa.me/')
    )
  }
  return true
}

export const validatePhoneNumber = (value: string) => {
  const regex =
    /^\+998([- ])?(90|91|93|94|95|98|99|88|33|97|71|77|78|70)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/

  return regex.test(value)
}
