<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Orders</h2>
            <div class="row mt-3">
                <order-list-item v-for="order in orders" :key="order.id" :order="order" @update="fetchOrders" />
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import OrderListItem from "./OrderListItem.vue";

export default {
    name: "OrderList",
    components: {
        OrderListItem,
    },
    data() {
        return {
            orders: [],
        };
    },
    mounted() {
        this.fetchOrders();
    },
    methods: {
        fetchOrders() {
            axios.get("http://localhost/orders")
                .then((response) => {
                    this.orders = response.data;
                })
                .catch((error) => {
                    console.error('Error fetching orders:', error);
                });
        },
    },
};
</script>

<style></style>
