<template>
    <div class="about-us mt-5">
        <h1>About Us</h1>
        <p>Welcome to our company! We are dedicated to providing the best service to our customers. Learn more about our
            journey, our values, and our team below.</p>

        <section class="company-description mt-5">
            <h2>Our Story</h2>
            <p>Established on 2025-01-24, our company has been at the forefront of innovation, providing unparalleled
                solutions to
                our clients. Our mission is to make a positive impact in the industry and beyond.</p>
        </section>

        <section class="team mt-5">
            <h2>Meet Our Team</h2>
            <div class="row mt-4">
                <div class="col-md-4" v-for="member in team" :key="member.id">
                    <div class="card">
                        <img :src="member.image" class="card-img-top" :alt="member.name">
                        <div class="card-body">
                            <h5 class="card-title text-center">{{ member.name }}</h5>
                            <p class="card-text text-center">{{ member.role }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="activities mt-5">
            <h2>Our Activities</h2>
            <ul>
                <li v-for="activity in activities" :key="activity">{{ activity }}</li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    name: "AboutUs",
    data() {
        return {
            team: [
                { id: 1, name: 'John Xaralou', role: 'CEO', image: 'https://images.pexels.com/photos/4173168/pexels-photo-4173168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
                { id: 2, name: 'George Kanaloidis', role: 'CTO', image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
                { id: 3, name: 'Nikiforos Johnson', role: 'CFO', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
            ],
            activities: [
                'Construction works of utility projects for electricity and telecommunications',
                'Repair of household electronic appliances',
                'Repair of other equipment',
                'Repair of computers and peripheral equipment'
            ]
        };
    }
};
</script>

<style scoped>
.company-description,
.team,
.activities {
    margin-bottom: 40px;
}

.card {
    margin-bottom: 20px;
    padding-top: 20px;
}

.card img {
    height: 250px;
    object-fit: contain;
}

.activities ul {
    list-style-type: none;
    padding: 0;
}

.activities ul li {
    background-color: #f8f9fa;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
}
</style>