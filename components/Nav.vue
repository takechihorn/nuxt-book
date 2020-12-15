<template>
  <div>
    <ul class="flex justify-end">
      <li class="mr-6" v-if="!this.$store.getters['auth/user']">
        <router-link to="/">
          <a class="text-blue-500 hover:text-blue-800 cursor-pointer">Login</a>
        </router-link>
      </li>
      <li class="mr-6" v-if="!this.$store.getters['auth/user']">
        <router-link to="/register">
          <a class="text-blue-500 hover:text-blue-800 cursor-pointer"
            >Sign Up</a
          >
        </router-link>
      </li>

      <li class="mr-6" v-if="this.$store.getters['auth/user']">
        <div class="font-semibold text-black-500">
          Welcome {{ $auth.email }}
        </div>
      </li>
      <li class="mr-6" v-if="this.$store.getters['auth/user']">
        <router-link to="/">
          <div class="text-blue-500 hover:text-blue-800 cursor-pointer">
            Top
          </div>
        </router-link>
      </li>
      <li class="mr-6" v-if="this.$store.getters['auth/user']">
        <router-link to="/albums">
          <div class="text-blue-500 hover:text-blue-800 cursor-pointer">
            Albums
          </div>
        </router-link>
      </li>
      <li class="mr-6" v-if="this.$store.getters['auth/user']">
        <div
          class="text-blue-500 hover:text-blue-800 cursor-pointer"
          @click="logout"
        >
          Logout
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
