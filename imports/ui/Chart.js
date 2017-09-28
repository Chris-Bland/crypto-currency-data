
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
    formatPriceData() {
        const { chartData } = this.props
        const sortedChartData = _.sortBy(chartData, 'time')

        return sortedChartData.map((dataObj) => {
            var time = dataObj.time + '000';
            return [parseInt(time), dataObj.open, dataObj.high, dataObj.low, dataObj.close]
        })
    }
    formatVolumeData() {
        const { chartData } = this.props
        const sortedVolumeData = _.sortBy(chartData, 'time')
        return sortedVolumeData.map((dataObj) => {
            var time = dataObj.time + '000';
            return [parseInt(time), dataObj.volume]

        })
    }

    render() {
        const config = {
            rangeSelector: {
                selected: 1,
            },
            title: {
                text: 'Currency Historical'
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
            },
            {
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
                color: "red",
                upColor: 'green',
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
            }],
            colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063'
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3' //time below volume
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'

                    }
                }
            },
            // yAxis: {
            //     gridLineColor: '#707073',
            //     labels: {
            //         style: {
            //             color: '#E0E0E3'
            //         }
            //     },
            //     lineColor: '#707073',
            //     minorGridLineColor: '#505053',
            //     tickColor: '#707073',
            //     tickWidth: 1,
            //     title: {
            //         style: {
            //             color: '#A0A0A3'
            //         }
            //     }
            // },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#B0B0B3'
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            legend: {
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },

            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },

            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },

            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#CCC'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },

            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },

            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            },

            // special colors for some of the
            legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
            background2: '#505053',
            dataLabelsColor: '#B0B0B3',
            textColor: '#C0C0C0',
            contrastTextColor: '#F0F0F3',
            maskColor: 'rgba(255,255,255,0.3)'
        }







        return (
            <div className="chart">
                <ReactHighstock config={config}></ReactHighstock >
            </div>
        )
    }
}
