import gdax from 'gdax'

const Currency = {
  async getData({currencyType}) {
    const currencyClient = new gdax.PublicClient(currencyType);
    const ticker = await new Promise(function (resolve, reject) {
      currencyClient.getProductTicker(function (err, res, data) {
        resolve(data)
      })
    })
    
    const historicRates = await new Promise(function (resolve, reject) {
      currencyClient.getProductHistoricRates({
        granularity: 60
      }, (err, response) => {
        if (err) console.log('err', err);
        var currencyHistoric = JSON.parse(response.body);

        if (currencyHistoric[0] === undefined) {
          console.log('API Limit Reached.');
          return;
        } else {
          let chartData = [];
          let total= 0;
          for (var i = 0; i < (60); i++) {
            total += (currencyHistoric[i][1] + currencyHistoric[i][2]) / 2;
            var rv = {};
            for (var j = 0; j < currencyHistoric[i].length; ++j){
              rv["time"] = currencyHistoric[i][0];
              rv["low"] = currencyHistoric[i][1];
              rv["high"] = currencyHistoric[i][2];
              rv["open"] = currencyHistoric[i][3];
              rv["close"] = currencyHistoric[i][4];
              rv["volume"] = currencyHistoric[i][5];
          }
          chartData.push(rv);
          }
          let firstCandle = currencyHistoric[(60) - 1];
          const openPrice = (firstCandle[1] + firstCandle[2]) / 2;
          const averagePrice = total / 60;

          // ========================== chartData LOGIC ==========================
  
          // ========================== chartData LOGIC ==========================
          resolve({
            averagePrice,
            percentChange: (ticker.price - openPrice) / ticker.price,
            chartData,
            openPrice
          })
        }
      });
    })

    const parsedBook = await new Promise(function (resolve, reject) {
        currencyClient.getProductOrderBook({ level: 3 }, (error, response, book) => {

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
            }
            asksO.push(rv);
          }
          var bidsO = [];
          for (var i = 0; i < bids.length; i++) {
              var rv = {};
              for (var j = 0; j < bids[i].length; ++j){
                rv["price"] = bids[i][0];
                rv["size"] = bids[i][1];
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
    const { averagePrice, percentChange, chartData, openPrice} = historicRates;
    return {
      price: ticker.price,
      averagePrice,
      percentChange,
      parsedBook,
      chartData,
      openPrice
    }
  }
}
export default Currency;