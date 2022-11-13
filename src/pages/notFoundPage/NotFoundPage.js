import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import './notFoundPage.scss';

export default function NotFoundPage() {

    const navigate = useNavigate();
    const route = useSelector((state) => state.routes.value);

    const returnHomePage = () => {
        return navigate(route.Login.path);
    }

    return(
        <div className="not-found-page">
            <div className="to-home-page">
                <p className="error-code">404</p>
                <p className="link-home-text">page not found.</p>
                <p className="link-home-text">
                    Let`s go <button 
                        className="return-home"
                        onClick={() => returnHomePage()}
                    >home</button>, wanderer
                </p>
            </div>
        </div>
    );
}