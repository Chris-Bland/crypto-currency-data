import gdax from 'gdax'

const Currency = {
  async getData({currencyType}) {
    const currencyClient = new gdax.PublicClient(currencyType);

    // const ticker = await new Promise(function (resolve, reject) {
    //   currencyClient.getProductTicker(function (err, res, data) {
    //     resolve(data)
    //   })
    // })

    const oneDayData= await new Promise(function (resolve, reject) {
      currencyClient.getProduct24HrStats(function (err, res, data) {
        console.log('24 Hour: ', data);
          const openPrice = data.open;
          const lastTrade = data.last;
          const percentChange = (lastTrade - openPrice) / lastTrade;
          resolve({
            openPrice,
             percentChange,
             lastTrade
          })
      })
    })
    
    const historicRates = await new Promise(function (resolve, reject) {
      currencyClient.getProductHistoricRates({
        granularity: 60
      }, (err, response) => {
        if (err) console.log('err', err);
        var currencyHistoric = JSON.parse(response.body);
        console.log('Currency Length: ', currencyHistoric.length);

        if (currencyHistoric[0] === undefined) {
          console.log('API Limit Reached.');
          return;
        } else {
          let chartData = [];
          let total= 0;
          for (var i = 0; i < (currencyHistoric.length); i++) {
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
          // let firstCandle = currencyHistoric[(currencyHistoric.length) - 1];
          // const openPrice = (firstCandle[1] + firstCandle[2]) / 2;
          const averagePrice = total / currencyHistoric.length;

          // ========================== chartData LOGIC ==========================
  
          // ========================== chartData LOGIC ==========================
          resolve({
            averagePrice,
            // percentChange: (oneDayData.last - openPrice) / oneDayData.last,
            chartData,
            // openPrice
          })
        }
      });
    })

    const parsedBook = await new Promise(function (resolve, reject) {
        currencyClient.getProductOrderBook({ level: 3 }, (error, response, book) => {

          const bids = [];
          for (let i = 0; i < 11; i++) {
            bids.push(book.bids[i]);
          }
          const asks = [];
          for (let i = 0; i < 11; i++) {
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
    const { averagePrice,chartData} = historicRates;
    const {percentChange, openPrice, lastTrade} = oneDayData;
    return {
      price: lastTrade,
      averagePrice,
      percentChange,
      parsedBook,
      chartData,
      openPrice
    }
  }
}
export default Currency;