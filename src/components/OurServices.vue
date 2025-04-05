<template>
    <div class="services mt-5">
        <h1>Our Services</h1>
        <p>Discover the range of services we offer to help you achieve the results you're after. Not sure what you need,
            or what it costs? We can explain what services are right for you and tell you more about our fees. Get in
            touch below.</p>

        <section class="service-list mt-5">
            <div class="row">
                <div class="col-md-4" v-for="service in services" :key="service.id">
                    <div class="card mb-4">
                        <img :src="service.image" class="card-img-top" :alt="service.title">
                        <div class="card-body">
                            <h5 class="card-title">{{ service.name }}</h5>
                            <p class="card-text">{{ service.description.substring(800, 0) + '...' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "OurServices",
    data() {
        return {
            services: [],
        };
    },
    mounted() {
        this.fetchServices();
    },
    methods: {
        fetchServices() {
            axios
                .get("http://localhost/services")
                .then((response) => {
                    this.services = response.data;
                })
                .catch((error) => {
                    console.error("There was an error fetching the services!", error);
                });
        },
    },
};
</script>

<style scoped>
.card img {
    height: 200px;
    object-fit: cover;
}
</style>