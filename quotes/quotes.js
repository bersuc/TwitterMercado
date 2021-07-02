const axios = require("axios").default;
require("dotenv").config();
const baseURL = process.env.BASE_URL;

/**
 * Returns an object from symbol with price and variation
 * @param {string} acao
 * @returns {{closPric: Number, prcFlcn: Number }} Price and variation
 */
async function buscaCotacaoAcao(acao) {
  let ativo = acao.toUpperCase();
  const dados1 = await axios.get(`${baseURL}${ativo}`);
  var dadosAtivos = await dados1.data.TradgFlr.scty.lstQtn;
  var totalSize = Object.keys(dadosAtivos).length;

  //if there is no data from API
  if (totalSize < 1) {
    console.error("Erro, ativo não encontrado ->", ativo);
    return null;
  } else {
    var { closPric, dtTm, prcFlcn } = await dadosAtivos[totalSize - 1];
    return { closPric, prcFlcn };
  }
}

module.exports = { buscaCotacaoAcao };
