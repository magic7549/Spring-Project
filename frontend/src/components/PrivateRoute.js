import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ValidateToken, RefreshToken} from '../components/Authentication'

//로그인 유저만 접근 가능
function PrivateRoute() {
    const [v, setV] = useState('');
    useEffect(() => {
        async function isValid() {
            let result = await ValidateToken();

            if (result) {
                // accessToken 검증 성공
                setV(<Outlet />);
            }
            else {
                // accessToken 검증 실패
                // refreshToken으로 accessToken 갱신
                if (await RefreshToken()) {
                    // 갱신 후 다시 토큰 검증
                    result = await ValidateToken();

                    if (result) {
                        // 검증 성공
                        setV(<Outlet />);
                    }
                    else {
                        alert("로그인이 필요한 기능입니다.");
                        setV(<Navigate to="/login" />);
                    }
                }
                else {
                    alert("로그인이 필요한 기능입니다.");
                    setV(<Navigate to="/login" />);
                }
            }
        }

        isValid();
    }, []);

    return v;
}

export default PrivateRoute;