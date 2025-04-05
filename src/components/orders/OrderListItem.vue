<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
        <div class="card order-card h-100">
            <div class="card-body">
                <div class="float-start">
                    <p>Order ID: {{ order.id }}</p>
                    <p>User ID: {{ order.user_id }}</p>
                    <p><small>Total: €{{ order.total }}</small></p>
                    <p><small>Order Status: {{ order.status }}</small></p>
                    <p><small>Order Date: {{ new Date(order.created_at).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                            }) }}</small></p>
                    <div class="box">
                        <div v-for="item in order.items" :key="item.id" class="item-list mb-2">
                            Product ID: {{ item.product_id }}
                            Quantity: {{ item.quantity }}
                            Price: € {{ item.price }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-warning" @click="editOrder(order.id)">Edit</button>&nbsp;&nbsp;
                <button class="btn btn-danger" @click="deleteOrder(order.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "OrderListItem",
    props: {
        order: Object,
    },
    methods: {
        deleteOrder(id) {
            axios
                .delete("http://localhost/orders/" + id)
                .then((result) => {
                    console.log(result);
                    this.$emit('update')
                })
                .catch((error) => console.log(error));
        },
        editOrder(id) {
            this.$router.push('/editorder/' + id);
        }
    }
};
</script>

<style>
.box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.item-list {
    border: 1px solid green;
    width: 120px;
    height: 80px;
}
</style>
