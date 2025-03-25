import type { ResultArray, TGlobalSearch } from '~/types/search'

// Extracting the required properties and creating the desired array
// Function to reformat category name with spaces instead of underscores
const formatCategoryName = (categoryName: string): string => {
  const words = categoryName.split('_')
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return capitalizedWords.join(' ') // Use space instead of underscore
}

// Extracting the required properties and creating the desired array

export const useGlobalSearch = (exampleObject: TGlobalSearch): ResultArray => {
  return Object.keys(exampleObject).flatMap((key) => {
    const categoryName = formatCategoryName(key)

    const items = exampleObject[key].map((item: Record<string, any>) => {
      const itemId = item.id
      const itemTitle = (
        item.name ??
        item.title ??
        item.question ??
        'No Title'
      ).replace('.', '') // Remove dots
      const categorySlug = categoryName.toLowerCase().replace(' ', '-') // Convert category_name to lowercase and replace space with dash
      let itemSlug

      if (categoryName.toLowerCase() === 'universities') {
        itemSlug = `/${categorySlug}/${itemId}/programs`
      } else if (categoryName.toLowerCase() === 'news') {
        itemSlug = `/${categorySlug}/${itemId}`
      } else if (categoryName.toLowerCase() === 'olympiads') {
        itemSlug = `/${item.more_info_link}`
      } else if (categoryName.toLowerCase() === 'university directions') {
        itemSlug = `/programs?direction=${itemId}`
      } else if (categoryName.toLowerCase() === 'programs') {
        const universityId = exampleObject.universities[0]?.id || 0 // Assuming the first university id
        itemSlug = `/${categorySlug}/${universityId}/program/${itemId}`
      } else if (categoryName.toLowerCase() === 'faqs') {
        itemSlug = '/'
      } else {
        itemSlug = `/${categorySlug}/${itemId}`
      }

      return {
        id: itemId,
        title: itemTitle,
        categoryName,
        slug: itemSlug,
        originalCategoryName: key,
      }
    })

    return items
  })
}
