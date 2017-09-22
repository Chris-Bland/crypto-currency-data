
import React from 'react';
var ReactHighstock = require('react-highcharts/ReactHighstock.src');
var Highlight = require('react-highlight');
var ReactDOM = require('react-dom');
import _ from 'lodash';
export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.formatData = this.formatData.bind(this);

    }
    formatData(){
        const {chartData} = this.props
        console.log("PROPS: ", this.props);

        const sortedChartData = _.sortBy(chartData, 'time')
     
        return sortedChartData.map((dataObj)=>{
            return [dataObj.time, dataObj.open, dataObj.high, dataObj.low, dataObj.close]
        })

    }



    render() {
        console.log('FORMAT DATA: ', this.formatData());
    
        const config = {

            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'AAPL Stock Price'
            },

            series: [{
                type: 'candlestick',
                name: 'AAPL Stock Price',
                data: this.formatData(),
                dataGrouping: {
                    units: [
                        [
                            'minutes', 
                            [1] 
                        ], [
                            'hours',
                            [1]
                        ]
                    ]
                }
            }]
        }


        return (
          <ReactHighstock config={config}></ReactHighstock >

        )
    }
}
