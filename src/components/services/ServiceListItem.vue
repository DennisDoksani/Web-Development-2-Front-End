<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
        <div class="card product-card h-100">
            <div class="card-body">
                <img :src="service.image" :alt="service.title" :title="service.title" />
                <div class="float-start">
                    <p>{{ service.name }}</p>
                </div>
                <span class="price float-end">{{ service.price }}</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-warning" @click="editService(service.id)">Edit</button>&nbsp;&nbsp;
                <button class="btn btn-danger" @click="deleteService(service.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ServiceListItem",
    props: {
        service: Object,
    },
    methods: {
        deleteService(id) {
            axios
                .delete("http://localhost/services/" + id)
                .then(() => {
                    this.$emit("update");
                })
                .catch((error) => console.log(error));
        },
        editService(id) {
            this.$router.push("/editservice/" + id);
        }
    },
};
</script>