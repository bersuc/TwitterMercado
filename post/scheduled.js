// const T = require("../config/twit");
const quotes = require("../quotes/quotes");
var CronJob = require("cron").CronJob;

async function setSchedulePost() {
  let ativos = ["IBOV", "PETR4", "VALE5"];
  let symbolQuotes = {};
  ativos.forEach((item, index) => {
    let quotation = await quotes.buscaCotacaoAcao(item);
  });
  let twitado = "Twitado";
  console.log({
    Now: new Date().toLocaleString("pt-BR"),
    twitado,
    status: "Funcionou",
  });
}

var job = new CronJob(
  "*/1 * * * *",
  function () {
    setSchedulePost();
  },
  null,
  true,
  "America/Sao_Paulo"
);
job.start();

// T.post(
//   "statuses/update",
//   { status: "hello world!" },
//   function (err, data, response) {
//     console.log(data);
//   }
// );
