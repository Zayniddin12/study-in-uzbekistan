<template>
  <div class="rounded-xl p-4 bg-white transition-300 cursor-pointer">
    <div class="flex-y-center gap-3 w-full">
      <UIShimmer width="50px" height="50px" loading border-radius="50%" />
      <div class="flex flex-col justify-center gap-1 w-full">
        <UIShimmer width="100%" height="28px" loading />
        <UIShimmer width="100px" height="18px" loading />
      </div>
    </div>
    <div class="mt-3 flex-center-between">
      <UIShimmer width="150px" height="18px" loading />
      <UIShimmer width="70px" height="18px" loading />
    </div>
  </div>
</template>
