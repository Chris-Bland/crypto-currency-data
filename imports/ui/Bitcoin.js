import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Chart from './Chart'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import numeral from 'numeral';

import Loading from './Loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  componentWillUpdate(nextProps, nextState) {
    if (!this.props.loading) {
      const { percentChange } = this.props.bitcoin;
      const { percentLimit } = nextProps;
      const audio = new Audio('/alert.mp3');

      if (Math.abs(percentChange) >= Math.abs(percentLimit) && !this.state.open) {
        audio.play()
      }
    }
  }

  render() {
    if (this.props.loading) return (<Loading />)
    const { averagePrice, percentChange, price } = this.props.bitcoin;
    const { percentLimit } = this.props
    const movedColor = percentChange > 0 ? 'green' : 'red';

    return (

      <div className='bitcoin-container'>
        <div className="header">
          <h1>Bitcoin</h1>
        </div>
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
        <div className="books">
          <Table >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Price</TableHeaderColumn>
                <TableHeaderColumn>Size</TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn colSpan="3" tooltip="Super Header">
                  Asks
              </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} className="asks" >
              {
                this.props.bitcoin.parsedBook.asks.map(({ price, size, number }, i) => {

                  return (
                    <TableRow key={i}>
                      <TableRowColumn>{price}</TableRowColumn>
                      <TableRowColumn>{size}</TableRowColumn>
                    </TableRow>
                  )

                })
              }
            </TableBody>
          </Table>
          <Table >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn colSpan="3" tooltip="Super Header" >
                  Bids
              </TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody displayRowCheckbox={false} className="bids" >
              {
                this.props.bitcoin.parsedBook.bids.map(({ price, size, number }, i) => {

                  return (
                    <TableRow key={i}>
                      <TableRowColumn>{price}</TableRowColumn>
                      <TableRowColumn>{size}</TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
              <Chart chartData={this.props.bitcoin.chartData}/>
      </div>
    )
  }
}

const getBitCoinData = gql`
  query {
    bitcoin {
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

const withData = graphql(getBitCoinData, {
  options: ({ }) => {
    return ({
      pollInterval: 3000,
      variables: {

      },
    })
  },
  props: ({ data: { bitcoin, error, loading, refetch } }) => {
    return {
      bitcoin,
      refetch,
      loading,
      error
    };
  },
});

export default withData(App);
