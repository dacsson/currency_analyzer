import { useState } from 'react';
import { Card } from '@consta/uikit/Card';
import { Text} from '@consta/uikit/Text';
import '../style.css';

interface IInfoData
{
    currency_values: Array<number> | undefined;
}

/**
 * Компонент для отображения информации о среднем значении в рублях за некий период
 */
export default function Info({currency_values} : IInfoData)
{
    const find_avrg = () =>
    {
        let sum = 0;
        currency_values?.forEach(val => {
            sum += val;
        });
        console.log(sum, sum / currency_values?.length)
        return (sum / currency_values?.length).toPrecision(4);
    }

    return(
        <div className='info-container'>
            <Card shadow={false} verticalSpace='xl' horizontalSpace='xl'>
                <h1>Среднее за период</h1>
                <a>{find_avrg()} ₽</a>
            </Card>
        </div>
    );
}