<template>
    <div class="projects-section mt-5">
        <div class="row mt-5">
            <div class="col-lg-4 col-md-6 mb-4" v-for="project in projects" :key="project.id">
                <div class="card project-card">
                    <img :src="project.image" class="card-img-top" :alt="project.title">
                    <div class="card-img-overlay project-overlay">
                        <h5 class="card-title text-white">{{ project.title }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Projects',
    data() {
        return {
            projects: [
                { id: 1, title: 'Equipped with microphone', image: '/1microphone1.png' },
                { id: 2, title: 'Latest Technology', image: ' /1latesttech.jpg' },
                { id: 3, title: 'Equipped with speaker', image: ' /1speaker1.png' },
                { id: 4, title: 'Contact Details', image: '/1contactdetails2.png' },
                { id: 5, title: 'Outdoor Projects', image: '/1outdoor1.png' },
                { id: 6, title: 'Benefits', image: '/1benefits1.png' }
            ]
        };
    }
};
</script>

<style scoped>
.project-card {
    position: relative;
    overflow: hidden;
}

.card-img-top {
    width: 410px;
    height: 400px;
    object-fit: cover;
}

.card-img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
}

.project-card:hover .card-img-overlay {
    opacity: 1;
}
</style>