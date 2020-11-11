"use strict";

import axios from 'axios';
// const axios = require('axios').default;

const API = "http://localhost:3000";

async function getMovies(path) {
   const url = new URL(path, API);
   
   try {
      const response = await axios.get(url);
      return response.data;
   } catch (error) {
      console.error(error);
      return [];
   }

};

export { getMovies };
