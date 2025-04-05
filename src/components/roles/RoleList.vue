<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Roles</h2>
            <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createrole');">
                Add role
            </button>
            <div class="row mt-3">
                <role-list-item v-for="role in roles" :key="role.id" :role="role" @update="update" />
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import RoleListItem from "./RoleListItem.vue";

export default {
    name: "RoleList",
    components: {
        RoleListItem,
    },
    data() {
        return {
            roles: [],
        };
    },
    mounted() {
        this.update();
    },
    methods: {
        update() {
            axios
                .get("http://localhost/roles")
                .then((result) => {
                    this.roles = result.data;
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>