<template>
  <main>
    <router-view />
  </main>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useRouter } from 'vue-router';

const router = useRouter();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('✅ Logged in as:', user.email);
    router.push('/dashboard');
  } else {
    console.log('👋 User logged out');
    router.push('/');
  }
});
</script>
