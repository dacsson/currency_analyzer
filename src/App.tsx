import React, { useEffect, useState, useRef } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import Header from './components/Header';
import Info from './components/Info';
import Graph from './components/Chart';

function App() {

  const [currencyId, setCurrencyId] = useState<number>(0);

  // Данные из data.tsx (который через апи идут) сразу сериализируем по валютам
  const [dollarVals, setDollarVals] = useState<Array<number>>([]);
  const [euroVals, setEuroVals] = useState<Array<number>>([]);
  const [yenVals ,setYenVals] = useState<Array<number>>([]);

  const [dates, setDates] = useState<Array<string>>([]);

  const effectRan = useRef(false);

  // Object type the we get from API 
  type data_record = {
    date: string;
    month: string;
    indicator: string;
    value: number;
    id: number;
  }

  const serialize_data = (data : Array<data_record>) => 
  {
    data.forEach((el) => {
      
      switch (el.indicator) {
        case "Курс доллара":
          setDollarVals(dollarVals => [...dollarVals, el.value]);
          setDates(dates => [...dates, el.month]);
          break;
        case "Курс евро":
          setEuroVals(euroVals => [...euroVals, el.value]);
          break;
        case "Курс юаня":
          setYenVals(yenVals => [...yenVals, el.value]);
          break;  
        default:
          break;
      }
    });
  }

  const form_chart_data = (currency_values : Array<number>) =>
  {
    var graph_data = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: '<b>{b0}</b><br/>Курс валюты <b>{c0}</b>'
      },
      xAxis: {
        type: 'category',
        data: [...dates],
        axisLine: {
          show: false,
          onZero: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: currency_values,
          type: 'line',
          smooth: true,
          color: ["#e68200"]
        }
      ]
    };

    console.log(graph_data);
    console.log("dollar", dollarVals, "dates", dates)
    return graph_data;
  }

  useEffect(() => {
    if (!effectRan.current) {
      fetch("https://65dbadf83ea883a1529217c3.mockapi.io/api/currency_values")
      .then(
        res => res.json()
      )
      .then(
        curr_data => { 
          console.log(curr_data)
          serialize_data(curr_data)
        }
      )
    }
  
    effectRan.current = true;
  }, []);

  return (
    <Theme className='body-container' preset={presetGpnDefault}>
      <Header currencyId={currencyId} setCurrencyId={setCurrencyId} />

      <div className='main-container'>
        <Graph graph_data={form_chart_data(
          currencyId == 0 ? dollarVals
          :
          currencyId == 1 ? euroVals
          :
          yenVals
        )}/>
        <Info currency_values={
          currencyId == 0 ? dollarVals
          :
          currencyId == 1 ? euroVals
          :
          yenVals
        }/>
      </div>
    </Theme>
  );
}

export default App;
