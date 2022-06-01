
  /**
  * createRawTx
  * @param data - encode method SC
  * @returns {rawTransaction} body of all transactions
  */
export async function createRawTx(gasPriceGwei, gasLimit, to, data, chainId) {

      const rawTransaction = {
        "gasPrice": gasPriceGwei,
        "gasLimit": gasLimit,
        "to": to,
        "data": data,
        "chainId": chainId
      };

    return rawTransaction
    
}

  /**
  * createRawTx
  * @param web3 - const web3 = new Web3(this.node)
  * @returns {gasPrice, gasLimit} body of all transactions
  */
export async function gasCounter(web3) {

  const gasPrice = web3.eth.getGasPrice()
  const gasLimit = 700000

  return gasPrice, gasLimit

}

  /**
  * createRawTx
  * @param web3 - const web3 = new Web3(this.node)
  * @returns {newNumber} newBigNumber/you can use this numb in all web3 tx
  */
export async function createBigNumber(web3, tokenContract, amount) {

  const decimals = await tokenContract.methods.decimals().call();
  const unit = Object.keys(web3.utils.unitMap).find(key => web3.utils.unitMap[key] === web3.utils.toBN(10).pow(web3.utils.toBN(decimals)).toString());
  let newNumber = web3.utils.toWei(amount.toString(), unit)  
  
  return newNumber
}