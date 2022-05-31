const apiKey = "124cacb6-b349-4a20-9cab-769836530a4f"
import https from "https";
///Деплой и минт ERC20/721 с  помощью татума. Блокчейны: BSC(Binance Smart Chain), MATIC(Polygon), Sol(Solana), но можно и другие использовать

///Татум
class tatum {

    static async IPFS(file: any) { ///Закидываем в IPFS файлик
      return new Promise( (resolve, reject) => {

        const options = {
        method: 'POST',
          url: 'https://api-eu1.tatum.io/v3/ipfs',
          headers: {
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            'x-api-key': apiKey
          },
          formData: {file: file}
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
    
    static async deployERC(chain: string, symbol:string, name:string, totalCap:string, supply:string, digits:number, address:string, fromPrivateKey:string) { ///Digits - number, остальное string
        
        const options = {
          "method": "POST",
          "hostname": "api-eu1.tatum.io",
          "port": null,
          "path": "/v3/blockchain/token/deploy",
          "headers": {
            "Content-Type": "application/json",
            "x-testnet-type": "ethereum-rinkeby",
            "x-api-key": apiKey
          }
        };
      
        const create = https.request(options, function (res) {
        const chunks: Uint8Array[] = [];
      
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
      
          res.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
          });
        });
      
        create.write(JSON.stringify({
            chain: chain,
            symbol: symbol,
            name: name,
            totalCap: totalCap,
            supply: supply,
            digits: digits,
            address: address,
            fromPrivateKey: fromPrivateKey
          }));
        create.end();
    }

    static async mintERC(chain:string, amount:string, to:string, contractAddress:string, fromPrivateKey:string) {

      const options = {
      "method": "POST",
      "hostname": "api-eu1.tatum.io",
      "port": null,
      "path": "/v3/blockchain/token/mint",
      "headers": {
          "Content-Type": "application/json",
          "x-testnet-type": "ethereum-rinkeby",
          "x-api-key": apiKey
      }
      };

      const create = https.request(options, function (res) {
      const chunks: Uint8Array[] = [];

      res.on("data", function (chunk) {
      chunks.push(chunk);
      });

      res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      });
    });

    create.write(JSON.stringify({
      chain: chain,
      amount: amount,
      to: to,
      contractAddress: contractAddress,
      fromPrivateKey: fromPrivateKey
    }));
    create.end();
    }
    
    static async deployNFT(chain: string, symbol:string, name:string, fromPrivateKey:string, provenance:boolean, publicMint: boolean) {

    const options = {
      "method": "POST",
      "hostname": "api-eu1.tatum.io",
      "port": null,
      "path": "/v3/nft/deploy",
      "headers": {
        "Content-Type": "application/json",
        "x-testnet-type": "ethereum-rinkeby",
        "x-api-key": apiKey
      }
    };

    const req = https.request(options, function (res) {
      const chunks: Uint8Array[] = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.write(JSON.stringify({
      chain: chain,
      name: name,
      symbol: symbol,
      fromPrivateKey: fromPrivateKey,
      provenance: provenance,
      publicMint: publicMint,
    }));
    req.end();
  }
    
    static async mintNFT(chain: string, tokenId:string, to: string, contractAdress:string, fromPrivateKey:string, url: string) {

      const options = {
        "method": "POST",
        "hostname": "api-eu1.tatum.io",
        "port": null,
        "path": "/v3/nft/mint",
        "headers": {
          "Content-Type": "application/json",
          "x-testnet-type": "ethereum-rinkeby",
          "x-api-key": apiKey
        }
      };
     
      const req = https.request(options, function (res) {
        const chunks: Uint8Array[] = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          const body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });
      
      req.write(JSON.stringify({
        chain: chain,
        tokenId: tokenId,
        to: to,
        contractAddress: contractAdress,
        url: "ipfs://"+ url,
        fromPrivateKey: fromPrivateKey,

      }));
      req.end();
    }

}

export default tatum;