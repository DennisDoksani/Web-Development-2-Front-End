<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
        <div class="card product-card h-100">
            <div class="card-body">
                <div class="float-start">
                    <p>{{ user.username }}</p>
                    <p>{{ user.email }}</p>
                    <p><small>{{ user.role.name }}</small></p>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-warning" @click="editUser(user.id)">Edit</button>&nbsp;&nbsp;
                <button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "UserListItem",
    props: {
        user: Object,
    },
    methods: {
        deleteUser(id) {
            axios
                .delete("http://localhost/users/" + id)
                .then((result) => {
                    console.log(result);
                    this.$emit('update')
                })
                .catch((error) => console.log(error));
        },
        editUser(id) {
            this.$router.push('/edituser/' + id);
        }
    },
};
</script>