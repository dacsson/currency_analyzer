import { ChoiceGroup, ChoiceGroupPropOnChange } from '@consta/uikit/ChoiceGroup';
import '../style.css';

interface IHeaderData
{
    currencyId: number;
    setCurrencyId: Function;
}

/**
 * Компонент для отображения названия и управления выбора валютой
 */
export default function Header({currencyId, setCurrencyId} : IHeaderData)
{
    const currencyList : Array<string> = ["ДОЛЛАРА", "ЕВРО","ЮАНЯ"];
    const currencyIcons : Array<string> = ["$", "€", "¥"];


    return(
        <div className='header-container'>
            <h1>КУРС {currencyList[currencyId]}, {currencyIcons[currencyId]}/Р</h1>
            
            <ChoiceGroup
                className='choice-group'
                value={currencyIcons[currencyId]}
                onChange={(event) => {console.log(event.value); setCurrencyId(currencyIcons.indexOf(event.value))}}
                items={currencyIcons}
                getItemLabel={(item) => item}
                multiple={false}
                name="Currency Choice"
                size='l'
            />
        </div>
    );
}