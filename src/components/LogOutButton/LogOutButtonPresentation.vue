<script setup lang="ts">
import type { LogoutButtonPresentationEmits } from './LogOutButtonPresentation.types';

const emit = defineEmits<LogoutButtonPresentationEmits>();
</script>
<template>
  <provet-button
    data-testid="logout-button"
    variant="primary"
    @click="emit('click')"
  >
    <provet-icon
      slot="start"
      name="interface-logout"
    ></provet-icon>
    Logout
  </provet-button>
</template>
