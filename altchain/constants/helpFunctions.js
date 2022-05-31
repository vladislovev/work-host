

export default async function createRawTx(gasPriceGwei, gasLimit, to, data, chainId) {

    const rawTransaction = {
        "gasPrice": gasPriceGwei,
        "gasLimit": gasLimit,
        "to": to,
        "data": data,
        "chainId": chainId
      };

    return rawTransaction
    
}

export default async function gasCounter() {

  const gasPrice = ''
  const gasLimit = ''

  return gasPrice, gasLimit

}