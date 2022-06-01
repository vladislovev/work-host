import Web3 from "web3";
import routerAbi from "../constants/routerAbi.js";
import ERC20Abi from "../constants/ERC20ABI.js";
import {createRawTx, gasCounter, createBigNumber} from "../constants/helpFunctions";

const detectEthereumProvider = require('@metamask/detect-provider');

export default class router {

    constructor(routerContract, node, chainId) {

        this.routerContract = routerContract 
        this.node = node
        this.chainId = chainId

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

            const contract = new web3.eth.Contract(routerAbi, this.routerContract, {
              from: userAddress
            });

            let { gasPrice, gasLimit } = await gasCounter(web3)

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

    async approveERC20_sendMultiERC20(addressERC20, listReceivers, listAmounts, totalAmount) {

      const provider = await detectEthereumProvider({
        mustBeMetaMask: true
      })
      if (provider) {
        const accounts = await provider.request({method: 'eth_requestAccounts'});
        const userAddress = accounts[0]
  
        const web3 = new Web3(this.node)
  
        const tokenContract = new web3.eth.Contract(ERC20Abi, addressERC20, {
          from: userAddress
        });

        let { gasPrice, gasLimit } = await gasCounter(web3)
        

        let newNumber = await createBigNumber(web3, tokenContract, totalAmount)

        let dataAprove = await tokenContract.methods.approve(this.routerContract, newNumber).encodeABI()

        let rawTxAprove = createRawTx(gasPrice, gasLimit, addressERC20, dataAprove, this.chainId)       
      
        const hash = await provider.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              ...rawTxAprove
            }
          ],
        })
  
        return new Promise((resolve, reject) => {
  
          const intervalID = setInterval(async () => {
  
            const info = await web3.eth.getTransactionReceipt(hash)
            console.log(info);
  
            if (info.status === true) {
              clearInterval(intervalID)
  
              const hash2 = await this.sendMultiERC20(addressERC20, listReceivers, listAmounts, newNumber);

              console.log(hash, hash2);
  
              resolve({hash, hash2})
            } else {
              clearInterval(intervalID)
            }
          }, 20000)
  
        })
  
      } else {
        console.error('Please install metamask')
        return false
      }
  
    }

}

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