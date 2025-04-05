<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
        <div class="card product-card h-100">
            <div @click="goToProductDetails(product.id)" class="card-body">
                <img :src="product.image" :alt="product.title" :title="product.title" />
                <div class="float-start">
                    <p>{{ product.name }}</p>
                    <p><small>{{ product.category.name }}</small></p>
                    <p><small>{{ "Quantity available: " + product.quantity_available }}</small></p>
                </div>
                <span class="price float-end">{{ product.price }} &euro;</span>
            </div>
            <div class="quantity-selector my-2" style="display: flex; justify-content: center">
                <button class="btn btn-sm btn-secondary" @click="decrementQuantity" :disabled="isAdded">-</button>
                <input type="number" v-model.number="quantity" class="form-control quantity-input w-25 text-center"
                    :disabled="isAdded" />
                <button class="btn btn-sm btn-secondary" @click="incrementQuantity" :disabled="isAdded">+</button>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary" @click="addToCart(product.id, quantity)" :disabled="isAdded">Add to
                    cart</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useCartStore } from "../../cart-store";
import { useAuthStore } from '../../auth-store';
import axios from "axios";

export default {
    name: "ShopListItem",
    props: {
        product: Object,
    },
    data() {
        return {
            isAdded: false,
            quantity: 1
        };
    },
    methods: {
        addToCart(productId, quantity) {
            const authStore = useAuthStore();
            if (!authStore.isLoggedIn) {
                alert("You must be logged in to add items to the cart.");
                this.$router.push('/login');
                return;
            }
            axios
                .post("http://localhost/cartitems/addToCart", {
                    cart_id: 1,
                    product_id: productId,
                    quantity: quantity,
                })
                .then((result) => {
                    this.isAdded = true;
                    const cartStore = useCartStore();
                    cartStore.fetchItemCount();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        incrementQuantity() {
            if (this.quantity < this.product.quantity_available) {
                this.quantity++;
            }
        },
        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        goToProductDetails(productId) {
            this.$router.push('/products/' + productId)
                .catch(err => {
                    console.error('Routing error:', err);
                });
        }
    },
};
</script>

<style></style>
