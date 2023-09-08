import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

type Option = echarts.EChartsOption;

export default () => {

    const canvas = useRef<HTMLDivElement>(null);
    useEffect(() => {

        const option: Option = {
            title: {
                text: 'Basic Graph'
            },
            tooltip: {

            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',

            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        show: true
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                    draggable: true,
                    data: [
                        {
                            name: '0',
                            x: 300,
                            y: 300
                        },
                        {
                            name: '1',
                            x: 800,
                            y: 300
                        },
                        {
                            name: '2',
                            x: 550,
                            y: 100
                        },
                        {
                            name: '3',
                            x: 550,
                            y: 500
                        },
                        {
                            name: '3',
                            x: 550,
                            y: 500
                        }
                    ],
                    // links: [],
                    links: [
                        {
                            source: 0,
                            target: 1,
                            symbolSize: [5, 20],
                            label: {
                                show: true
                            },
                            lineStyle: {
                                width: 5,
                                curveness: 0.2
                            }
                        },
                        {
                            source: 'Node 2',
                            target: 'Node 1',
                            label: {
                                show: true
                            },
                            lineStyle: {
                                curveness: 0.2
                            }
                        },
                        {
                            source: 'Node 1',
                            target: 'Node 3'
                        },
                        {
                            source: 'Node 2',
                            target: 'Node 3'
                        },
                        {
                            source: 'Node 2',
                            target: 'Node 4'
                        },
                        {
                            source: 'Node 1',
                            target: 'Node 4'
                        }
                    ],
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            ]
        };
        echarts.init(canvas.current).setOption(option);
    })
    return <div ref={canvas} style={{ width: '100%', minHeight: '50vmin' }}></div>
}

