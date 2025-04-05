<template>
    <section>
        <div class="container">
            <form ref="form">
                <h2 class="mt-3 mt-lg-5">Edit a shopping cart</h2>
                <h5 class="mb-4"></h5>

                <div class="input-group mb-3">
                    <span class="input-group-text">Created at</span>
                    <input type="text" class="form-control" v-model="shoppingCart.created_at" />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Updated at</span>
                    <input type="text" class="form-control" v-model="shoppingCart.updated_at" />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Total Price</span>
                    <input type="number" class="form-control" v-model="shoppingCart.total_price" />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">User</span>
                    <select class="form-select" v-model="shoppingCart.user_id">
                        <option v-for="user in users" :key="user.id" :value="user.id">
                            {{ user.username }}
                        </option>
                    </select>
                </div>

                <div class="input-group mt-4">
                    <button type="button" class="btn btn-primary" @click="updateShoppingCart">
                        Save changes
                    </button>
                    <button type="button" class="btn btn-danger" @click="this.$router.push('/shoppingcarts')">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from '../../axios-auth';

export default {
    name: "EditShoppingCart",
    props: {
        id: Number,
    },
    data() {
        return {
            shoppingCart: {
                user_id: 0,
                created_at: "",
                updated_at: "",
                total_price: 0,
            },
            users: [],
        };
    },
    methods: {
        updateShoppingCart() {
            axios
                .put("http://localhost/shoppingcarts/" + this.shoppingCart.id, this.shoppingCart)
                .then((result) => {
                    console.log(result);
                    this.$refs.form.reset();
                    this.$router.push('/shoppingcarts');
                })
                .catch((error) => console.log(error));
        },
    },
    mounted() {
        axios
            .get("http://localhost/users")
            .then((result) => {
                console.log(result);
                this.users = result.data;
                axios
                    .get("http://localhost/shoppingcarts/" + this.id)
                    .then((result) => {
                        console.log(result);
                        this.shoppingCart = result.data;
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    },
};
</script>