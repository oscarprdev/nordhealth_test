<script setup lang="ts">
import { LocalStorageAuthRepository } from '~/features/auth/infrastructure/LocalStorageAuthRepository';
import { isErrorResponse } from '~/features/shared/domain/Response';
import LogOutButtonPresentation from './LogOutButtonPresentation.vue';
import { LogoutUsecase } from '~/features/auth/application/logout/LogoutUsecase';

const localStorageRepository = new LocalStorageAuthRepository();
const useCase = new LogoutUsecase(localStorageRepository);

const props = defineProps<{
  email: string;
}>();

const handleClick = async () => {
  const response = await useCase.execute(props.email);

  if (isErrorResponse(response)) {
    console.error(response.error);
  }

  navigateTo('/signin');
};
</script>

<template>
  <LogOutButtonPresentation @click="handleClick" />
</template>
