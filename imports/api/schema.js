import Bitcoin from './connectors';

export const typeDefs = [`
  type Bitcoin {
    price: Int
    averagePrice: Int
    percentChange: Float
    parsedBook: Book
    chart: [Candles] 
  }

  type Book {
    bids: [Entry]
    asks: [Entry]
  }

  type Entry {
    price: String
    size: String
    number: Int
  }
  type Candles {
    time: Int
    low: Int
    high: Int
    open: Int
    close: Int
    volume: Int
  }

  type RootQuery {
    bitcoin: Bitcoin
  }

   schema {
    query: RootQuery
  }
`,
];

export const resolvers = {
  RootQuery: {
    bitcoin: (root, args, context) => Bitcoin.getData(args)
  },
  Bitcoin: {
    price: ({ price }) => price,
    averagePrice: ({ averagePrice }) => averagePrice,
    percentChange: ({ percentChange }) => percentChange,
    parsedBook: ({parsedBook}) => parsedBook,
    chart: ({chart}) => chart,
  },
  Book: {
    bids: ({bids}) => bids,
    asks: ({asks}) => asks
  },
  Candles: {
    time: ({time}) => time,
    low: ({low}) => low,
    high: ({high}) => high,
    open: ({open}) => open,
    close: ({close}) => close,
    volume: ({volume}) => volume,
  }
};

// http://localhost:3000/graphiql?query=%7B%0A%20%20bitcoin(inputTime%3A60)%20%7B%0A%20%20%20%20price%0A%20%20%20%20averagePrice%0A%20%20%20%20inputTime%0A%20%20%20%20percentChange%0A%20%20%20%20parsedBook%7B%0A%20%20%20%20%20%20bids%20%7B%0A%20%20%20%20%20%20%20%20price%0A%20%20%20%20%20%20%20%20size%0A%20%20%20%20%20%20%20%20number%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20asks%20%7B%0A%20%20%20%20%20%20%20%20price%0A%20%20%20%20%20%20%20%20size%0A%20%20%20%20%20%20%20%20number%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20chart%7B%0A%20%20%20%20%20%20time%0A%20%20%20%20%20%20low%0A%20%20%20%20%20%20high%0A%20%20%20%20%20%20open%0A%20%20%20%20%20%20close%0A%20%20%20%20%20%20volume%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D