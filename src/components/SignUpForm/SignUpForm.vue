<script setup lang="ts">
import SignUpFormPresentation from './SignUpFormPresentation.vue';
import { LocalStorageAuthRepository } from '~/features/auth/infrastructure/LocalStorageAuthRepository';
import useSignUpForm from './composables/useSignUpForm';

const repository = new LocalStorageAuthRepository();
const { formState, handleChange, handleSubmit } = useSignUpForm(repository)();
</script>

<template>
  <SignUpFormPresentation
    :form-state="formState"
    @submit="handleSubmit"
    @change="handleChange"
  />
</template>
