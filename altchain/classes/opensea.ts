const apiKey = "c54e602fd45947c98048e182234fb0fd"; 
import https from "https";

//const Web3 = require('web3')
//const { OpenSeaPort, Network } = require('opensea-js')

// This example provider won't let you make transactions, only read-only calls:
//const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

//const seaport = new OpenSeaPort(provider, {
//  networkName: Network.Main,
//  apiKey: apiKey
//})


class opensea {
    /// Узнать все данные об нфтишке
    static async getNFTInfo(NFTaddress: string, NFTid: string) {
        return new Promise( (resolve, reject) => {

        const options = {
            "method": "GET",
            "hostname": "api.opensea.io",
            "port": null,
            "path": `/api/v1/asset/${NFTaddress}/${NFTid}/?include_orders=false`,
            "headers": {
                "X-API-KEY": apiKey 
            }
          };
          
          var req =  https.request(options, 
            function(res) {
                // @ts-ignore
                if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
                  return reject(new Error('statusCode=' + res.statusCode));
                }
                // cumulate data
               var body: any[] = [];
                res.on('data', function (chunk) {
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
    /// Узнать инфу об адресе
    static async getAddressInfo(owner: string, NFTaddress: string, collectionAddress: string, tokenID: string) {
        return new Promise( (resolve, reject) => {
    /// Спросить у Павла по поводу добавления доп параметров снизу
        const params = {
            owner: owner,
            token_ids: tokenID, // Для поиска конкретных токенов в связи с коллекцией
            collection: collectionAddress,  // Для поиска определённой коллекции
            asset_contract_address: NFTaddress, /// Конкретная нфт
            limit: '50', //максимум 50нфт
            include_orders: true, /// Включая висящие заказы
          }
  
        const qs = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');

        const options = {
            "method": "GET",
            "hostname": "api.opensea.io",
            "port": null,
            "path": `/api/v1/assets?${qs}`,
            "headers": {
              "Accept": "application/json",
              "X-API-KEY": apiKey
            }
          };

          var req =  https.request(options, 
            function(res) {
                // @ts-ignore
                if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
                  return reject(new Error('statusCode=' + res.statusCode));
                }
                // cumulate data
               var body: any[] = [];
                res.on('data', function (chunk) {
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
    /// Ордеры на покупку. Использовать с функцией ниже
    static async orderOfferBook(NFTaddress: string, NFTid: string) {

        return new Promise( (resolve, reject) => {

        const options = {
          "method": "GET",
          "hostname": "api.opensea.io",
          "port": null,
          "path": `/api/v1/asset/${NFTaddress}/${NFTid}/offers?limit=50`,
          "headers": {
            "Accept": "application/json",
            "X-API-KEY": apiKey
          }
        };
        
        var req =  https.request( options, 
          function(res) {
              // @ts-ignore
              if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
                return reject(new Error('statusCode=' + res.statusCode));
              }
              // cumulate data
             var body: any[] = [];
              res.on('data', function (chunk) {
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
    /// Ордеры на продажу. Использовать с функцией выше
    static async orderListingBook(NFTaddress: string, NFTid: string) {

        return new Promise( (resolve, reject) => {

        const options = {
          "method": "GET",
          "hostname": "api.opensea.io",
          "port": null,
          "path": `/api/v1/asset/${NFTaddress}/${NFTid}/listings?limit=50`,
          "headers": {
            "Accept": "application/json",
            "X-API-KEY": apiKey
          }
        };
        
        var req =  https.request(options, 
          function(res) {
              // @ts-ignore
              if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
                return reject(new Error('statusCode=' + res.statusCode));
              }
              // cumulate data
             var body: any[] = [];
              res.on('data', function (chunk) {
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
   /// Не работает снизу пока
    static async ListingNFT() {

      return new Promise( (resolve, reject) => {

      const params = {
        asset_contract_address: 'thntfg', // Адрес НФТ контракта
        payment_token_address: 'gngnx', // Кто будет платить деньгу?
        maker: 'xngxgn',
        taker: 'xgnxng',
        owner: 'xgnx',
        is_english: 'true',
        bundled: 'false',
        include_bundled: 'false',
        listed_after: 'zgnxfgn',
        listed_before: 'xnfgxgn',
        token_id: 'xfgnfgn',
        token_ids: 'xngxgfn&token_ids=xgnxgn',
        side: '232',
        sale_kind: '232',
        limit: '20',
        offset: '23',
        order_by: 'created_date',
        order_direction: 'desc',
        'X-API-KEY': apiKey
      }

      const qs = Object.keys(params)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&');

      const options = {
        "method": "GET",
        "hostname": "api.opensea.io",
        "port": null,
        "path": `/wyvern/v1/orders?${qs}`,
        "headers": {
          "Accept": "application/json",
          "X-API-KEY": "c54e602fd45947c98048e182234fb0fd"
        }
      };
      
      var req =  https.request( options, 
        function(res) {
            // @ts-ignore
            if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
              return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
           var body: any[] = [];
            res.on('data', function (chunk) {
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

    /*static async (tokenId, tokenAddress,  ) {

      const offer = await seaport.createBuyOrder({
        asset: {
          tokenId,
          tokenAddress,
          /* // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
        },
        accountAddress,
        // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        startAmount: 1.2,
      })
      
    }
    
    static async () {
      
    }*/
}

export default opensea
