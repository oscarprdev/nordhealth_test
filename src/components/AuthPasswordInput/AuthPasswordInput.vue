<script setup lang="ts">
import {
  type AuthPasswordInputProps,
  type AuthPasswordInputEmits,
  AUTH_PASSWORD_INPUT_TYPES,
  type AuthPasswordInputType,
} from './AuthPasswordInput.types';
import { ref } from 'vue';

defineProps<AuthPasswordInputProps>();
const emit = defineEmits<AuthPasswordInputEmits>();

const inputRef = ref<HTMLInputElement>();
const inputType = ref<AuthPasswordInputType>(AUTH_PASSWORD_INPUT_TYPES.PASSWORD);

const togglePasswordVisibility = () => {
  inputType.value =
    inputType.value === AUTH_PASSWORD_INPUT_TYPES.PASSWORD
      ? AUTH_PASSWORD_INPUT_TYPES.TEXT
      : AUTH_PASSWORD_INPUT_TYPES.PASSWORD;
};
</script>

<template>
  <provet-input
    ref="inputRef"
    data-testid="auth-password-input"
    label="Password"
    name="password"
    placeholder="••••••••"
    required
    expand
    :type="inputType"
    :value="value"
    :error="error"
    @input="emit('input', $event.target.value)"
  >
    <provet-button
      slot="end"
      type="button"
      data-testid="toggle-visibility-button"
      aria-describedby="password-tooltip"
      square
      @click="togglePasswordVisibility"
    >
      <provet-icon
        v-if="inputType === AUTH_PASSWORD_INPUT_TYPES.PASSWORD"
        name="interface-edit-on"
        data-testid="visibility-icon"
      ></provet-icon>
      <provet-icon
        v-else
        name="interface-edit-off"
        data-testid="visibility-icon"
      ></provet-icon>
    </provet-button>
  </provet-input>
  <provet-tooltip id="password-tooltip">Show / hide password</provet-tooltip>
</template>
