<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
        <div class="card product-card h-100">
            <div class="card-body">
                <div class="float-start">
                    <p>{{ role.name }}</p>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-warning" @click="editRole(role.id)">Edit</button>&nbsp;&nbsp;
                <button class="btn btn-danger" @click="deleteRole(role.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "RoleListItem",
    props: {
        role: Object,
    },
    methods: {
        deleteRole(id) {
            axios
                .delete("http://localhost/roles/" + id)
                .then((result) => {
                    console.log(result);
                    this.$emit('update')
                })
                .catch((error) => console.log(error));
        },
        editRole(id) {
            this.$router.push('/editrole/' + id);
        }
    },
};
</script>