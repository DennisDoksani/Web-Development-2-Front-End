<template>
    <section>
        <div class="container">
            <form ref="form">
                <h2 class="mt-3 mt-lg-5">Edit a service</h2>
                <h5 class="mb-4"></h5>

                <div class="input-group mb-3">
                    <span class="input-group-text">Name</span>
                    <input type="text" class="form-control" v-model="service.name" />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Description</span>
                    <textarea class="form-control" v-model="service.description"></textarea>
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Image URL</span>
                    <input type="text" class="form-control" v-model="service.image" />
                </div>

                <div class="input-group mt-4">
                    <button type="button" class="btn btn-primary" @click="updateService">
                        Save changes
                    </button>
                    <button type="button" class="btn btn-danger" @click="this.$router.push('/services')">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EditService',
    props: {
        id: Number,
    },
    data() {
        return {
            service: {
                name: '',
                description: '',
                image: '',
            },
        };
    },
    methods: {
        updateService() {
            axios
                .put(`http://localhost/services/` + this.service.id, this.service)
                .then((res) => {
                    console.log(res.data);
                    this.$refs.form.reset();
                    this.$router.push("/services");
                })
                .catch((error) => console.log(error));
        },
    },
    mounted() {
        axios
            .get(`http://localhost/services/` + this.id)
            .then((res) => {
                this.service = res.data;
            })
            .catch((error) => console.log(error));
    },
};
</script>