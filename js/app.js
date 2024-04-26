// Definición del objeto noticias
let cantidadDeNoticias = 24;
let pageFinal = cantidadDeNoticias;
let pageInicial = 0;
let temaActual = "Tecnología";

let noticias = {
  apiKey: "eb0d690e179647af93af30b9042f708a",

  fetchNoticias: function(categoria) {
    fetch(
      "https://newsapi.org/v2/everything?q=" +
      categoria +
      "&language=es&apiKey=" + this.apiKey
    )
    .then((response) => response.json())
    .then((data) => this.displayNoticias(data));
  },

  displayNoticias: function(data) {
    if (pageInicial == 0) {
      document.querySelector("#noticias").textContent = "";
    }

    if (data.articles.length > 0) {
      for(i = pageInicial; i <= pageFinal && i < data.articles.length; i++) {
        const { title } = data.articles[i];
        let h2 = document.createElement("h2");
        h2.textContent = title;

        const { urlToImage } = data.articles[i];
        let img = document.createElement("img");
        img.setAttribute("src", urlToImage);

        let info_item = document.createElement("div");
        info_item.className = "info_item";
        const { publishedAt } = data.articles[i];
        let fecha = document.createElement("span");
        let date = publishedAt;
        date = date.split("T")[0].split("-").reverse().join("-");
        fecha.className = "fecha";
        fecha.textContent = date;

        const { name } = data.articles[i].source;
        let fuente = document.createElement("span");
        fuente.className = "fuente";
        fuente.textContent = name;

        info_item.appendChild(fecha);
        info_item.appendChild(fuente);

        const { url } = data.articles[i];

        let item = document.createElement("div");
        item.className = "item";
        item.appendChild(h2);
        item.appendChild(img);
        item.appendChild(info_item);
        item.setAttribute("onclick", "location.href='" + url + "'");
        document.querySelector("#noticias").appendChild(item);
      }

      let btnSiguiente = document.createElement("span");
      btnSiguiente.id = "btnSiguiente";
      btnSiguiente.textContent = "Ver más";
      btnSiguiente.setAttribute("onclick", "siguiente()");
      document.querySelector("#noticias").appendChild(btnSiguiente);
    } else {
      console.log("No se encontraron noticias.");
    }
  }
};

function buscar(cat) {
  pageInicial = 0;
  pageFinal = cantidadDeNoticias;
  temaActual = cat;
  noticias.fetchNoticias(cat);
}

function buscarTema() {
  pageInicial = 0;
  pageFinal = cantidadDeNoticias;
  let tema = document.querySelector("#busqueda").value;
  temaActual = tema;
  noticias.fetchNoticias(temaActual);
}

function siguiente() {
  pageInicial = pageFinal + 1;
  pageFinal = pageFinal + cantidadDeNoticias + 1;
  document.querySelector("#btnSiguiente").remove();
  noticias.fetchNoticias(temaActual);
}

noticias.fetchNoticias(temaActual);


//footer scroll

let lastScrollTop = 0;
const footer = document.querySelector('footer');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    footer.classList.add('hidden');
  } else {
    footer.classList.remove('hidden');
  }
  lastScrollTop = scrollTop;
});
