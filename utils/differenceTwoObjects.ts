import has from 'lodash/has'

import type { IProfileFeatures, IUser } from '~/types/profile'

export const differTwoObject = (
  obj1: IUser,
  obj2: IProfileFeatures
): IProfileFeatures => {
  const differObj = {} as IProfileFeatures

  for (const key in obj1) {
    if (obj1[key] !== obj2[key] && has(obj2, key) && obj2[key] !== '') {
      differObj[key] = obj2[key]
    }
  }

  return differObj
}
