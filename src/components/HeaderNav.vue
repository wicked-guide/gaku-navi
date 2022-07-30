<template>
  <nav>
    <router-link to="/">がくなび</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "HeaderNav",
};
</script>

<style>
nav {
  padding: 0.5rem;
  background-color: steelblue;
}

nav a {
  font-weight: bold;
  /* color: #2c3e50; */
  color: white;
  text-decoration: none;
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
