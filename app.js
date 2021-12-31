
let pokemons = [];
let proximaPaginaUrlApi = '';


async function buscarPokemon(urlApi = 'https://pokeapi.co/api/v2/pokemon/?limit=50') {
    try {
        const respostaApi = await fetch(urlApi);
        const dados = await respostaApi.json();
        proximaPaginaUrlApi = dados.next;

        await Promise.all(dados.results.map(async (pokemon) => {
            const respostaApiPokemon = await fetch(pokemon.url);
            const dadosPokemon = await respostaApiPokemon.json();

            let tipos = '';
            dadosPokemon.types.map((tipo) => {  tipos += tipo.type.name + ' '; });

            pokemons.push({
                nome: dadosPokemon.name,
                imagem: dadosPokemon.sprites.front_default,
                tipos: tipos
            })
        }));

        console.log(pokemons);
        exibirTelaPokemons();

    } catch (error) {
        console.error(error);
    }


}


async function exibirTelaPokemons() {
    let html = ``;
    pokemons.map((pokemon) => {
        html += `
        <div class="col-6 col-md-2">
        <div class="card text-center mb-4 bg-secondary text-light">
            <div class="card-body">
                <img class="rounded-circle" src="${pokemon.imagem}" alt="">
                <h5 class="card-title">${pokemon.nome}</h5>
                <h6 class="card-subtitle text-light">${pokemon.tipos}</h6>
            </div>
        </div>
    </div>
        `;
    });
    $('.pokemons').html(html);
}


$(document).ready(function () {
    buscarPokemon();
});


