import Web3 from "../classes/helper/web3.min.js";
import routerAbi from "constants/routerAbi.js";
import {createRawTx, gasCounter} from "constants/helpFunctions";

const detectEthereumProvider = require('@metamask/detect-provider');


class router {

    constructor(routerContract, node, ) {

        this.routerContract = routerContract 
        this.chainId = chainId
        this.node = node

    }


    /**
    * send some tokens on many addresses
    * @param {address} addressERC20 - tokenAddress
    * @param {address array} listReceivers - address array
    * @param {uint array} listAmounts - uint array
    * @param {number} totalAmount - summirize uint array
    * @returns {hash} sendMultiERC20 transaction hash
    */
    async sendMultiERC20(addressERC20, listReceivers, listAmounts, totalAmount) {

        const provider = await detectEthereumProvider({
          mustBeMetaMask: true
        })
        if (provider) {
          try {
            const accounts = await provider.request({method: 'eth_requestAccounts'});
            const userAddress = accounts[0]
    
            const web3 = new Web3(this.node)

            const contract = await new web3.eth.Contract(routerAbi, this.routerContract, {
              from: userAddress
            });

            let { gasPrice, gasLimit } = await gasCounter()

            let data = await contract.methods.sendMultiERC20(addressERC20, listReceivers, listAmounts, totalAmount).encodeABI()
            
            let rawTx = await createRawTx(gasPrice, gasLimit, this.routerContract, data, this.chainId)

            let hash = await provider.request({
              method: 'eth_sendTransaction',
              params: [
                {
                  from: accounts[0],
                  ...rawTx
                }
              ],
            })
            return hash

          } catch (e) {
            console.error(e)
            return false
          }
        } else {
          console.error('Please install MetaMask')
          return false
        }
    
      }

}


//["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", 
 //"0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
 //"0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"]

 /**
  *         let data

          try {

              if (methodName === 'multiTransferERC20') {

                data = await contract.methods.sendMultiERC20().encodeABI()
  
              } if (methodName === 'multiTransferERC721') {
  
                data = await contract.methods.sendMultiERC721().encodeABI()
  
              } if (methodName === 'multiTransferNative') {
  
                data = await contract.methods.sendMultiETH().encodeABI()
  
              }
          } catch (error) {
            alert('Unknown method!')
            console.error(e) 
            return false       
          }
  */