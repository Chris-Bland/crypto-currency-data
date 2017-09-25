
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
            return [dataObj.time, dataObj.open, dataObj.high, dataObj.low, dataObj.close]
        })
    }
    formatVolumeData(){
        const {chartData} = this.props
        const sortedVolumeData = _.sortBy(chartData, 'time')
        return sortedVolumeData.map((dataObj)=>{
            console.log('TIME VOLUME: ', [dataObj.time, dataObj.volume])
            return[dataObj.time, dataObj.volume]

        })
    }

    render() {
        // const config = {

        //     rangeSelector: {
        //         selected: 1
        //     },

        //     title: {
        //         text: 'Bitcoin Price Data'
        //     },

        //     series: [{
        //         type: 'candlestick',
        //         name: 'Bitcoin Price',
        //         data: this.formatPriceData(),
        //         dataGrouping: {
        //             units: [
        //                 [
        //                     'minutes', 
        //                     [1] 
        //                 ], [
        //                     'hours',
        //                     [1]
        //                 ]
        //             ]
        //         }
        //     }]
        // }
        const config = {
            
                    rangeSelector: {
                        selected: 1
                    },
            
                    title: {
                        text: 'AAPL Historical'
                    },
            
                    yAxis: [{
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'OHLC'
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
                        type: 'candlestick',
                        name: 'AAPL',
                        data: this.formatPriceData(),
                        dataGrouping: {
                            units: [[
                                'week',                         // unit name
                                [1]                             // allowed multiples
                            ], [
                                'month',
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
                                'week',                         // unit name
                                [1]                             // allowed multiples
                            ], [
                                'month',
                                [1, 2, 3, 4, 6]
                            ]]
                        }
                    }]
                }


        return (
          <ReactHighstock config={config}></ReactHighstock >

        )
    }
}
