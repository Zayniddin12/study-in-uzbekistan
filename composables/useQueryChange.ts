export default async function useUpdateRouteQuery(
  key: string,
  value: string | undefined
) {
  const router = useRouter()
  const routeQuery = { ...router.currentRoute.value.query }

  if (!value) {
    delete routeQuery[key]
  } else {
    routeQuery[key] = value
  }

  await router.replace({ query: routeQuery })
}
