<script setup lang="ts">
import LogOutButton from '~/components/LogOutButton/LogOutButton.vue';

defineProps<{
  email: string;
}>();
</script>

<template>
  <div>
    <provet-header>
      <h1 class="n-typescale-l">Nordhealth</h1>
      <provet-button-group
        slot="end"
        variant="spaced"
      >
        <LogOutButton :email="email" />
      </provet-button-group>
    </provet-header>
    <slot />
  </div>
</template>
