<template>
    <section>
        <div class="container">
            <form ref="form">
                <h2 class="mt-3 mt-lg-5">Edit a order</h2>
                <h5 class="mb-4"></h5>

                <div class="input-group mb-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Current Status</span>
                        <select class="form-select" v-model="order.status">
                            <option value="ordered">Ordered</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                <div class="input-group mt-4">
                    <button type="button" class="btn btn-primary" @click="updateOrder">
                        Save changes
                    </button>
                    <button type="button" class="btn btn-danger" @click="this.$router.push('/orders')">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "EditOrder",
    props: {
        id: Number,
    },
    data() {
        return {
            order: {
                id: 0,
                status: "",
            },
        };
    },
    methods: {
        updateOrder() {
            axios
                .put("http://localhost/orders/" + this.order.id, this.order)
                .then((res) => {
                    console.log(res.data);
                    this.$refs.form.reset();
                    this.$router.push("/orders");
                })
                .catch((error) => console.log(error));
        },
    },
    mounted() {
        axios
            .get("http://localhost/orders/" + this.id)
            .then((result) => {
                this.order = result.data;
            })
            .catch((error) => console.log(error));
    },
};
</script>