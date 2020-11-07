"use strict";

const axios = require('axios').default;

async function getMovies(url) {

   try {
      const response = await axios.get(url);
      return response.data;
   } catch (error) {
      return [];
   }

};

export { getMovies };
