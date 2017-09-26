
import React from 'react';
var ReactHighstock = require('react-highcharts/ReactHighstock.src');
var Highlight = require('react-highlight');
var ReactDOM = require('react-dom');
import _ from 'lodash';
export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.formatPriceData = this.formatPriceData.bind(this);
        this.formatVolumeData = this.formatVolumeData.bind(this);

    }
    formatPriceData(){
        const {chartData} = this.props
        const sortedChartData = _.sortBy(chartData, 'time')
        return sortedChartData.map((dataObj)=>{
            var time = dataObj.time + '000';
            return [parseInt(time), dataObj.open, dataObj.high, dataObj.low, dataObj.close]
        })
    }
    formatVolumeData(){
        const {chartData} = this.props
        const sortedVolumeData = _.sortBy(chartData, 'time')
        return sortedVolumeData.map((dataObj)=>{
            var time = dataObj.time + '000';
            console.log('Time: ', time);
            console.log('dataObj.time: ', dataObj.time);
            return[parseInt(time), dataObj.volume ]
        
        })
    }

    render() {
        const config = {
            
            
                    rangeSelector: {
                        selected: 1
                    },
            
                    title: {
                        text: 'Bitcoin Historical'
                    },
            
                    yAxis: [{
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'GDAX'
                        },
                        height: '60%',
                        lineWidth: 2
                    }, {
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'Volume'
                        },
                        top: '65%',
                        height: '35%',
                        offset: 0,
                        lineWidth: 2
                    }],
            
                    tooltip: {
                        split: true
                    },
            
                    series: [{
                        type: 'candlestick', color: "red",
                        name: 'BTC',
                        data: this.formatPriceData(),
                        dataGrouping: {
                            units: [[
                                'minute',                         
                                [1]                             
                            ], [
                                'hour',
                                [1, 2, 3, 4, 6]
                            ]]
                        }
                    }, {
                        type: 'column',
                        name: 'Volume',
                        data: this.formatVolumeData(),
                        yAxis: 1,
                        dataGrouping: {
                            units: [[
                                'minute',                         
                                [1]                             
                            ], [
                                'hour',
                                [1, 2, 3, 4, 6]
                            ]]
                        }
                    }]
                }


        return (
            <div className="chart">
          <ReactHighstock config={config} ></ReactHighstock >
          </div>

        )
    }
}
