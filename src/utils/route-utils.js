
async function renderRoute(path, wrapper) {
   localStorage.setItem("path", path);
   wrapper.innerHTML = "";

   switch (path) {
      case "links.home":
         wrapper.appendChild((new Welcome).render());
         break;
      
      case "links.movies":
         const movies = await getMovies(path);
         
         const cards = movies
            .filter(mv => mv.id)
            .map(mv => new Card(mv));

         cards.forEach(card => wrapper.appendChild(card.render()));
         break;
      
      default:
         wrapper.innerText = "404";
         break;
   }
}

// export default renderRoute;