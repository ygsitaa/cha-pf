import axios from 'axios';
import { paintings as localPaintings } from '../components/utils/paintings.js';

console.log('API service loaded');
console.log('Local paintings available:', localPaintings?.length);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:1337/api'
});

// Check if Strapi is available
let strapiAvailable = true;

export const fetchPaintings = async () => {
  console.log('fetchPaintings called, strapiAvailable:', strapiAvailable);
  
  if (!strapiAvailable) {
    console.log('Using local paintings data');
    return localPaintings;
  }

  try {
    console.log('Attempting to fetch from Strapi...');
    const response = await api.get('/paintings?populate=*');
    console.log('Strapi response:', response.data);
    
    const baseURL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:1337';
    
    return response.data.data.map(item => {
      // In newer Strapi versions, data is flat (no attributes wrapper)
      const smallImgUrl = item.smallImg?.url 
        ? `${baseURL}${item.smallImg.url}`
        : null;
        
      const imagesUrls = item.images?.length > 0
        ? item.images.map(img => `${baseURL}${img.url}`)
        : [];
      
      console.log('Processed painting:', {
        id: item.id,
        name: item.name,
        smallImgUrl,
        imagesCount: imagesUrls.length
      });
      
      return {
        id: item.id,
        name: item.name || 'Untitled',
        descr: item.descr || '',
        smallImg: smallImgUrl,
        images: imagesUrls
      };
    });
  } catch (error) {
    console.warn('Strapi not available, using local data:', error.message);
    console.error('Full error:', error);
    strapiAvailable = false;
    return localPaintings;
  }
};

export const fetchAboutContent = async () => {
  console.log('fetchAboutContent called, strapiAvailable:', strapiAvailable);
  
  if (!strapiAvailable) {
    console.log('Returning fallback about content');
    return {
      content: `
        <p>Charlotte Faillat est une artiste plasticienne française née en 1995.</p>
        <p>Diplômée de l'École Nationale Supérieure d'Art de Dijon en 2019, elle développe une pratique mêlant peinture, dessin et installation.</p>
        <p>Son travail explore les notions de mémoire, d'identité et de représentation à travers des compositions abstraites et figuratives.</p>
        <p>Charlotte Faillat est une artiste plasticienne française née en 1995.</p>
        <p>Diplômée de l'École Nationale Supérieure d'Art de Dijon en 2019, elle développe une pratique mêlant peinture, dessin et installation.</p>
        <p>Son travail explore les notions de mémoire, d'identité et de représentation à travers des compositions abstraites et figuratives.</p>
        <p>Charlotte Faillat est une artiste plasticienne française née en 1995.</p>
        <p>Diplômée de l'École Nationale Supérieure d'Art de Dijon en 2019, elle développe une pratique mêlant peinture, dessin et installation.</p>
        <p>Son travail explore les notions de mémoire, d'identité et de représentation à travers des compositions abstraites et figuratives.</p>
      `
    };
  }

  try {
    console.log('Attempting to fetch about from Strapi...');
    const response = await api.get('/about?populate=*');
    console.log('Strapi about response:', response.data);
    
    // Check if data structure has attributes wrapper or is flat
    const data = response.data.data.attributes || response.data.data;
    
    return {
      content: data.content || ''
    };
  } catch (error) {
    console.warn('Strapi not available, using default about content:', error.message);
    strapiAvailable = false;
    return {
      content: `
        <p>Charlotte Faillat est une artiste plasticienne française née en 1995.</p>
        <p>Diplômée de l'École Nationale Supérieure d'Art de Dijon en 2019, elle développe une pratique mêlant peinture, dessin et installation.</p>
        <p>Son travail explore les notions de mémoire, d'identité et de représentation à travers des compositions abstraites et figuratives.</p>
      `
    };
  }
};

export const fetchContactInfo = async () => {
  console.log('fetchContactInfo called, strapiAvailable:', strapiAvailable);
  
  if (!strapiAvailable) {
    console.log('Returning fallback contact info');
    return {
      phone: '+33 6 12 34 56 78',
      smart: 'charlotte.faillat@example.com',
      poil: 'Instagram: @charlotte.faillat'
    };
  }

  try {
    console.log('Attempting to fetch contact from Strapi...');
    const response = await api.get('/contact?populate=*');
    console.log('Strapi contact response:', response.data);
    
    // Check if data structure has attributes wrapper or is flat
    const data = response.data.data.attributes || response.data.data;
    
    return {
      phone: data.phone || '',
      smart: data.smart || '',
      poil: data.poil || ''
    };
  } catch (error) {
    console.warn('Strapi not available, using default contact info:', error.message);
    strapiAvailable = false;
    return {
      phone: '+33 6 12 34 56 78',
      smart: 'charlotte.faillat@example.com',
      poil: 'Instagram: @charlotte.faillat'
    };
  }
};