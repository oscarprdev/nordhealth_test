<script setup lang="ts">
import { LocalStorageAuthRepository } from '~/features/auth/infrastructure/LocalStorageAuthRepository';
import SignInFormPresentation from './SignInFormPresentation.vue';
import useSignInForm from './composables/useSignInForm';

const repository = new LocalStorageAuthRepository();
const { formState, handleChange, handleSubmit } = useSignInForm(repository)();
</script>

<template>
  <SignInFormPresentation
    :form-state="formState"
    @submit="handleSubmit"
    @change="handleChange"
  />
</template>
