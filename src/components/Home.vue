<template>
  <section>
    <div class="hero-section">
      <img
        src="https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        class="img-fluid hero-image">
      <div class="container">
        <h2>Welcome to Our Security Services</h2>
        <div class="intro">
          <p>What are the most appreciated features of Ragabanhs Technology brand cameras? 🤔<br>
            To begin with, the most appreciated aspect was QUALITY, everything Ragabanhs Technology means was built on this
            principle.</p>

          <p> In addition to this basic criterion, cameras have implemented a lot of functionality, such as: <br>
            ✔️Microphone (allows users to capture sounds from the environment) <br>
            ✔️Speaker (allows users to communicate with personnel in the supervised area)<br>
            ✔️Color (captures color images in low light or night often uses specific technologies to maintain color
            quality)<br>
            ✔️Light (it has several functions by which, upon detection of movement, the camera light turns on or can be
            programmed)<br>
            ✔️AI detection (detection of suspicious movements of people and cars in the surveillance area of ​​the
            camera, the application will send a notification in this regard to always be informed and in control)<br>
            ✔️Data security (the protection of data stored and transmitted is done by adequate security to prevent
            unauthorized access)
          </p>
          <p>
            These are just some of the features that have made our security cameras appreciated by our customers 🤗. We
            pride ourselves on providing innovative and reliable solutions for your safety &#10084;
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div id="projects">
        <Projects />
      </div>
      <div id="ourservices">
        <OurServices />
      </div>
      <div id="aboutus">
        <AboutUs />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  </section>
</template>

<script>
import Projects from "./Projects.vue";
import OurServices from "./OurServices.vue";
import AboutUs from "./AboutUs.vue";
import Contact from "./Contact.vue";

export default {
  name: 'Home',
  components: {
    Projects,
    OurServices,
    AboutUs,
    Contact
  }
};
</script>

<style scoped>
.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: 0% 20%;
  position: relative;
  top: -25px;
}

.intro {
  display: flex;
  flex-direction: column;

}
</style>
