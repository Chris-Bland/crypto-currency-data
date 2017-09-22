import Bitcoin from './connectors';

export const typeDefs = [`
  type Bitcoin {
    price: Int
    averagePrice: Int
    inputTime: Int
    percentChange: Float
    parsedBook: Book
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

  type RootQuery {
    bitcoin(inputTime: Int!): Bitcoin
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
    inputTime: ({ inputTime }) => inputTime,
    percentChange: ({ percentChange }) => percentChange,
    parsedBook: ({parsedBook}) => parsedBook,
  },
  Book: {
    bids: ({bids}) => bids,
    asks: ({asks}) => asks
  }
};