<template>
    <section>
        <div class="container">
            <form ref="form">
                <h2 class="mt-3 mt-lg-5">Create a role</h2>
                <h5 class="mb-4"></h5>

                <div class="input-group mb-3">
                    <span class="input-group-text">Name</span>
                    <input type="text" class="form-control" v-model="role.name" />
                </div>

                <div class="input-group mt-4">
                    <button type="button" class="btn btn-primary" @click="addRole">
                        Create role
                    </button>
                    <button type="button" class="btn btn-danger" @click="this.$router.push('/roles')">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "CreateRole",
    data() {
        return {
            role: {
                name: "",
            },
        };
    },
    methods: {
        addRole() {
            axios.post("http://localhost/roles", this.role)
                .then((res) => {
                    console.log(res.data);
                    this.$refs.form.reset();
                    this.$router.push("/roles");
                })
                .catch((error) => console.log(error));
        },
    },
}
</script>