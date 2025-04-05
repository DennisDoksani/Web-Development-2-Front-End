<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Services</h2>
            <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createservice');">
                Add service
            </button>
            <div class="row mt-3">
                <service-list-item v-for="service in services" :key="service.id" :service="service" @update="update" />
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import ServiceListItem from "./ServiceListItem.vue";

export default {
    name: "ServiceList",
    components: {
        ServiceListItem,
    },
    data() {
        return {
            services: [],
        };
    },
    mounted() {
        this.update();
    },
    methods: {
        update() {
            axios
                .get("http://localhost/services")
                .then((result) => {
                    this.services = result.data;
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>

<style></style>