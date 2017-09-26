import Currency from './connectors';

export const typeDefs = [`
  type Currency {
    price: Int
    averagePrice: Int
    percentChange: Float
    parsedBook: Book
    chartData: [Candles] 

  }

  type Book {
    bids: [Entry]
    asks: [Entry]
  }

  type Entry {
    price: String
    size: String
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
    currency(currencyType: String!): Currency
  }

   schema {
    query: RootQuery
  }
`,
];

export const resolvers = {
  RootQuery: {
    currency: (root, args, context) => Currency.getData(args)
  },
  Currency: {
    price: ({ price }) => price,
    averagePrice: ({ averagePrice }) => averagePrice,
    percentChange: ({ percentChange }) => percentChange,
    parsedBook: ({parsedBook}) => parsedBook,
    chartData: ({chartData}) => chartData,
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

