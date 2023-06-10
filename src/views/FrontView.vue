<template>
  <header>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/easy">點飲料(簡易版)</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/normal">點飲料(產生訂單)</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/viewpoint">景點介紹</RouterLink>
      </li>
    </ul>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
