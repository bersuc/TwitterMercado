require("dotenv").config();

const quotes = require("./quotes/quotes");
const post = require("./post/post");

const T = require("./config/twit");
var stream = T.stream("statuses/filter", { track: ["mercadotv"] });

stream.on("tweet", async function (tweet) {
  var texto = tweet.text.replace(/ +(?= )/g, "");
  let frase = [];
  frase = texto.split(" ");
  // frase deve vir como @mercadotv valor petr4
  if (frase[0] === "@mercadotv" && frase[1].toUpperCase() === "VALOR") {
    console.log(frase);
    let symbol = frase[2].toUpperCase();
    const { closPric: price, prcFlcn } = await quotes.buscaCotacaoAcao(symbol);
    console.log(prcFlcn);
    if (price !== null) {
      let { id_str } = tweet;
      let { screen_name } = tweet.user;
      post.setReply(screen_name, id_str, price, symbol, prcFlcn);
    }
  } else {
    console.log("Dados invalidos para responder");
  }
});
