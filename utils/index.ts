import 'intl-messageformat'

export function formatNumberSpace(number: number, fix = 0) {
  return new Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: fix,
  })
    .format(number)
    .replace(/,/g, ' ')
}
export function formatComma(number: number, fix = 0) {
  return Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: fix,
  })
    .format(number)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function phoneNumberFormatter(number: string) {
  const format = number
    ?.replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)
  return `+${format && format[1] ? format[1] : ''} ${
    format && format[2] ? format[2] : ''
  } ${format && format[3] ? format[3] : ''} ${
    format && format[4] ? format[4] : ''
  } ${format && format[5] ? format[5] : ''}`
}

const timeouts: Record<string, any> = {}

const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}
export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: any, timeout: number) => {
    cTimeout(key)

    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {}

      timeouts[key] = undefined
    }, timeout)
  }

  return sTimeout(key, fn, timeout)
}

export function calculateValueInRange(
  min: number,
  max: number,
  percent: number
) {
  // Ensure that percent is between 0 and 100
  percent = Math.min(100, Math.max(0, percent))

  // Calculate the range
  const range = max - min

  // Calculate the value based on the percentage
  return min + range * (percent / 100)
}

export function calculatePercentInRange(
  min: number,
  max: number,
  value: number
) {
  // Ensure that value is between min and max
  value = Math.min(max, Math.max(min, value))

  // Calculate the range
  const range = max - min

  // Calculate the percentage based on the value
  return ((value - min) / range) * 100
}

export function convertToEmbed(url: string) {
  // Match the video ID from the URL using a regular expression
  const regex =
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu\.be\/|(?:youtube(?:-nocookie)?\.com\/(?:.*(?:\/|v=))|(?:youtube.googleapis.com\/v\/)))([^&?\s]{11})/i
  let match
  if (url?.length) {
    match = url.match(regex)
  }
  // @ts-ignore
  if (match?.length) {
    return match[1]
  }
}

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
// Date.now().toString(36) + Math.random().toString(36).substr(2)
export const errorHandler = (error: {
  _data: {
    error: {
      field: string
      message: string
    }
  }[]
}) => {
  if (error?._data?.length) {
    return error?._data[0]?.error?.message
  } else {
    return null
  }
}

export const formatRichText = (text: string) => {
  return text?.replaceAll('sandbox="" ', '')
}
