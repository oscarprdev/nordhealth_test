<script setup lang="ts">
const route = useRoute();

onBeforeMount(async () => {
  await useCustomAuthMiddleware('/dashboard', route.params.email as string);
});
</script>
<template>
  <NuxtLayout
    name="dashboard"
    :email="route.params.email"
  >
    <provet-card
      padding="m"
      class="dashboard-card"
    >
      <p>
        Assesment done by:
        <strong> Oscar Perez Romero </strong>
      </p>
      <p>
        Email:
        <strong> vlcoscar8@gmail.com </strong>
      </p>
      <p>
        GitHub:
        <strong>
          <a
            href="https://github.com/oscarprdev"
            target="_blank"
          >
            https://github.com/oscarprdev
          </a>
        </strong>
      </p>
    </provet-card>
  </NuxtLayout>
</template>

<style>
.dashboard-card {
  width: 90%;
  max-width: 30rem;
  margin: var(--n-space-xl) auto;
  row-gap: var(--n-space-xl);
}
</style>
