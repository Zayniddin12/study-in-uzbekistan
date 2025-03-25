<template>
  <div></div>
</template>
<script setup lang="ts">
const { showToast } = useCustomToast()
const { $event } = useNuxtApp()
const route = useRoute()
const router = useRouter()
definePageMeta({
  layout: false,
})
function verifyToken() {
  useApi()
    .$post(`/common/auth/registration/verify/`, {
      body: {
        token: route.query.token,
      },
    })
    .then(() => {
      $event('open-auth', 'login')
      router.push('/')
    })
    .catch((err) => {
      showToast(err?._data?.token || 'Something went wrong', 'error')
      $event('open-auth', 'register')
      router.push('/')
    })
}

onMounted(() => {
  verifyToken()
})
</script>
