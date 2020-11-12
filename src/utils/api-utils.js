"use strict";

import axios from 'axios';
// const axios = require('axios').default;

const urlAPI = "http://localhost:3000";

async function getMovies(path) {
   const url = new URL(path, urlAPI);
   
   try {
      const response = await axios.get(url);
      return response.data;
   } catch (error) {
      console.error(error);
      return [];
   }
};

async function deleteMovie(path) { 
   const url = new URL(path, urlAPI);

   try {
      await axios.delete(url);
   } catch (error) {
      console.error(error);
   }
};

export { getMovies, deleteMovie };
