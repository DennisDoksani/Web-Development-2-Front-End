<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Users</h2>
            <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createuser');">
                Add user
            </button>
            <div class="row mt-3">
                <user-list-item v-for="user in users" :key="user.id" :user="user" @update="update" />
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import UserListItem from "./UserListItem.vue";

export default {
    name: "UserList",
    components: {
        UserListItem,
    },
    data() {
        return {
            users: [],
        };
    },
    mounted() {
        this.update();
    },
    methods: {
        update() {
            axios
                .get("http://localhost/users")
                .then((result) => {
                    this.users = result.data;
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>