
async function ValidateToken() {
    const accessToken = localStorage.getItem('accessToken');
    try{
        const response = await fetch('http://localhost:8080/validateToken',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({accessToken}), 
        });
        const value = await response.json();
        if (response.ok) {
            console.log("ValidateToken() : " + value);
            return value;
        } 
    } catch (error) {
    console.log(error);
    }

    return false;
}

export default ValidateToken;