import { useState } from 'react';
import { ReactECharts } from '../Echarts/ReactECharts';
import '../style.css';

interface IGraphData
{
    graph_data : any;
}

/**
 * Wrapper для графа 
 */
export default function Graph({graph_data} : IGraphData)
{
    return(
        <div className='graph-container'>
            <ReactECharts
                option={graph_data}
                forceResize={true}
                // style={{ width: '70vw'}}
            />
        </div>
    );
}