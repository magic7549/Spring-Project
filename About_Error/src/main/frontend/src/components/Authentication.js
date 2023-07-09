async function ValidateToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken == null)
        return false;

    try{
        const response = await fetch('http://localhost:8080/validateToken',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({accessToken}), 
        });
        const value = await response.json();
        if (response.ok) {
            return value;
        } 
    } catch (error) {
    console.log(error);
    }

    return false;
}

async function RefreshToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken == null)
        return false;

    try{
        const response = await fetch('http://localhost:8080/refreshToken',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({accessToken}), 
        });
        if (response.ok) {
            // body 값(accessToken) 저장
            const value = await response.text();
            if (value != '') {
                localStorage.setItem('accessToken', value);
                return true;
            }
            else {
                localStorage.removeItem('accessToken');
                return false;
            }
        } 
    } catch (error) {
    console.log(error);
    }

    return false;
}


export {ValidateToken, RefreshToken};