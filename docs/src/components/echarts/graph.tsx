import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

type Option = echarts.EChartsOption;

export default () => {

    const canvas = useRef<HTMLDivElement>(null);
    useEffect(() => {

        const option: Option = {
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
                    scaleLimit: {
                        min: 1,
                        max: 1
                    },
                    draggable: true,
                    data: [
                        {
                            name: '0',
                            x: 50,
                            y: 100
                        },
                        {
                            name: '1',
                            x: 100,
                            y: 200
                        },
                        {
                            name: '2',
                            x: 150,
                            y: 300
                        },
                        {
                            name: '3',
                            x: 200,
                            y: 400
                        },
                        {
                            name: '4',
                            x: 250,
                            y: 500
                        }
                    ],
                    links: [

                        {
                            source: 4,
                            target: 3,
                        },
                        {
                            source: 3,
                            target: 2,
                        },
                        {
                            source: 2,
                            target: 1,
                        },
                        {
                            source: 1,
                            target: 0,
                        },
                        {
                            source: 4,
                            target: 0,
                            lineStyle: {
                                width: 5,
                                curveness: -1
                            }
                        },
                        {
                            source: 4,
                            target: 1,
                            lineStyle: {
                                curveness: -1
                            }
                        },
                        {
                            source: 4,
                            target: 2,
                            lineStyle: {
                                curveness: - 1
                            }
                        },

                        {
                            source: 3,
                            target: 0,
                            lineStyle: {
                                curveness: 1
                            }
                        },
                        {
                            source: 3,
                            target: 1,
                            lineStyle: {
                                curveness: 1
                            }
                        },
                        {
                            source: 2,
                            target: 0,
                            lineStyle: {
                                curveness: 1
                            }
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

