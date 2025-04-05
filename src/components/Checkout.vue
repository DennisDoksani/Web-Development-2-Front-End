<template>
    <div class="checkout container mt-5">
        <h1 class="text-center mb-4">Checkout</h1>
        <p class="total-price mb-4 px-5"><strong>Total Price:</strong> €{{ totalPrice }}</p>
        <div class="row">
            <div class="col-md-6 px-5">
                <h2 class="mb-3 text-center">Shopping Cart</h2>
                <div class="cart-items mb-4">
                    <div v-for="item in cartItems" :key="item.id" class="cart-item card mb-3 shadow-sm">
                        <div class="card-body d-flex align-items-center">
                            <img :src="item.product_image || 'https://via.placeholder.com/100'" alt="Product Image"
                                class="img-thumbnail me-3" style="width: 100px; height: 100px; object-fit: cover;">
                            <div>
                                <h5 class="card-title">{{ item.product_name }}</h5>
                                <p class="card-text">Quantity: {{ item.quantity }}</p>
                                <p class="card-text">Price: €{{ item.product_price }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 px-5">
                <h2 class="mb-3 text-center">Shipping Information</h2>
                <form @submit.prevent="saveShippingInfo" class="card p-4 shadow-sm">
                    <div class="mb-3">
                        <label for="name" class="form-label">Full Name</label>
                        <input type="text" id="name" v-model="shippingInfo.full_name" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Address</label>
                        <input type="text" id="address" v-model="shippingInfo.address" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="city" class="form-label">City</label>
                        <input type="text" id="city" v-model="shippingInfo.city" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="postalCode" class="form-label">Postal Code</label>
                        <input type="text" id="postalCode" v-model="shippingInfo.postal_code" class="form-control"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="country" class="form-label">Country</label>
                        <input type="text" id="country" v-model="shippingInfo.country" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone Number</label>
                        <input type="tel" id="phone" v-model="shippingInfo.phone_number" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Save and Place Order</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useCartStore } from '../cart-store';
const userEmail = localStorage.getItem('email');
const userId = localStorage.getItem('id');

export default {
    name: 'Checkout',
    data() {
        return {
            cartItems: [],
            totalPrice: 0,
            shippingInfo: {
                user_id: userId,
                full_name: '',
                address: '',
                city: '',
                postal_code: '',
                country: '',
                email: userEmail,
                phone_number: ''
            },
            existingShippingInfo: false
        };
    },
    created() {
        this.initData();
        this.fetchShippingInfo();
    },
    methods: {
        initData() {
            if (this.$route.query.cartItems) {
                try {
                    this.cartItems = JSON.parse(decodeURIComponent(this.$route.query.cartItems));
                    this.totalPrice = this.$route.query.totalPrice;
                } catch (error) {
                    console.error('Error parsing cart items:', error);
                }
            }
        },
        async fetchShippingInfo() {
            try {
                const userId = localStorage.getItem('id');
                const response = await axios.get(`http://localhost/shippinginfo/user/${userId}`);
                if (response.data) {
                    this.shippingInfo = response.data;
                    this.existingShippingInfo = true;
                }
            } catch (error) {
                console.error('Error fetching shipping info:', error);
            }
        },
        async saveShippingInfo() {
            try {
                const userId = localStorage.getItem('id');
                if (this.existingShippingInfo) {
                    await axios.put(`http://localhost/shippinginfo/${userId}`, this.shippingInfo);
                } else {
                    await axios.post('http://localhost/shippinginfo', { ...this.shippingInfo });
                    this.existingShippingInfo = true;
                }
                this.placeOrder();
            } catch (error) {
                console.error('Error saving shipping info:', error);
                alert('There was an error saving your shipping information.');
            }
        },
        async placeOrder() {
            try {
                const orderDetails = {
                    user_id: localStorage.getItem('id'),
                    total: this.totalPrice,
                    status: 'ordered',
                    shippingInfo: this.shippingInfo,
                    items: this.cartItems
                };

                const response = await axios.post('http://localhost/orders', orderDetails);

                if (response.status === 201) {
                    const orderId = response.data.id;

                    let allItemsAdded = true;
                    for (let item of this.cartItems) {
                        const itemResponse = await axios.post('http://localhost/orders/items', {
                            order_id: orderId,
                            product_id: item.product_id,
                            quantity: item.quantity,
                            price: item.product_price
                        });
                        if (itemResponse.status !== 201) {
                            allItemsAdded = false;
                            console.error('Failed to add item:', itemResponse.data);
                            break;
                        }
                    }
                    if (allItemsAdded) {
                        const deleteCartResponse = await axios.delete(`http://localhost/shoppingcarts/${this.cartItems[0].cart_id}`);
                        if (deleteCartResponse.status === 204) {
                            const cartStore = useCartStore();
                            cartStore.clearCart();
                            this.cartItems = [];
                            this.$router.push('/placedorder/' + orderId);
                            alert('Your order has been placed successfully and the cart has been cleared!');
                        } else {
                            console.error('Failed to clear cart:', deleteCartResponse.data);
                            alert('Order placed, but failed to clear the cart.');
                        }
                    } else {
                        alert('Order placed, but not all items could be added.');
                    }
                } else {
                    console.error('Error placing order:', response.data);
                    alert(`Failed to place order: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Order Placement Error:', error);
                if (error.response) {
                    console.error(`Error Details: `, error.response.data);
                }
                alert('There was an error placing your order.');
            }
        }
    }
};
</script>

<style scoped>
.checkout {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.cart-items .cart-item {
    border: none;
    border-radius: 10px;
}

.cart-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 15px;
}

.total-price {
    font-size: 1.5rem;
}

form .mb-3 {
    margin-bottom: 1rem;
}
</style>
