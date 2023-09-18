import React from "react";
import { useLocation } from "react-router-dom";


const NotFound404 = () => {
    return (
        <div>
            <h1>Страница по адресу '{useLocation().pathname}' не найдена</h1>
        </div>
    )
}

export default NotFound404;