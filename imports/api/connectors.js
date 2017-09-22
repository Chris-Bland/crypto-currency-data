import gdax from 'gdax'

const btcClient = new gdax.PublicClient();

const Bitcoin = {

  async getData({ inputTime}) {

    const ticker = await new Promise(function (resolve, reject) {
      btcClient.getProductTicker(function (err, res, data) {
        resolve(data)
      })
    })

    const historicRates = await new Promise(function (resolve, reject) {

      btcClient.getProductHistoricRates({
        granularity: 60
      }, (err, response) => {
        if (err) console.log('err', err);
        var btcHistoric = JSON.parse(response.body);
        if (btcHistoric[0] === undefined) {
          console.log('API Limit Reached.');
          return;
        } else {
          let total= 0;
          for (var i = 0; i < (inputTime); i++) {
            total += (btcHistoric[i][1] + btcHistoric[i][2]) / 2;
          }
          let firstCandle = btcHistoric[(inputTime) - 1];
          const openPrice = (firstCandle[1] + firstCandle[2]) / 2;
          const averagePrice = total / inputTime;
          // ========================== CHART LOGIC ==========================
          console.log('BTCHISTORIC: ', btcHistoric);
          var candles = [];
          for (var i = 0; i < 60; i++) {
              var rv = {};
              for (var j = 0; j < btcHistoric[i].length; ++j){
                rv["time"] = btcHistoric[i][0];
                rv["low"] = btcHistoric[i][1];
                rv["high"] = btcHistoric[i][2];
                rv["open"] = btcHistoric[i][0];
                rv["close"] = btcHistoric[i][1];
                rv["volume"] = btcHistoric[i][2];
            }
            asksO.push(rv);
          }









          // ========================== CHART LOGIC ==========================
          resolve({
            averagePrice,
            percentChange: (ticker.price - openPrice) / ticker.price,
            inputTime
          })
        }
      });
    })

    const parsedBook = await new Promise(function (resolve, reject) {
        btcClient.getProductOrderBook({ level: 2 }, (error, response, book) => {
          const bids = [];
          for (let i = 0; i < 10; i++) {
            bids.push(book.bids[i]);
          }
          const asks = [];
          for (let i = 0; i < 10; i++) {
            asks.push(book.asks[i]);
          }
          var asksO = [];
          for (var i = 0; i < asks.length; i++) {
              var rv = {};
              for (var j = 0; j < asks[i].length; ++j){
                rv["price"] = asks[i][0];
                rv["size"] = asks[i][1];
                rv["number"] = asks[i][2];
            }
            asksO.push(rv);
          }
          var bidsO = [];
          for (var i = 0; i < bids.length; i++) {
              var rv = {};
              for (var j = 0; j < bids[i].length; ++j){
                rv["price"] = bids[i][0];
                rv["size"] = bids[i][1];
                rv["number"] = bids[i][2];
            }
            bidsO.push(rv);
          }
          const parsedBook = {
            bids: bidsO,
            asks: asksO
          }
          resolve(parsedBook)
        })
      });
    const { averagePrice, percentChange, } = historicRates;
    console.log('inputTime: ', inputTime);
    return {
      price: ticker.price,
      averagePrice,
      inputTime,
      percentChange,
      parsedBook,
    }
  }
}
export default Bitcoin;