/**
 * TYPE:
 * LIMIT - по цене юзера
 * MARKET - по рыночной ценне
 * STOP_LOSS_LIMIT - если дойдёт до цены, то продать	
 * TAKE_PROFIT_LIMIT - если	дойдёт до цены, то продать
 * 
 * SIDE:
 * BUY - купить
 * SELL - продать
 */ 

import {Spot} from '@binance/connector'
//  = "UTWAg5BjjeOm5yJ7OKtwAtuflj72hH40IULxjQHSQY0CxOdW6dMW9bOpJfMw8cqU" //Не тестовые
//  = "tO8M3xfQoBUJh6wQC7tVNokORCwZjv5eg55JqVsJtY3OKlDOKbQIzLq4RkbvjKNl"


class binance {

    private client;

    constructor(apiSecret: string, apiKey: string) {
        this.client = new Spot(apiKey, apiSecret, { baseURL: 'https://api.binance.com/'})// test = 'https://testnet.binance.vision/', main = 'https://api.binance.com/'apiSecret   
    }
/// 0 - получить разрешение ключа
    async apiPermissions() {

        this.client.apiPermissions({ recvWindow: 5000 })
        .then(response => this.client.logger.log(response.data))
        .catch(error => this.client.logger.error(error))
        
    }

/// 1 - создание ключа, который будет прослушивать изменения кошелька юзера (кнопка входа после ввода апи)
    async createListenKey() { 

        this.client.createListenKey().then(response => this.client.logger.log(response.data))       
    }
///2 - обновление ключа (должен быть на каждом действии)
    async renewListenKey(listenKey: string) {

        this.client.renewListenKey(listenKey).then(response => this.client.logger.log(response.data))
        .catch(error => this.client.logger.error(error))
        
    }
/// 3 - удаление ключа (кнопка выхода)
    async closeListenKey(listenKey: string) {

        this.client.closeListenKey(listenKey).then(response => this.client.logger.log(response.data))
        .catch(error => this.client.logger.error(error))
        
    }
/// 4 - получить инф-ю о всех валютах БИНАНСА 
    async coinInfo() {

        this.client.coinInfo()
        .then(response => this.client.logger.log(response.data))
        .catch(error => this.client.logger.error(error))
        
    }
/// 5 - подписаться на цены активов: на 1 час или пока юзер авторизован
    async pricesStream(pair) { /// pair = криптовалютная пара
        const listenKey = this.createListenKey()
        console.log(listenKey);
        const callbacks = {
            open: () => this.client.logger.log('open'),
            close: () => this.client.logger.log('closed'),
            message: data => this.client.logger.log(data)
          }

        const wsRef = this.client.aggTradeWS(pair, callbacks)
        setTimeout(() => this.client.unsubscribe(wsRef), 36000000)
    }
/// 6 - отменить сделанный заказ
    async cancelOrder(pair, orderId: string) {

        this.client.cancelOrder(pair, {
          orderId: orderId
        }).then(response => this.client.logger.log(response.data))
          .catch(error => this.client.logger.error(error))
        
 
      }
/// 7 - создать сделку 
    async newOrder(pair, side, price: string, amount: string, type) {
        
    this.client.newOrder(pair, side, type, {
      price: price,
      quantity: amount, 
      timeInForce: 'GTC'
    }).then(response => this.client.logger.log(response.data))
      .catch(error => this.client.logger.error(error))

    }
/// 8 - Вывести сделки по паре
    async myTrades(pair) {

        this.client.myTrades(pair).then(response => this.client.logger.log(response.data))
        .catch(error => this.client.logger.error(error))
 
      }
/// 9 - вывести все заказы по паре    
    async allOrders(pair) {

        this.client.allOrders(pair, {
        }).then(response => this.client.logger.log(response.data))
          .catch(error => this.client.logger.error(error))
 
      }
/// 10 - получить инфу об аккаунте (все валюты на нём)
    async account() {

        this.client.account().then(response => this.client.logger.log(response.data))
 
      }
/// 11 - инфа о сделках
    async  depositHistory() {

        this.client.depositHistory(
            {
              status: 1
            }
          ).then(response => this.client.logger.log(response.data))
            .catch(error => this.client.logger.error(error))

    
}

}


export default binance