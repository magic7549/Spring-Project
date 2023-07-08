import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import ValidateToken from "./Authentication";

//로그인 유저만 접근 가능
function PrivateRoute() {
    const [v, setV] = useState('');
    useEffect(() => {
        async function isValid() {
            const result = await ValidateToken();
            console.log("PrivateRoute : " + result);
            if (!result) {
                alert("로그인이 필요한 기능입니다.");
                setV(<Navigate to="/login" />);
            }
            else {
                setV(<Outlet />);
            }
        }

        isValid();
    }, []);

    return v;
}

export default PrivateRoute;