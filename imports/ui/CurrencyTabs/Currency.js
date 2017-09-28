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
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import numeral from 'numeral';

import Loading from '../Loading';


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#F4F7FA',
  },
});

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
    }
  }

  render() {
    if (this.props.loading) return (<Loading />)
    const { averagePrice, percentChange, price } = this.props.currency;
    const { percentLimit } = this.props
    const movedColor = percentChange > 0 ? 'green' : 'red';
    return (
      <div className='currency-container' >
        <Grid container spacing={8} direction='row'>
          <Grid item xs={12}>
            <Paper>
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
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper > <Chart className="chartComponent" chartData={this.props.currency.chartData} /> </Paper>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Paper >
              <Table>
                <TableHead  >
                  <TableRow>
                    <TableCell colSpan="3" >Asks</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Size</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="asks" >
                  {
                    this.props.currency.parsedBook.asks.map(({ price, size, number }, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{size}</TableCell>
                          <TableCell>{price}</TableCell>
                        </TableRow>
                      )

                    })
                  }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={3} sm={3} >
            <Paper >
              <Table >
                <TableHead  >
                  <TableRow>
                    <TableCell colSpan="3" >Bids</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell>Size</TableCell>
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
            </Paper>
          </Grid>
          <Grid item xs={6}>
              <TwitterTimeline widgetId="912461228252987392" chrome="noborders noheader" />
          </Grid>
        </Grid>
      </div >

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
