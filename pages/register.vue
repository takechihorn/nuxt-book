<template>
  <div class="max-w-md mx-auto pt-6">
    <div>
      <h1 class="mb-3">Register</h1>
      <div>
        <form v-if="step == steps.register" @submit.prevent="register">
          <input
            v-model="registerForm.email"
            type="email"
            Placeholder="Email"
            class="form-control"
          />
          <input
            v-model="registerForm.password"
            placeholder="Password"
            type="password"
            class="form-control"
          />
          <button type="submit" class="btn--green">Register</button>
        </form>
        <form v-else @submit.prevent="confirm">
          <input
            v-model="confirmForm.email"
            type="email"
            Placeholder="Email"
            class="form-control"
          />
          <input
            v-model="confirmForm.code"
            placeholder="Code"
            type="code"
            class="form-control"
          />
          <button type="submit" class="btn btn--green">Confirm</button>
        </form>
        <div class="text-red-600">{{ this.error.message }}</div>
        <nuxt-link to="/login">Have an account? Login</nuxt-link>
      </div>
      <div>
        You're logged in - go you!
      </div>
    </div>
  </div>
</template>

<script>
const steps = {
  register: "REGISTER",
  confirm: "CONFIRM"
};
export default {
  mounted() {
    console.log(this.error.message);
  },
  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      email: "",
      password: "",
      errors: []
    },
    confirmForm: {
      email: "",
      code: ""
    }
  }),
  methods: {
    async register() {
      try {
        await this.$store.dispatch("auth/register", this.registerForm);
        this.confirmForm.email = this.registerForm.email;
        this.step = this.steps.confirm;
      } catch (error) {
        console.log({ error });
      }
    },
    async confirm() {
      try {
        await this.$store.dispatch(
          "auth/confirmRegistration",
          this.confirmForm
        );
        await this.$store.dispatch("auth/login", this.registerForm);
        this.$router.push("/");
      } catch (error) {
        console.log({ error });
      }
    }
  }
};
</script>

<style>
</style>

