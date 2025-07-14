// components/SensorOscillatorPlot.js
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

// Adapted calculation for sensor data
const calculateSensorOscillator = (data, period = 14, smoothing = 3) => {
    if (!data || data.length === 0) return [];
    
    const timestamps = data.map(d=>d.launchdate);
    const kValues = [];
    const dValues = [];
	
    // For %K, use the pre-calculated min/max in period or re-calculate dynamically
    // For simplicity, let's assume min_in_period and max_in_period are provided or can be calculated
    for (let i = 0; i < data.length; i++) {
        const currentData = data[i];
        const currentVal = currentData.average;
        const periodLow = currentData.min; // Or calculate dynamically over a window
        const periodHigh = currentData.max; // Or calculate dynamically over a window

        let k = 0;
        if (periodHigh !== periodLow) {
            k = ((currentVal - periodLow) / (periodHigh - periodLow)) * 100;
        }
        kValues.push(k);
    }

    // Calculate %D (3-period Simple Moving Average of %K)
    // This part remains similar to the stock example
    for (let i = smoothing - 1; i < kValues.length; i++) {
        const sumK = kValues.slice(i - smoothing + 1, i + 1).reduce((acc, val) => acc + val, 0);
        const d = sumK / smoothing;
        dValues.push(d);
    }
	
    // Align timestamps for %D
    const alignedTimestamps = timestamps.slice(smoothing - 1); // Note: Simplified for this example, ensure correct indexing
	
    return alignedTimestamps.map((ts, index) => ({
        timestamp: ts,
        k: kValues[index + (smoothing - 1)],
        d: dValues[index]
    }));
};


export default function SensorOscillatorPlot({ sensorData }) {
    const [plotData, setPlotData] = useState([]);
    const [plotLayout, setPlotLayout] = useState({});

    useEffect(() => {
        if (sensorData && sensorData.length > 0) {
            const oscillatorValues = calculateSensorOscillator(sensorData);

            const kLine = {
                x: oscillatorValues.map(s => s.timestamp),
                y: oscillatorValues.map(s => s.k),
                type: 'scatter',
                mode: 'lines',
                name: '%K (Sensor Value Relative)',
                line: { color: 'blue' }
            };

            const dLine = {
                x: oscillatorValues.map(s => s.timestamp),
                y: oscillatorValues.map(s => s.d),
                type: 'scatter',
                mode: 'lines',
                name: '%D (Smoothed Sensor Relative)',
                line: { color: 'red' }
            };

            // Add "normal range" or "alert" thresholds, similar to overbought/oversold
            const upperThreshold = {
                x: oscillatorValues.map(s => s.timestamp),
                y: Array(oscillatorValues.length).fill(90), // Example: 90% as upper normal bound
                type: 'scatter',
                mode: 'lines',
                name: 'Upper Threshold (90)',
                line: { color: 'green', dash: 'dash' }
            };

            const lowerThreshold = {
                x: oscillatorValues.map(s => s.timestamp),
                y: Array(oscillatorValues.length).fill(10), // Example: 10% as lower normal bound
                type: 'scatter',
                mode: 'lines',
                name: 'Lower Threshold (10)',
                line: { color: 'orange', dash: 'dash' }
            };


            setPlotData([kLine, dLine, upperThreshold, lowerThreshold]);

            setPlotLayout({
                title: 'Sensor Value Oscillator (Stochastic-like)',
                xaxis: { title: 'Time' },
                yaxis: {
                    title: 'Relative Value (0-100%)',
                    range: [0, 100]
                },
                autosize: true,
                margin: { t: 50, b: 50, l: 50, r: 50 },
                hovermode: 'x unified',
                legend: { orientation: 'h', yanchor: 'bottom', y: 1.02, xanchor: 'right', x: 1 }
            });
        }
    }, [sensorData]);

    if (!plotData.length) {
        return <div>Loading Sensor data...</div>;
    }

    return (
        <footer className="flex-2" style={{ width: '100%', height: '400px' }}>
            <h2>{'Stochastic'}</h2>
	        <Plot
                data={plotData}
                layout={plotLayout}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%' }}
            />
        </footer>
    );
}

