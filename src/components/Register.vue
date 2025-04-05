<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <form>
                        <div class="mb-3">
                            <label for="registerUsername" class="form-label">Username</label>
                            <input id="registerUsername" type="text" class="form-control" v-model="username" />
                        </div>
                        <div class="mb-3">
                            <label for="registerPassword" class="form-label">Password</label>
                            <input id="registerPassword" type="password" class="form-control" v-model="password" />
                        </div>
                        <div class="mb-3">
                            <label for="registerEmail" class="form-label">Email</label>
                            <input id="registerEmail" type="email" class="form-control" v-model="email" />
                        </div>
                        <div class="mb-3">
                            <input id="registerRole" type="hidden" class="form-control" value="2" v-model="role_id" />
                        </div>
                        <button type='button' class="btn btn-primary" @click="register()">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useAuthStore } from '../auth-store';

export default {
    name: "Register",
    data() {
        return {
            username: "",
            password: "",
            email: "",
            role_id: 2,
            errorMessage: "",
        };
    },
    methods: {
        register() {
            const store = useAuthStore();
            store.register(this.username, this.password, this.email, this.role_id)
                .then(() => {
                    this.$router.replace("/login");
                })
                .catch((error) => {
                    this.errorMessage = error;
                });
        },
    }
};
</script>

<style></style>