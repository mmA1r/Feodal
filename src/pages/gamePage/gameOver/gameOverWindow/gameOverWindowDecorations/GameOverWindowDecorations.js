import React from "react"


export default function GameOverWindowDecorations(props){
    const {borders, corners} = props;

    return(
        <div className='game-over-window-decorations'>
            {borders ?
            <div id='gameOverWindowBorderDecorations'>
                <svg id='gameOverWindowDecorationTopLeftBorder' width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.404 0L20.8079 14.8793L10.404 10.2395L0 14.8793L10.404 0Z" fill="#836808"/>
                    <path d="M10.404 7.69011L20.8079 22.5694L10.404 17.9297L0 22.5694L10.404 7.69011Z" fill="#836808"/>
                    <path d="M10.8994 1.30208L16.8445 10.8507L10.8994 9.54861L8.91769 10.4167L10.8994 1.30208Z" fill="#AA870A"/>
                    <path d="M10.8994 7.8125L16.8445 17.3611L10.8994 16.059L8.91769 16.9271L10.8994 7.8125Z" fill="#AA870A"/>
                </svg>
                <svg id='gameOverWindowDecorationLeftOuterBorder' width="6" height="218" viewBox="0 0 6 218" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.926819 0.361115H5.88109V217.375H0.926819V0.361115Z" fill="#836808"/>
                </svg>
                <svg id='gameOverWindowDecorationLeftInnerBorder' width="6" height="188" viewBox="0 0 6 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="6" height="188" fill="#5E3C23"/>
                </svg>

                <svg id='gameOverWindowDecorationBottomLeftBorder' width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.404 0L20.8079 14.8793L10.404 10.2395L0 14.8793L10.404 0Z" fill="#836808"/>
                    <path d="M10.404 7.69011L20.8079 22.5694L10.404 17.9297L0 22.5694L10.404 7.69011Z" fill="#836808"/>
                    <path d="M10.8994 1.30208L16.8445 10.8507L10.8994 9.54861L8.91769 10.4167L10.8994 1.30208Z" fill="#AA870A"/>
                    <path d="M10.8994 7.8125L16.8445 17.3611L10.8994 16.059L8.91769 16.9271L10.8994 7.8125Z" fill="#AA870A"/>
                </svg>

                <svg id='gameOverWindowDecorationTopOuterBorder' width="626" height="4" viewBox="0 0 626 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.881104" y="0.777771" width="624.238" height="2.60417" fill="#836808"/>
                </svg>
                <svg id='gameOverWindowDecorationTopInnerBorder' width="618" height="6" viewBox="0 0 618 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="6" width="6" height="618" transform="rotate(-90 0 6)" fill="#5E3C23"/>
                </svg>

                <svg id='gameOverWindowDecorationTopRightBorder' width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.404 0L20.8079 14.8793L10.404 10.2395L0 14.8793L10.404 0Z" fill="#836808"/>
                    <path d="M10.404 7.69011L20.8079 22.5694L10.404 17.9297L0 22.5694L10.404 7.69011Z" fill="#836808"/>
                    <path d="M10.8994 1.30208L16.8445 10.8507L10.8994 9.54861L8.91769 10.4167L10.8994 1.30208Z" fill="#AA870A"/>
                    <path d="M10.8994 7.8125L16.8445 17.3611L10.8994 16.059L8.91769 16.9271L10.8994 7.8125Z" fill="#AA870A"/>
                </svg>
                <svg id='gameOverWindowDecorationRightOuterBorder' width="6" height="218" viewBox="0 0 6 218" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.926819 0.361115H5.88109V217.375H0.926819V0.361115Z" fill="#836808"/>
                </svg>
                <svg id='gameOverWindowDecorationRightInnerBorder' width="6" height="188" viewBox="0 0 6 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="6" height="188" fill="#5E3C23"/>
                </svg>
                <svg id='gameOverWindowDecorationBottomRightBorder' width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.404 0L20.8079 14.8793L10.404 10.2395L0 14.8793L10.404 0Z" fill="#836808"/>
                    <path d="M10.404 7.69011L20.8079 22.5694L10.404 17.9297L0 22.5694L10.404 7.69011Z" fill="#836808"/>
                    <path d="M10.8994 1.30208L16.8445 10.8507L10.8994 9.54861L8.91769 10.4167L10.8994 1.30208Z" fill="#AA870A"/>
                    <path d="M10.8994 7.8125L16.8445 17.3611L10.8994 16.059L8.91769 16.9271L10.8994 7.8125Z" fill="#AA870A"/>
                </svg>

                <svg id='gameOverWindowDecorationBottomOuterBorder' width="626" height="4" viewBox="0 0 626 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.881104" y="0.777771" width="624.238" height="2.60417" fill="#836808"/>
                </svg>
                <svg id='gameOverWindowDecorationBottomInnerBorder' width="618" height="6" viewBox="0 0 618 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="6" width="6" height="618" transform="rotate(-90 0 6)" fill="#5E3C23"/>
                </svg>
            </div>
            : ''}

            {corners ?
            <div id='gameOverWindowCornerDecorations'>
                 <svg id='gameOverWindowDecorationBottomLeftCorner' width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect y="42" width="21" height="21" transform="rotate(-90 0 42)" fill="#5E3C23"/>
                     <rect x="4" y="38" width="14" height="14" transform="rotate(-90 4 38)" fill="#644229"/>
                     <rect x="11" y="38" width="9.8995" height="9.8995" transform="rotate(-135 11 38)" fill="#5E3C23"/>
                     <rect x="11" y="35.6667" width="6.59966" height="6.59966" transform="rotate(-135 11 35.6667)" fill="#644229"/>
                     <path d="M26 42V26H30V33H33.5H35V38H42V42H26Z" fill="#5E3C23"/>
                     <path d="M0 16L0 0H4V7H7.5H9V12H16V16H0Z" fill="#5E3C23"/>
                 </svg>
                 <svg id='gameOverWindowDecorationTopLeftCorner' width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect y="42" width="21" height="21" transform="rotate(-90 0 42)" fill="#5E3C23"/>
                     <rect x="4" y="38" width="14" height="14" transform="rotate(-90 4 38)" fill="#644229"/>
                     <rect x="11" y="38" width="9.8995" height="9.8995" transform="rotate(-135 11 38)" fill="#5E3C23"/>
                     <rect x="11|" y="35.6667" width="6.59966" height="6.59966" transform="rotate(-135 11 35.6667)" fill="#644229"/>
                     <path d="M26 42V26H30V33H33.5H35V38H42V42H26Z" fill="#5E3C23"/>
                     <path d="M0 16L0 0H4V7H7.5H9V12H16V16H0Z" fill="#5E3C23"/>
                 </svg>
                 <svg id='gameOverWindowDecorationTopRightCorner' width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect y="42" width="21" height="21" transform="rotate(-90 0 42)" fill="#5E3C23"/>
                     <rect x="4" y="38" width="14" height="14" transform="rotate(-90 4 38)" fill="#644229"/>
                     <rect x="11" y="38" width="9.8995" height="9.8995" transform="rotate(-135 11 38)" fill="#5E3C23"/>
                     <rect x="11" y="35.6667" width="6.59966" height="6.59966" transform="rotate(-135 11 35.6667)" fill="#644229"/>
                     <path d="M26 42V26H30V33H33.5H35V38H42V42H26Z" fill="#5E3C23"/>
                     <path d="M0 16L0 0H4V7H7.5H9V12H16V16H0Z" fill="#5E3C23"/>
                 </svg>
                 <svg id='gameOverWindowDecorationBottomRightCorner' width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect y="42" width="21" height="21" transform="rotate(-90 0 42)" fill="#5E3C23"/>
                     <rect x="4" y="38" width="14" height="14" transform="rotate(-90 4 38)" fill="#644229"/>
                     <rect x="11" y="38" width="9.8995" height="9.8995" transform="rotate(-135 11 38)" fill="#5E3C23"/>
                     <rect x="11" y="35.6667" width="6.59966" height="6.59966" transform="rotate(-135 11 35.6667)" fill="#644229"/>
                     <path d="M26 42V26H30V33H33.5H35V38H42V42H26Z" fill="#5E3C23"/>
                     <path d="M0 16L0 0H4V7H7.5H9V12H16V16H0Z" fill="#5E3C23"/>
                 </svg>


                <svg id='gameOverWindowDecorationLogoutButtonTopLeftCorner' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="10" fill="#9B9B9B"/>
                </svg>
                <svg id='gameOverWindowDecorationLogoutButtonTopRightCorner' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="10" fill="#9B9B9B"/>
                </svg>
                <svg id='gameOverWindowDecorationLogoutButtonBottomLeftCorner' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="10" fill="#9B9B9B"/>
                </svg>
                <svg id='gameOverWindowDecorationLogoutButtonBottomRightCorner' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="10" fill="#9B9B9B"/>
                </svg>

                <svg id='gameOverWindowDecorationTryAgainButtonTopLeftCorner' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="10" fill="#9B9B9B"/>
                </svg>
                <svg id='gameOverWindowDecorationTryAgainButtonTopRightCorner' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="10" fill="#9B9B9B"/>
                </svg>
                <svg id='gameOverWindowDecorationTryAgainButtonBottomLeftCorner' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="10" fill="#9B9B9B"/>
                </svg>
                <svg id='gameOverWindowDecorationTryAgainButtonBottomRightCorner' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="10" fill="#9B9B9B"/>
                </svg>
            </div>
            : ''}
        </div>
    );
}