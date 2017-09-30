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
import Icon from 'material-ui/Icon';

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
    }
  }

  render() {
    if (this.props.loading) return (<Loading />)
    const { averagePrice, percentChange, price, openPrice } = this.props.currency;
    const movedColor = percentChange > 0 ? 'green' : 'red';
    const arrowColor = percentChange > 0 ? './green.png' : './red.png';
    const currencyMoved = price - openPrice;
    return (
      <div className='currency-container' >
        <Grid container spacing={8} direction='row'>
          <Grid item xs={12}>
            <div className={`info-container ${movedColor}`}>
              <div className='btcTitle currencyBarBlack'>{this.props.currencyType}  </div>
              <div className='price currencyBarBlack'>{numeral(price).format('$0,0.00')}  </div>
              <div className={`currencyMoved ${movedColor}`}>{numeral(Math.abs(currencyMoved)).format('0,0.00')}  </div>
              <img className="arrow" src={`${arrowColor}`} alt="arrow" />
              <div className={`percentChange ${movedColor}`}>{numeral(Math.abs(percentChange)).format('0.00%')}  </div>
            </div>
          </Grid>

          <Grid item xs={12} >
            <Paper > <Chart className="chartComponent" chartData={this.props.currency.chartData} currencyType={this.props.currencyType}/> </Paper>
          </Grid>
            <Grid item xs={3} sm={3}>
              <Paper style={{backgroundColor: '#424242', padding:'4px', borderRadius: '5px'}}>
                <Table>
                <TableHead  >
                  <TableRow >
                    <TableCell className='ask'  >Size</TableCell>
                    <TableCell className='ask'>Asks</TableCell>
                  </TableRow>
                </TableHead>
                  <TableBody className="asks" >
                    {
                      this.props.currency.parsedBook.asks.map(({ price, size, number }, i) => {
                        return (
                          <TableRow key={i} >
                            <TableCell className='ask' >{size}</TableCell>
                            <TableCell className='ask'>{price}</TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={3} sm={3} >
              <Paper style={{backgroundColor: '#424242', padding:'4px', borderRadius: '5px'}} >
                <Table >
                  <TableHead  >
                    <TableRow style={{ }}>
                      <TableCell className='bid'>Bids</TableCell>
                      <TableCell className='bid'>Size</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="bids" >
                    {
                      this.props.currency.parsedBook.bids.map(({ price, size, number }, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell className='bid'>{price}</TableCell>
                            <TableCell className='bid'>{size}</TableCell>
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
      openPrice
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
