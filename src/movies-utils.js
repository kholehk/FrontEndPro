"use strict";

const axios = require('axios').default;

async function getMovies() {
   try {
      const response = await axios.get('http://localhost:3000/movies/');
      console.log(response);
   } catch (error) {
      console.error(error);
   }
};

export { getMovies };
