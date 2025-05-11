import '@provetcloud/css';
import '@provetcloud/web-components';

export default defineNuxtPlugin(() => {
  return {
    provide: { provetcloud: { client: true } },
  };
});
