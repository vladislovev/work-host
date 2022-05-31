//import "./helper/web3.min.js";
import Web3 from "web3";
import Tx  from 'ethereumjs-tx/dist/transaction';
import https from "https";
//import  abiTok  from './helper/abiTok'
import { AbiItem } from 'web3-utils'



const web3 = new Web3('https://rinkeby.infura.io/v3/3818737879df41558158d126c42c2a09');
const AbiToken: AbiItem[] =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


class cryptoboss {

    static async mintTok(tokAddress: string, from: string, toAddress: string, amount1: number, chain: number, privateKey: string) {

                 
          const tokenAddress = tokAddress; /// Адресс токена
        
          const fromAdress = from; /// Откуда Кирилл даст кошелёкъ
        
          const to = toAddress; ///Кому
        
          const amount = amount1 * 1e9; ///В зависимости от запятых после числа!!! Надо настроить!
        
          const chainId = chain // chain == 1, то nameChain = 'ethereum', 56 = BSC+

          var nameChain: string = ""; 
          switch (chainId) {
            case 1:
              nameChain = "ethereum"
              break;
            case 137:
              nameChain = "polygon"
              break;
            case 4:
              nameChain = "rinkeby" 
              break;
            case 3:
              nameChain = "ropsten"
              break;
            case 80001: 
              nameChain = "mumbai"
              break;
            default:
              throw new Error("Блокчейн ID не существует!")
              break;
          }

          var count = await web3.eth.getTransactionCount(fromAdress);
          console.log(`num transactions so far: ${count}`); 
        
          const contract = new web3.eth.Contract(AbiToken, tokenAddress, {
            from: fromAdress
          });
        
          var gasPriceGwei = 120;
          var gasLimitGwei = 12000000;
        
        
          const rawTransaction = {
            "nonce": "0x" + count.toString(16),
            "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
            "gasLimit": web3.utils.toHex(gasLimitGwei ),
            "to": tokenAddress,
            "data": contract.methods.mint(to, amount).encodeABI(),
            "chainId": chainId
          };
          
        
          /// Здесь происходит подписание транзакции! 
            const privKey = Buffer.from(privateKey, 'hex'); ///Приватный ключ Кирилла надо 1000 раз перехешировать и т.д.
        
            const tx = new Tx(rawTransaction, { 'chain' : nameChain }); ///Поменять  
      
            tx.sign(privKey); 
            const serializedTx = tx.serialize(); 
            
            const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
            const res = {
              rawTransaction,
              receipt
            }

            return res
                 
      }

      static async getNFTbyOwner(address: string) {

        return new Promise(function (resolve, reject) {
      
          const UserAddress = address;
      
          const options = {
            "method": "GET",
            "hostname": "api.rarible.org",
            "port": null,
            "path": `/v0.1/items/byOwner/?owner=ETHEREUM:${UserAddress}`,
            "headers": {
                "Content-Type": "application/json",
            }
            };
      
            const req = https.request(options, function(res) {
              // @ts-ignore
              if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
                return reject(new Error('statusCode=' + res.statusCode));
              }
              // cumulate data
             var body: any[] = [];
              res.on('data', function (chunk: any) {
                body.push(chunk);
              });
              // resolve on end
              res.on('end', function () {
                const body1 = Buffer.concat(body)
                try {
                  body = JSON.parse(body1.toString('utf8'));
                } catch (e) {
                  resolve(body1);
                  return
                }
                resolve(body1);
                return
              });
            });
          req.on('error', function (err) {
            reject(err);
          });
          req.end();
        });
      }

      static async getNFTbyCollection(address: string) {

        return new Promise(function (resolve, reject) {

          const options = {
            "method": "GET",
            "hostname": "api.rarible.org",
            "port": null,
            "path": `/v0.1/items/byCollection/collection=POLYGON:${address}`,
            "headers": {
                "Content-Type": "application/json",
            }
            };
      
            const req = https.request(options, function(res: any) {
              // @ts-ignore
              if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
                return reject(new Error('statusCode=' + res.statusCode));
              }
              // cumulate data
             var body: any[] = [];
              res.on('data', function (chunk: any) {
                body.push(chunk);
              });
              // resolve on end
              res.on('end', function () {
                const body1 = Buffer.concat(body)
                try {
                  body = JSON.parse(body1.toString('utf8'));
                } catch (e) {
                  resolve(body1);
                  return
                }
                resolve(body1);
                return
              });
            });
          req.on('error', function (err) {
            reject(err);
          });
          req.end();
        });
      }

 }


export default cryptoboss