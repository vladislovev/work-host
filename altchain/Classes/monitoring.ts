/// Выполнено с использованием BSCscan/PolScan
import https from "https"

class monitoring {

  static async getNFTbyCollection() {

    return new Promise(function (resolve, reject) {
            
      const address = '';

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

    static async checkPolTx(address: string) {

      return new Promise(function (resolve, reject) {

        const params = {
          module: 'account',
          action: 'txlist',
          address: address,
          startblock: '0',
          endblock: '9999999',
          page: '1',
          offset: '100',///Выводит 100 последних транзакций!
          sort: 'asc',
          apikey: "DIPQH37S48J7TDTWY4YTVVASUAMRT6M4GF"// АпиКлюч сканера polygon
        }

        const qs = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
  
        const options = {
          "method": "GET",
          "hostname": "api.polygonscan.com",
          "port": null,
          "path": `/api?${qs}`,
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

    static async checkBSCTx(address: string) {

      return new Promise(function (resolve, reject) {

        const params = {
          module: 'account',
          action: 'txlist',
          address: address,
          startblock: '0',
          endblock: '9999999',
          page: '1',
          offset: '100',///Выводит 100 последних транзакций!
          sort: 'asc',
          apikey: "JEJPQTN7SBBH932VJA8UA72P5U7WZKX7GS"// АпиКлюч сканера BSC
        }

        const qs = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
  
        const options = {
          "method": "GET",
          "hostname": "api.bscscan.com",
          "port": null,
          "path": `/api?${qs}`,
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

    static async checkERC20(address: string, blockchain: string) { 
      
      let checkTokApi = 'f4f4538933bc490c9eceb96627a' //Апи для этой функции

      let chainId: any = undefined

      if (blockchain === 'ETH') {
        chainId = 1
      } else if (blockchain === 'BSC') {
        chainId = 56
      } else if (blockchain === 'MATIC') {
        chainId = 137
      } //MATIC/BSC/ETH

      return new Promise(function (resolve, reject) {

        const options = {
          "method": "GET",
          "hostname": "api.covalenthq.com",
          "port": null,
          "path": `/v1/${chainId}/address/${address}/balances_v2/?&key=ckey_${checkTokApi}`,
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
    
      
export default monitoring
