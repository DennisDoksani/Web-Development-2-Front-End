<template>
    <div v-if="cartItem && cartItem.product_name" class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
        <div class="card product-card h-100">
            <div class="card-body">
                <img :src="cartItem.product_image" :alt="cartItem.product_name" />
                <div class="float-start">
                    <p>{{ cartItem.product_name }}</p>
                    <p><small>Quantity: {{ cartItem.quantity }}</small></p>
                    <div class="quantity-selector my-2" style="display: flex;">
                        <button class="btn btn-sm btn-secondary" @click="decrementQuantity">-</button>
                        <input type="number" v-model.number="displayQuantity"
                            class="form-control quantity-input w-25" />
                        <button class="btn btn-sm btn-secondary" @click="incrementQuantity">+</button>
                    </div>
                </div>
                <span class="price float-end">{{ cartItem.product_price }} &euro;</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-light" @click="updateCartItem">Update</button>&nbsp;&nbsp;
                <button class="btn btn-secondary" @click="deleteCartItem">Remove</button>
            </div>
        </div>
    </div>
    <div v-else>
        Loading product details...
    </div>
</template>

<script>
import { useCartStore } from '../../cart-store';
import axios from 'axios';

export default {
    name: "CartItem",
    props: {
        cartItem: Object
    },
    data() {
        return {
            displayQuantity: this.cartItem.quantity
        };
    },
    methods: {
        updateCartItem() {
            axios.put(`http://localhost/cartitems/${this.cartItem.id}`, { quantity: this.displayQuantity })
                .then(() => {
                    this.cartItem.quantity = this.displayQuantity;
                    const cartStore = useCartStore();
                    cartStore.fetchItemCount();
                })
                .catch(error => console.error('Error updating cart item:', error));

        },
        deleteCartItem() {
            axios.delete(`http://localhost/cartitems/${this.cartItem.id}`)
                .then(() => {
                    this.$emit('cart-item-deleted', this.cartItem.id);
                    const cartStore = useCartStore();
                    cartStore.decrementItemCount();
                    // cartStore.fetchItemCount();
                })
                .catch(error => console.error('Error deleting cart item:', error));
        },
        incrementQuantity() {
            this.displayQuantity++;
        },
        decrementQuantity() {
            if (this.displayQuantity > 1) {
                this.displayQuantity--;
            }
        }
    }
};
</script>

<style scoped>
.quantity-selector .quantity-input {
    text-align: center;
}
</style>
