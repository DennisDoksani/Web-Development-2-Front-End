<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Categories</h2>
            <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createcategory');">
                Add category
            </button>
            <div class="row mt-3">
                <category-list-item v-for="category in categories" :key="category.id" :category="category"
                    @update="update" />
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import CategoryListItem from "./CategoryListItem.vue";

export default {
    name: "CategoryList",
    components: {
        CategoryListItem,
    },
    data() {
        return {
            categories: [],
        };
    },
    mounted() {
        this.update();
    },
    methods: {
        update() {
            axios
                .get("http://localhost/categories")
                .then((result) => {
                    this.categories = result.data;
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>