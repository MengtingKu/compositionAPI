<template>
  <header>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/easy">OrderDrink-Easy</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/normal">OrderDrink</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/viewpoint">ViewPoint</RouterLink>
      </li>
    </ul>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
