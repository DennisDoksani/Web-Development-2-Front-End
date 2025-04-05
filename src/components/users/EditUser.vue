<template>
    <section>
        <div class="container">
            <form ref="form">
                <h2 class="mt-3 mt-lg-5">Edit a user</h2>
                <h5 class="mb-4"></h5>

                <div class="input-group mb-3">
                    <span class="input-group-text">Username</span>
                    <input type="text" class="form-control" v-model="user.username" />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Password</span>
                    <input type="password" class="form-control" v-model="user.password" />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Email</span>
                    <input type="email" class="form-control" v-model="user.email" />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Role</span>
                    <select class="form-select" v-model="user.role_id">
                        <option v-for="role in roles" :key="role.id" :value="role.id">
                            {{ role.name }}
                        </option>
                    </select>
                </div>

                <div class="input-group mt-4">
                    <button type="button" class="btn btn-primary" @click="updateUser">
                        Save changes
                    </button>
                    <button type="button" class="btn btn-danger" @click="this.$router.push('/users')">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EditUser',
    props: {
        id: Number,
    },
    data() {
        return {
            user: {
                id: 0,
                username: '',
                password: '',
                email: '',
                role_id: 0,
            },
            roles: [],
        };
    },
    methods: {
        updateUser() {
            axios
                .put("http://localhost/users/" + this.user.id, this.user)
                .then((res) => {
                    console.log(res.data);
                    this.$refs.form.reset();
                    this.$router.push("/users");
                })
                .catch((error) => console.log(error));
        },
    },
    mounted() {
        axios
            .get("http://localhost/roles")
            .then((result) => {
                this.roles = result.data;
                axios
                    .get("http://localhost/users/" + this.id)
                    .then((result) => {
                        this.user = result.data;
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    },
};
</script>