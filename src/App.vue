<template>
  <div id="app"></div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("RefreshUser");
    await this.$store.dispatch("RefreshBalance");
    await this.$store.dispatch("RefreshContract");
    await this.$store.dispatch("LoadProducts", this);
  }
};
</script>

