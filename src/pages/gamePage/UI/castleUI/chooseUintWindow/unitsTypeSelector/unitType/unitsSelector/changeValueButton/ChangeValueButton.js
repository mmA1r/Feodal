import './changeValueButton.scss';

export default function ChangeValueButton(props) {

    const { sign } = props;

    return (
        <svg className='change-value-button'viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <rect className='change-value-button-background' x="0.5" y="0.5"rx="1.5"/>
            <path className='change-value-button-angle' d="M25.3953 4.60471L26.5135 1.25H28.75V3.48648L25.3953 4.60471ZM1.25 3.48648V1.25H3.48648L4.60472 4.60472L1.25 3.48648ZM4.60471 25.3953L3.48648 28.75H1.25V26.5135L4.60471 25.3953ZM28.75 26.5135V28.75H26.5135L25.3953 25.3953L28.75 26.5135Z"/>
            { sign === 'minus' ? 
                <path className='change-value-button-icon' d="M8.25 13.75H21.75V16.25H8.25V13.75Z"/> : 
                <path className='change-value-button-icon' d="M13.3846 13.6346H13.6346V13.3846V8.25H16.3654V13.3846V13.6346H16.6154H21.75V16.3654H16.6154H16.3654V16.6154V21.75H13.6346V16.6154V16.3654H13.3846H8.25V13.6346H13.3846Z"/>
            }
        </svg>
    );
}