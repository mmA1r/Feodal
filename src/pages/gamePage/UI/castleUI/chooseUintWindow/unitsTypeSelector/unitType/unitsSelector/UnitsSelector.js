import { useEffect, useRef } from 'react';
import ChangeValueButton from './changeValueButton/ChangeValueButton';
import './unitsSelector.scss';

export default function UnitsSelector(props) {
    const { units, damaged, type } = props;
    const rangeInput = useRef();
    const numberInput = useRef();

    useEffect(() => {
        rangeInput.current.value = 0;
        numberInput.current.value = 0;
    }, []);

    function onInputchange() {
        if(numberInput.current.value > units.length) {
            numberInput.current.value = units.length;
        }
        if(numberInput.current.value) {
            rangeInput.current.value = numberInput.current.value;
        } else {
            rangeInput.current.value = 0;
        }
    }

    function increase() {
        if(numberInput.current.value < units.length) {
            numberInput.current.value++;
            rangeInput.current.value++;
        }
    }

    function decrease() {
        if(numberInput.current.value > 0) {
            numberInput.current.value--;
            rangeInput.current.value--;
        }
    }

    function onRangechange() {
        return numberInput.current.value = rangeInput.current?.value;
    }

    return (
        <div className='units-selector'>
            <div className={`${damaged ? 'damaged': 'full'}-${type}-selector-image`}/>
            <input 
                className={`units-selector-input-range ${type}-${damaged ? 'damaged': 'full'}`}
                ref={rangeInput}
                onChange={() => onRangechange()}
                type={'range'} 
                min={0} 
                max={units.length}
            />
            <div className='units-selector-input-box'>
                <button
                    className='units-selector-input-button'
                    onClick={() => decrease()} 
                >
                    <ChangeValueButton sign={'minus'}/>
                </button>
                <input
                    className='units-selector-input'
                    ref={numberInput}
                    type={'number'}
                    onChange={() => onInputchange()}
                />
                <button
                    className='units-selector-input-button'
                    onClick={() => increase()} 
                >
                    <ChangeValueButton sign={'plus'}/>
                </button>
            </div>
        </div>
    );
}