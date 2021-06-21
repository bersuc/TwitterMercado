require("dotenv").config();

const quotes = require("./quotes");
const post = require("./post");

const T = require("./twit");
var stream = T.stream("statuses/filter", { track: ["mercadotv"] });

stream.on("tweet", async function (tweet) {
  let frase = [];
  frase = tweet.text.split(" ");
  // frase deve vir como @mercadotv valor petr4
  console.log(frase[1].toUpperCase());
  if (frase[0] === "@mercadotv" && frase[1].toUpperCase() === "VALOR") {
    console.log(frase);
    let ativo = frase[2].toUpperCase();
    const preco = await quotes.buscaCotacao(ativo);
    console.log("Preço: ", preco);
    console.log("Ativo: ", ativo);

    let { id_str } = tweet;
    let { screen_name } = tweet.user;
    console.log(id_str);
    console.log(screen_name);
    console.log("🌟");

    post.postar(screen_name, id_str, preco, ativo);
  } else {
    console.log("Dados invalidos para responder");
  }
});
