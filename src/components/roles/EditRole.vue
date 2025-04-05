<template>
    <section>
        <div class="container">
            <form ref="form">
                <h2 class="mt-3 mt-lg-5">Edit a role</h2>
                <h5 class="mb-4"></h5>

                <div class="input-group mb-3">
                    <span class="input-group-text">Name</span>
                    <input type="text" class="form-control" v-model="role.name" />
                </div>

                <div class="input-group mt-4">
                    <button type="button" class="btn btn-primary" @click="updateRole">
                        Save changes
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
    name: "EditRole",
    props: {
        id: Number,
    },
    data() {
        return {
            role: {
                id: 0,
                name: "",
            },
        };
    },
    methods: {
        updateRole() {
            axios
                .put("http://localhost/roles/" + this.role.id, this.role)
                .then((res) => {
                    console.log(res.data);
                    this.$refs.form.reset();
                    this.$router.push("/roles");
                })
                .catch((error) => console.log(error));
        },
    },
    mounted() {
        axios
            .get("http://localhost/roles/" + this.id)
            .then((result) => {
                this.role = result.data;
            })
            .catch((error) => console.log(error));
    },
};
</script>