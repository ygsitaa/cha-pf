<script setup>
import { ref, onMounted } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue'; // Add this import
import { fetchContactInfo } from '../services/api';

const contactInfo = ref({
  phone: '',
  smart: '',
  poil: ''
});
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await fetchContactInfo();
    contactInfo.value = data;
  } catch (err) {
    error.value = 'Failed to load contact information';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="contact-container">
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else>
      <form class="form-flex">
          <input type="text" placeholder="Nom complet" required="required"/>
          <input type="email" placeholder="Votre email" required="required"/>
          <input type="text" placeholder="Entête" required="required"/>
          <textarea placeholder="Contenu" class="email-content" required="required"></textarea>
          <input type="submit" value="Envoyer"/>
      </form>
      <div class="important-infos">
        <p>Téléphone : {{ contactInfo.phone }}</p>
        <p class="visual-link"><a>Mentions légales</a></p>
        <br/>
        <p>SMART : {{ contactInfo.smart }} - POIL : {{ contactInfo.poil }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-flex {
    height: 90%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
}

.contact-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
}

.important-infos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.visual-link {
  cursor: pointer;
  text-decoration: underline;
}

input, textarea {
  width: 35%;
  border: none;
  /* cursor: pointer; */
  outline: none;
  font-family: 'Roboto Mono', monospace;
  font-size: 18px;
  transform: translate(0);
  /* background-image: linear-gradient(45deg, #4568DC, #B06AB3); */
  padding: 5px 40px;
  border-radius: 5px;
  box-shadow: 0 22px 44px rgba(128, 128, 128, 0.1);
  transition: box-shadow .25s;
}

input::placeholder, textarea::placeholder {
  text-align: center;
  -webkit-background-clip: text;
  /* -webkit-text-fill-color: transparent; */
  background-image: linear-gradient(45deg, #4568DC, #B06AB3); 
}

input:after, textarea:after {
  content: '';
  border-radius: 4px;
  position: absolute;
  margin: 1px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background: white;
  color: #fff;
}

input:hover, input:focus, textarea:hover, textarea:focus {
  background-image: linear-gradient(-45deg, #4568DC, #B06AB3);
  box-shadow: 0 12px 24px rgba(128, 128, 128, 0.1); 
  color: #fff;
}

input:hover::placeholder, textarea:hover::placeholder {
  background-image: linear-gradient(-45deg, #4568DC, #B06AB3); 
  color: #fff;
}

input:focus::placeholder, textarea:focus::placeholder {
  color: #fff;
}

.email-content {
    width: 35%;
    min-height: 120px;
    font-family: 'Roboto Mono', monospace;
    font-size: 18px;
    padding: 20px 40px;
    border-radius: 5px;
    box-shadow: 0 22px 44px rgba(128, 128, 128, 0.1);
    border: none;
    outline: none;
    white-space: pre-wrap;
}

@media (orientation: portrait) and (max-width: 600px) {
  input, .email-content {
    width: 65%;
  }
  .email-content {
    padding: 10px 40px;
  }
  input {
    padding: 4px 40px;
  }
  .form-flex {
    height: 70%;
    padding-top: 25px;
  }
}

@media (orientation: landscape) and (max-width: 1400px) {
  .email-content, input {
    width: 50%;
    padding: 15px 40px;
  }
}

@media (orientation: portrait) and (min-height: 1000px) and (max-width: 1400px) {
  .email-content, input {
    width: 50%;
    padding: 15px 40px;
  }
  .email-content {
    min-height: 200px;
  }
  .contact-container {
    justify-content: start;
    padding-top: 50px;
  }
}

@media (orientation: landscape) and (min-height: 1000px) and (max-width: 1400px) {
  .email-content, input {
    width: 50%;
    padding: 15px 40px;
  }
  .email-content {
    min-height: 200px;
  }
  
}
</style>