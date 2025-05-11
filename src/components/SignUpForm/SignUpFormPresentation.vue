<script setup lang="ts">
import AuthPasswordInput from '../AuthPasswordInput/AuthPasswordInput.vue';
import type { SignUpFormPresentationProps, SignUpFormPresentationEmits } from './SignUpFormPresentation.types';

defineProps<SignUpFormPresentationProps>();
const emit = defineEmits<SignUpFormPresentationEmits>();
</script>

<template>
  <provet-stack
    class="auth-form"
    direction="vertical"
    align="center"
    justify-content="center"
    gap="m"
  >
    <img
      data-testid="auth-logo"
      class="auth-logo"
      alt="Provet Cloud logo"
      src="https://static-s3-eu.provetcloud.com/static/kuvat/provet_cloud_new_logo_570x80.png"
      loading="lazy"
    />
    <provet-banner
      v-if="formState.successMessage"
      data-testid="auth-success-message"
      variant="success"
    >
      {{ formState.successMessage }}
    </provet-banner>
    <provet-banner
      v-if="formState.errors.global"
      data-testid="auth-error-message"
      variant="danger"
    >
      {{ formState.errors.global }}
    </provet-banner>
    <provet-card padding="l">
      <h1
        slot="header"
        data-testid="auth-title"
      >
        Sign up
      </h1>
      <form
        data-testid="auth-form"
        @submit.prevent="emit('submit', formState)"
      >
        <provet-stack>
          <provet-input
            expand
            required
            label="Email"
            name="email"
            type="email"
            data-testid="auth-email-input"
            placeholder="user@example.com"
            :value="formState.values.email"
            :error="formState.errors.email"
            @input="emit('change', 'email', $event.target.value)"
          />
          <AuthPasswordInput
            :value="formState.values.password"
            :error="formState.errors.password"
            @input="emit('change', 'password', $event)"
          />
          <provet-toggle
            data-testid="auth-with-info-toggle"
            label="Do you want to receive ocassional product updates and announcements?"
            :checked="formState.values.withInfo"
            @change="emit('change', 'withInfo', $event.target.checked)"
          />
          <provet-button
            data-testid="auth-sign-up-button"
            :disabled="formState.isLoading"
            type="submit"
            variant="primary"
            >Sign up</provet-button
          >
        </provet-stack>
      </form>
    </provet-card>
    <provet-card
      data-testid="auth-sign-in-link"
      class="n-align-center"
    >
      Already have an account?
      <NuxtLink to="/signin"> Sign in </NuxtLink>
    </provet-card>
  </provet-stack>
</template>

<style scoped>
.auth-form {
  inline-size: 90%;
  max-inline-size: 600px;
  margin: var(--n-space-xl) auto;
  row-gap: var(--n-space-xl);
}

.auth-logo {
  max-inline-size: 15rem;
  align-self: center;
  max-width: 15rem;
}
</style>
