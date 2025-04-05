<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
        <div class="card product-card h-100">
            <div class="card-body">
                <div class="float-start">
                    <p>{{ shoppingCart.user.username }}</p>
                    <p><small>{{ "Created at: " + shoppingCart.created_at }}</small></p>
                    <p><small>{{ "Updated at: " + shoppingCart.updated_at }}</small></p>
                </div>
                <span class="price float-end">{{ shoppingCart.total_price }}</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-warning" @click="editShoppingCart(shoppingCart.id)">Edit</button>&nbsp;&nbsp;
                <button class="btn btn-danger" @click="deleteShoppingCart(shoppingCart.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ShoppingCartListItem",
    props: {
        shoppingCart: Object,
    },
    methods: {
        deleteShoppingCart(id) {
            axios
                .delete("http://localhost/shoppingcarts/" + id)
                .then((result) => {
                    console.log(result);
                    this.$emit('update')
                })
                .catch((error) => console.log(error));
        },
        editShoppingCart(id) {
            this.$router.push('/editshoppingcart/' + id);
        }
    },
};
</script>