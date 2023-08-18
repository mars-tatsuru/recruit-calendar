<script setup lang="ts">
  /***************************************************************************
   * 参考 : https://www.y-hakopro.com/entry/google_oauth_api
   * 参考 : https://blog.shinonome.io/google-api/#:~:text=OAuth%202.0%E3%81%A8%E3%81%AF%E3%80%81%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9,%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AE%E4%BB%95%E7%B5%84%E3%81%BF%E3%81%A7%E3%81%99%E3%80%82
   * 参考 : https://poppingcarp.com/google-api_get_access_token/
   ***************************************************************************/
</script>

<template>
  <div class="main">
    <h1>google Auth</h1>
    <!-- <router-link to="/home"> login </router-link> -->
    <button type="button">
      <a
        href="https://accounts.google.com/o/oauth2/auth?client_id=1036301708604-phuq7ocsp9b4bbsghi1pi9ldvcujqve4.apps.googleusercontent.com&redirect_uri=http://localhost:5173/home&scope=https://www.googleapis.com/auth/adwords&access_type=offline&response_type=code"
      >
        Login
      </a>
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
