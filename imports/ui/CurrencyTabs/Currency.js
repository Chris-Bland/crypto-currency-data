import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ReactDOM from 'react-dom';
import TwitterTimeline from 'react-twitter-embedded-timeline';

import Dialog from 'material-ui/Dialog';
import Chart from '../Chart'
import Table, {
  TableBody, TableCell, TableHead, TableRow
} from 'material-ui/Table';

import numeral from 'numeral';

import Loading from '../Loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  componentWillUpdate(nextProps, nextState) {
    if (!this.props.loading) {
      const { percentChange } = this.props.currency;
      const { percentLimit } = nextProps;
      const audio = new Audio('/alert.mp3');

      if (Math.abs(percentChange) >= Math.abs(percentLimit) && !this.state.open) {
        audio.play()
      }
    }
  }

  render() {
    if (this.props.loading) return (<Loading />)
    const { averagePrice, percentChange, price } = this.props.currency;
    const { percentLimit } = this.props
    const movedColor = percentChange > 0 ? 'green' : 'red';
    return (
      <div className='currency-container'>
   
        <div className={`info-container ${movedColor}`}>
          <div className='info-item'>
            <div className='btcTitle'>Price</div>
            <div>{numeral(price).format('$0,0.00')}</div>
          </div>
          <div className='info-item'>
            <div className='btcTitle' >Avg Price (1 Hr)</div>
            <div>{numeral(averagePrice).format('$0,0.00')}</div>
          </div>
          <div className='info-item'>
            <div className='btcTitle' >Limit Set</div>
            <div>{`60 mins`}</div>
          </div>
          <div className='info-item'>
            <div className='btcTitle'>Percent Moved</div>
            <div>{numeral(percentChange).format('0.00%')}</div>
          </div>
        </div>
        <br />
        <div className="containerBooksCharts">
          <div className="books">
            <Table  >
              <TableHead >
                <TableRow>
                  <TableCell>Price</TableCell>
                  <TableCell>Size</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="3" height="3em" >
                    Asks
              </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="asks" >
                {
                  this.props.currency.parsedBook.asks.map(({ price, size, number }, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{price}</TableCell>
                        <TableCell>{size}</TableCell>
                      </TableRow>
                    )

                  })
                }
              </TableBody>
            </Table>
            <Table >
              <TableHead  >
                <TableRow>
                  <TableCell colSpan="3" >
                    Bids
              </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="bids" >
                {
                  this.props.currency.parsedBook.bids.map(({ price, size, number }, i) => {

                    return (
                      <TableRow key={i}>
                        <TableCell>{price}</TableCell>
                        <TableCell>{size}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
          <div className="twitterAndChart">
            <Chart chartData={this.props.currency.chartData} />
            <div className="Twitter">
              <TwitterTimeline widgetId="912461228252987392" chrome="noborders noheader" />
            </div>
          </div>

        </div>

      </div>

    )
  }
}

const getCoinData = gql`
  query($currencyType: String!) {
    currency(currencyType: $currencyType) {
      price
      averagePrice
      percentChange
      parsedBook {
        bids {
          price
          size
        }
        asks {
          price
          size
        }
      }
      chartData {
        time
        low
        high
        open
        close
        volume
      }
    }
  }
`;

const withData = graphql(getCoinData, {
  options: ({ currencyType }) => {
    return ({
      pollInterval: 3000,
      variables: {
        currencyType
      },
    })
  },
  props: ({ data: { currency, error, loading, refetch } }) => {
    return {
      currency,
      refetch,
      loading,
      error
    };
  },
});

export default withData(App);
