<template>
  <div class="user">
    <div class="description">
      <div class="name" @click="selectUser(user._id)">
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
  methods: {
    selectUser(id) {
      this.$emit('selectUser', id)
    }
  }
};
</script>