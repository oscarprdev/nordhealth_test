<script setup lang="ts">
onBeforeMount(async () => {
  await useCustomAuthMiddleware('/signin');
});
</script>

<template>
  <main class="n-stack-horizontal">
    <SignInForm />
  </main>
</template>
