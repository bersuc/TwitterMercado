require("dotenv").config();

const T = require("./twit");

// post().then((tweet) => {
//   console.log(tweet);
// });

function postar(screen_name, id_str, preco, ativo) {
  console.log(screen_name, id_str, preco, ativo);

  let status = `@${screen_name} Olá, a cotação do ativo ${ativo} é R$${preco}`;
  let username = `@${screen_name}`;

  T.post(
    "statuses/update",
    {
      in_reply_to_status_id: id_str,
      status,
      username,
    },
    tweeted
  );

  function tweeted(err, reply) {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Tweeted: " + reply.text);
    }
  }
}

module.exports = { postar };
