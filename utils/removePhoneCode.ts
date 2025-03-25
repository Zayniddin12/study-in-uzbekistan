export const removePhoneNumberCode = (phone: string): string => {
  const activeNum = phone.includes('+998') ? phone.split('+998')[1] : phone
  return activeNum.replaceAll(' ', '')
}
