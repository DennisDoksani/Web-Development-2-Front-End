<template>
  <div class="app-container d-flex flex-column min-vh-100">
    <Navigation />
    <div class="flex-grow-1">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from './auth-store';
export default {
  name: "App",
  components: {
    Navigation,
    Footer
  },
  created() {
    const authStore = useAuthStore();
    authStore.autoLogin();
  }
};
</script>

<style></style>
