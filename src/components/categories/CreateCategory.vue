<template>
    <section>
        <div class="container">
            <form ref="form">
                <h2 class="mt-3 mt-lg-5">Create a category</h2>
                <h5 class="mb-4"></h5>

                <div class="input-group mb-3">
                    <span class="input-group-text">Name</span>
                    <input type="text" class="form-control" v-model="category.name" />
                </div>

                <div class="input-group mt-4">
                    <button type="button" class="btn btn-primary" @click="addCategory">
                        Create category
                    </button>
                    <button type="button" class="btn btn-danger" @click="this.$router.push('/categories')">
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
    name: "CreateCategory",
    data() {
        return {
            category: {
                name: "",
            },
        };
    },
    methods: {
        addCategory() {
            axios.post("http://localhost/categories", this.category)
                .then((res) => {
                    console.log(res.data);
                    this.$refs.form.reset();
                    this.$router.push("/categories");
                })
                .catch((error) => console.log(error));
        },
    },
}
</script>