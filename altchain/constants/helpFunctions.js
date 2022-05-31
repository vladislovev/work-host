

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

export default async function gasCounter(web3) {

  const gasPrice = web3.eth.getGasPrice()
  const gasLimit = 700000

  return gasPrice, gasLimit

}