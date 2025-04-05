<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
        <div class="card product-card h-100">
            <div class="card-body">
                <div class="float-start">
                    <p>{{ category.name }}</p>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-warning" @click="editCategory(category.id)">Edit</button>&nbsp;&nbsp;
                <button class="btn btn-danger" @click="deleteCategory(category.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "CategoryListItem",
    props: {
        category: Object,
    },
    methods: {
        deleteCategory(id) {
            axios
                .delete("http://localhost/categories/" + id)
                .then((result) => {
                    console.log(result);
                    this.$emit('update')
                })
                .catch((error) => console.log(error));
        },
        editCategory(id) {
            this.$router.push('/editcategory/' + id);
        }
    },
};
</script>