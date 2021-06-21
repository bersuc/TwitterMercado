const axios = require("axios").default;
require("dotenv").config();
const baseURL = process.env.BASE_URL;

async function buscaCotacao(acao) {
  let ativo = acao.toUpperCase();
  const dados1 = await axios.get(`${baseURL}${ativo}`);
  var dadosAtivos = await dados1.data.TradgFlr.scty.lstQtn;
  var totalSize = Object.keys(dadosAtivos).length;
  var { closPric, dtTm, prcFlcn } = await dadosAtivos[totalSize - 1];
  return closPric;
}

module.exports = { buscaCotacao };
