/**
 * Page to adjust status Text base on price variation (%)
 */

function setStatus(screen_name, price, symbol, prcFlcn) {
  let floatingStatus = setReplyChange(prcFlcn);
  let username = `@${screen_name}`;
  let status = "";
  if (symbol == "IBOV") {
    status = `@${screen_name} Olá ${screen_name}, o Ibovespa está com ${price}* pontos, ${floatingStatus}\nfonte: B3\n*Uso apenas informativo, com atraso e em testes.`;
  } else {
    status = `@${screen_name} Olá ${screen_name}, o ativo ${symbol} está cotado a R$ ${price}*, ${floatingStatus}\nfonte: B3\n*Uso apenas informativo, com atraso e em testes.`;
  }

  return { status, username };
}

function setReplyChange(prcFlcn) {
  prcFlcn = prcFlcn.toFixed(2);
  if (prcFlcn > 0) {
    if (prcFlcn < 0.5) {
      return `leve alta de ${prcFlcn}% `;
    } else {
      return `alta de ${prcFlcn}%`;
    }
  } else if (prcFlcn < 0) {
    if (prcFlcn > -0.5) {
      return `leve baixa de ${prcFlcn}% `;
    } else {
      return `baixa de ${prcFlcn}%`;
    }
  } else {
    return `com variação de ${prcFlcn}%`;
  }
}

module.exports = { setStatus };
