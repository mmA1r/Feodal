import { useSelector } from 'react-redux';
import './hintHover.scss';

export default function HintHover() {

    const hintValues = useSelector((state) => state.hoverHint);

    const soldier = useSelector((state) => state.soldier);
    const assassin = useSelector((state) => state.assassin);

    const type = hintValues.type;

    const style = {
        top: hintValues.top,
        left: hintValues.left,
    }

    return (
        <div
            className={`hint-hover-box ${ hintValues.state ? 'hint-active' : 'hint-inactive' }` }
            style={style}
        >
            {   
                type === 'castle' ?
                    <p className='paragraph-low'>Поднять уровень</p>
                : type === 'soldier' ?
                    <div>
                        <p className='paragraph'>Нанять солдата:</p>
                        <p className='paragraph-low'>Здоровье: {soldier.hp}</p>
                        <p className='paragraph-low'>Урон: {soldier.damage}</p>
                        <p className='paragraph-low'>Скорость: {soldier.speed}</p>
                    </div>
                : type === 'assassin' ?
                    <div>
                        <p className='paragraph'>Нанять убийцу:</p>
                        <p className='paragraph-low'>Здоровье: {assassin.hp}</p>
                        <p className='paragraph-low'>Урон: {assassin.damage}</p>
                        <p className='paragraph-low'>Скорость: {assassin.speed}</p>
                    </div>
                : type === 'unitsOut' ?
                    <p className='paragraph-low'>Вывести юнитов из замка</p>
                : type === 'castleUI' ?
                    <div>
                        <p className='paragraph-low'>Открыть интерфейс замка</p>
                    </div>
                : type === 'money' ?
                    <p className='paragraph-low'>Золото игрока</p>
                : type === 'might' ?
                    <p className='paragraph'>Мощь игрока</p>
                : type === 'logout' ?
                    <p className='paragraph'>Выйти</p>
                : type === 'attack' ?
                    <p className='paragraph-low'>Атаковать</p>
                : type === 'stop' ?
                    <p className='paragraph-low'>Остановиться</p>
                : type === 'move' ?
                    <p className='paragraph-low'>Перемеще</p>
                : ''
            }
        </div>
    );
}