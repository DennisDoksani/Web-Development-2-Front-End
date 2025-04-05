<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Shopping Cart</h2>
            <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/shop');">
                Add more products
            </button>
            <div class="row mt-3">
                <cart-item v-for="cartItem in cartItems" :key="cartItem.id" :cartItem="cartItem"
                    @update-cart="fetchCartItems" @cart-item-deleted="handleItemDeletion" />
            </div>
            <button type="button" class="btn btn-primary mt-3" :disabled="isCartEmpty" @click="proceedToCheckout">
                Proceed to checkout
            </button>
            <h3 class="mt-3 mt-lg-5">Total Price: {{ totalPrice }} €</h3>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import CartItem from './CartItem.vue';

export default {
    name: 'CartView',
    components: {
        CartItem
    },
    data() {
        return {
            cartItems: [],
            userId: localStorage.getItem('id')
        };
    },
    created() {
        this.fetchCartItems();
    },
    computed: {
        totalPrice() {
            return this.cartItems.reduce((sum, item) => sum + (parseFloat(item.product_price) * item.quantity), 0).toFixed(2);
        },
        isCartEmpty() {
            return this.cartItems.length === 0;
        }
    },
    methods: {
        fetchCartItems() {
            if (this.userId) {
                axios.get(`http://localhost/shoppingcarts/user_${this.userId}`)
                    .then(response => {
                        this.cartItems = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching cart items:', error);
                        if (error.response && error.response.status === 404) {
                            this.cartItems = [];
                        }
                    });
            } else {
                console.error('User ID not found.');
            }
        },
        handleItemDeletion(itemId) {
            this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        },
        proceedToCheckout() {
            const cartItems = encodeURIComponent(JSON.stringify(this.cartItems));
            const totalPrice = encodeURIComponent(this.totalPrice);
            const url = `/checkout?cartItems=${cartItems}&totalPrice=${totalPrice}`;
            this.$router.push(url);
        }
    }
};
</script>