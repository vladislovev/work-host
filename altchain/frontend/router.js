import Web3 from "../classes/helper/web3.min.js";
import routerAbi from "constants/routerAbi.js";
import {createRawTx, gasCounter} from "constants/helpFunctions";

const detectEthereumProvider = require('@metamask/detect-provider');



// "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
// "gasLimit": web3.utils.toHex(gasLimit),

class router {

    constructor(routerContract, node, ) {

        this.routerContract = routerContract 
        this.chainId = chainId
        this.node = node

    }

    async getTRUSTT(methodName) {

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

            let { gasPrice, gasLimit } = gasCounter()

            let data

            try {

              if (methodName === 'getTRUSTT') {

                data = await contract.methods.getTRUSTT().encodeABI()
  
              } if (methodName === 'getTRUSTT') {
  
                data = await contract.methods.getTRUSTT().encodeABI()
  
              } if (methodName === 'getTRUSTT') {
  
                data = await contract.methods.getTRUSTT().encodeABI()
  
              } if (methodName === 'getTRUSTT') {
                
                data = await contract.methods.getTRUSTT().encodeABI()
  
              } 
              
            } catch (error) {
              alert('Unknown method!')
              console.error(e) 
              return false       
            }

            let rawTx = createRawTx(gasPrice, gasLimit, this.routerContract, data, this.chainId)

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


