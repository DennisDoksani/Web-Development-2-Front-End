<template>
    <div class="container">
        <div v-if="product" class="card-body">
            <button class="btn btn-primary" style="z-index: 3;" @click="this.$router.push('/shop');">Go back</button>
            <h5 class="card-title mt-5">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text"><small class="text-body-secondary">Price: {{ product.price }} &euro;</small></p>
            <p class="card-text"><small class="text-body-secondary">Quantity Available: {{ product.quantity_available }}
                    pieces</small></p>
            <img :src="product.image" :alt="product.name" class="img" />
        </div>
        <div v-else>
            Loading product details...
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ProductDetails',
    props: {
        id: Number,
    },
    data() {
        return {
            product: null,
        };
    },
    created() {
        this.fetchProductDetails();
    },
    methods: {
        fetchProductDetails() {
            axios.get(`http://localhost/products/${this.$route.params.id}`)
                .then(response => {
                    this.product = response.data;
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                    // Handle error or show a message
                });
        },
    },
};
</script>

<style scoped>
.product-details {
    max-width: 800px;
    margin: 0 auto;
}

.img {
    width: 30%;
}
</style>