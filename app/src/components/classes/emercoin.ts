import http from "http"

class emercoin {

  url: string;
  user: string;
  id: string;
  password: string;
  auth: string;

  constructor(url: string, id: string, user: string, password: string){
    this.url = url;
    this.user = user;
    this.id = id;
    this.password = password;
    this.auth = `${user}: ${password}`

  } 

  async unique() {
    let serialId: string = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 8; i++)
    serialId += possible.charAt(Math.floor(Math.random() * possible.length));

    return serialId;
}

  async translit(word: any){
    let answer: any;
    let converter = {
      'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
      'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
      'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
      'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
      'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
      'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
      'э': 'e',    'ю': 'yu',   'я': 'ya',

      'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
      'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
      'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
      'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
      'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
      'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
      'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
    };

    for (let i = 0; i < word.length; ++i ) {
      if (converter[word[i]] == undefined){
        answer += word[i];
      } else {
        answer += converter[word[i]];
      }
    }

    return answer;
}

  async generateData(value: object) {

    const data = value;
    let result: string = ''
    for(const key in data ){
      if(data.hasOwnProperty(key) && typeof data[key] === 'string'){
        result += `${key.toUpperCase()}=${data[key]}\n`
      }
    }
    return result

}

  async getnewaddress() {
    return new Promise(function (resolve, reject) {

      const options = {
      auth: this.auth,
      body: JSON.stringify({
        "jsonrpc": "1.0",
        "id":"curltest",
        "method": "getnewaddress",
        })
      }
      let req =  http.request(this.url, options, 
      function(res) {
          // @ts-ignore
          if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
            return reject(new Error('statusCode=' + res.statusCode));
          }
          // cumulate data
         let body: any[] = [];
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
};

  async signmessage(address: string, name: string, ID: any) {
    return new Promise(function (resolve, reject) {

      const options = {
      auth: this.auth,
      body: JSON.stringify({
        "jsonrpc": "1.0",
        "id":"curltest",
        "method": "signmessage",
        "params": [
          address,   ///!!! 
          `dpo:${name}:${ID}:0`   ///!!!
        ]
        })
      }
      let req =  http.request(this.url, options, 
      function(res) {
          // @ts-ignore
          if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
            return reject(new Error('statusCode=' + res.statusCode));
          }
          // cumulate data
         let body: any[] = [];
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
};

  async name_new(name: string, value: object, days: number, address: string) { 
    return new Promise(function (resolve, reject) {

    let ID = this.unique()

    let signature = this.signmessage(address, name, ID)

    let dataRus = this.generateData(value)

    let data = this.translit(dataRus)
 
    const options = {
      auth: this.auth,
      body: JSON.stringify({
        "jsonrpc": "1.0",
        "id":"curltest",   ///!!!
        "method": "name_new",
        "params": [ //!!!
          `dpo:${name}:${ID}:0`,
          data+"SIGNATURE="+signature,
          days,
          address
        ] 
      })
    };

    let req = http.request(this.url, options, 
      function (res) {
          // @ts-ignore
          if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
            return reject(new Error('statusCode=' + res.statusCode));
          }
          // cumulate data
         let body: any[] = [];
          res.on('data', function (chunk) {
            body.push(chunk);
          });
          // resolve on end
          res.on('end', function () {
            const body1 = Buffer.concat(body)
            try {
              body = JSON.parse(body1.toString('utf8'));
            } catch (e) {
              resolve(body);
              return
            }
            resolve(body);
            return
          });
        });
      req.on('error', function (err) {
        reject(err);
      });
      req.end();
    })
}





}

export default emercoin
