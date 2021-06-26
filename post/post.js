require("dotenv").config();

const T = require("../config/twit");
const { setStatus } = require("./status");

function setReply(screen_name, id_str, price, symbol, prcFlcn) {
  var { status, username } = setStatus(screen_name, price, symbol, prcFlcn);

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
      console.table({
        price,
        prcFlcn: prcFlcn.toFixed(2),
        symbol,
        id_str,
        screen_name,
        status: "✅",
        Tweeted: reply.text,
      });
    }
  }
}

module.exports = { setReply };
