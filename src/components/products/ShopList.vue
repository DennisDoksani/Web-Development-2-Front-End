<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-3 my-5">
                    <h3>Categories</h3>
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-action"
                            :class="{ 'active': selectedCategoryId === null }" @click="filterByCategory(null)">All</li>
                        <li v-for="category in categories" :key="category.id"
                            :class="['list-group-item', 'list-group-item-action', { 'active': category.id === selectedCategoryId }]"
                            @click="filterByCategory(category.id)">
                            {{ category.name }}
                        </li>
                    </ul>
                </div>
                <div class="col-md-9">
                    <h2 class="mt-3 mt-lg-5">Shop</h2>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Search product" v-model="searchTerm">
                        <button class="btn btn-primary" @click="update">Search</button>
                    </div>
                    <div class="row mt-3">
                        <product-list-item v-for="product in products" :key="product.id" :product="product"
                            @update="update" />
                        <div class="col-12" v-if="products.length === 0 && wasSearched">
                            <h5 class="text-center">Sorry, we don't have this product. <br> Try selecting All products
                                from side panel.</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import ProductListItem from "./ShopListItem.vue";

export default {
    name: "ShopList",
    components: {
        ProductListItem,
    },
    data() {
        return {
            products: [],
            categories: [],
            searchTerm: '',
            wasSearched: false,
            selectedCategoryId: null
        };
    },
    mounted() {
        this.fetchCategories();
        this.update();
    },
    methods: {
        fetchCategories() {
            axios.get('http://localhost/categories')
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.error("Failed to fetch categories:", error);
                });
        },
        update() {
            const params = new URLSearchParams();
            this.wasSearched = true;
            if (this.searchTerm) {
                params.append('name', this.searchTerm);
            }
            if (this.selectedCategoryId) {
                params.append('category', this.selectedCategoryId);
            }
            params.append('offset', 0);
            params.append('limit', 10);
            axios
                .get(`http://localhost/products?${params.toString()}`)
                .then((result) => {
                    this.products = result.data;
                    if (this.products.length === 0) {
                        console.log("No products found for: " + this.searchTerm);
                    }
                })
                .catch((error) => console.log(error));
        },
        filterByCategory(categoryId) {
            this.selectedCategoryId = categoryId;
            this.update();
        },
    },
};
</script>

<style></style>