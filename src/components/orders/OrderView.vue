<template>
    <div class="thank-you container mt-5">
        <h1 class="text-center mb-4">Thank You for Your Order!</h1>
        <div v-if="order" class="order-summary card mb-4 shadow-sm">
            <div class="card-body">
                <h2 class="card-title">Order Summary</h2>
                <p><strong>Order ID:</strong> {{ order.id }}</p>
                <p><strong>Order Status:</strong> {{ order.status }}</p>
                <p><strong>Total:</strong> €{{ order.total }}</p>
                <p><strong>Order Date:</strong> {{ formatDate(order.created_at) }}</p>
                <p><strong>Full Name :</strong> {{ info.full_name }}</p>
                <p><strong>Address :</strong> {{ info.address }}</p>
                <p><strong>City :</strong> {{ info.city }}</p>
                <p><strong>Postal Code :</strong> {{ info.postal_code }}</p>
                <p><strong>Country :</strong> {{ info.country }}</p>
                <p><strong>Email :</strong> {{ info.email }}</p>
                <p><strong>Phone :</strong> {{ info.phone_number }}</p>
                <div>
                    <h3>Items:</h3>
                    <div v-for="item in order.items" :key="item.id"
                        class="order-item border rounded mb-3 p-3 d-flex align-items-center">
                        <img :src="item.product?.image || 'https://via.placeholder.com/100'" alt="Product Image"
                            class="img-thumbnail me-3" style="width: 100px; height: 100px; object-fit: cover;">
                        <div>
                            <p class="mb-1"><strong>Product ID:</strong> {{ item.product_id }}</p>
                            <p class="mb-1"><small>Quantity: {{ item.quantity }}</small></p>
                            <p class="mb-1"><small>Price: € {{ item.price }}</small></p>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary mt-3" @click="goToShop">Continue Shopping</button>
            </div>
        </div>
        <div v-else>
            <p>Loading order details...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'OrderView',
    data() {
        return {
            order: null,
            info: null
        };
    },
    mounted() {
        this.fetchOrderDetails();
        this.fetchShippingDetails();
    },
    methods: {
        async fetchOrderDetails() {
            const orderId = this.$route.params.id;
            if (orderId) {
                try {
                    const response = await axios.get(`http://localhost/orders/${orderId}`);
                    const order = response.data;
                    await this.populateProductDetails(order);
                    this.order = order;
                } catch (error) {
                    console.error('Error fetching order details:', error);
                }
            } else {
                console.error('Order ID not provided.');
            }
        },
        async fetchShippingDetails() {
            const userId = localStorage.getItem('id');
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost/shippinginfo/user/${userId}`);
                    const info = response.data;
                    this.info = info;
                } catch (error) {
                    console.error('Error fetching info details:', error);
                }
            } else {
                console.error('userId ID not provided.');
            }
        },
        async populateProductDetails(order) {
            for (const item of order.items) {
                try {
                    const productResponse = await axios.get(`http://localhost/products/${item.product_id}`);
                    item.product = productResponse.data;
                } catch (error) {
                    console.error(`Error fetching product details for product ID ${item.product_id}:`, error);
                }
            }
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        },
        goToShop() {
            this.$router.push('/shop');
        }
    }
};
</script>

<style scoped>
.thank-you {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.order-summary {
    border: none;
    border-radius: 10px;
}

.card-title {
    font-size: 1.5rem;
}

.order-item {
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
}

.order-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 15px;
}

.card-body p {
    margin-bottom: 0.5rem;
}
</style>