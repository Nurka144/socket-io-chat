<template>
  <div class="user">
    <div class="description">
      <div class="name">
        {{ user.login }} ->
        {{ status }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    user: Object,
  },
  computed: {
    status() {
      return this.user.is_online ? "online" : "offline";
    },
  },
};
</script>