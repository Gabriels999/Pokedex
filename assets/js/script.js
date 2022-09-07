const mock = "pikachu";
let form = document.querySelector("form");
let input = document.querySelector("#inputNome");

const nome = document.querySelector(".pokeNome");
const id = document.querySelector(".pokeId");
const jogos = document.querySelector("#pokeJogos");
const imagem = document.querySelector("#pokeImagem");

function buscaPokemon(pokemonNome) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNome}`)
    .then((response) => response.json())
    .then((data) => preecheCampos(data));
}

function preecheCampos(dados) {
  console.log(dados);

  nome.textContent = dados.name;
  id.innerHTML = dados.id;
  imagem.setAttribute("src", dados.sprites.front_default);

  criaHabilidades(dados.moves);

  jogos.textContent = dados.game_indices.length;

  const local = fetch(dados.location_area_encounters)
    .then((response) => response.json())
    .then((data) => seEncontraEm(data));
}

function criaHabilidades(listaHabilidades) {
  let habilidades = document.querySelector("#pokeHabilidades");
  habilidades.innerHTML = '';
  for (i = 0; i < listaHabilidades.length; i += 5) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (j = i; j < i + 5; j++) {
      if (j > listaHabilidades.length - 1) {
        break;
      }
      const poder = document.createElement("div");
      poder.setAttribute("id", `poder${j}`);
      poder.setAttribute("target", "_blank");
      poder.classList.add("col");
      poder.textContent = listaHabilidades[j].move.name;
      row.appendChild(poder);
    }
    habilidades.appendChild(row);
  }
}

function seEncontraEm(encontros) {
  const listaDeLocais = document.querySelector("#pokeLocal");
  listaDeLocais.innerHTML = "";
  for (i = 0; i < encontros.length; i += 3) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (j = i; j < i + 3; j++) {
      if (j > encontros.length - 1) {
        break;
      }
      const local = document.createElement("div");
      local.setAttribute("id", `local${j}`);
      local.classList.add("col");
      local.textContent = encontros[j].location_area.name;
      row.appendChild(local);
    }
    listaDeLocais.appendChild(row);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  buscaPokemon(input.value.toLowerCase());
});
