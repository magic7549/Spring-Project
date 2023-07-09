

async function Logout() {
    const accessToken = localStorage.getItem('accessToken');

    try{
        const response = await fetch('http://localhost:8080/logout',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({accessToken}),
        });
        if (response.ok) {
            localStorage.removeItem('accessToken');
            window.location.href = "/";
        }
    } 
    catch (error) {
        console.log(error);
    }
}

export default Logout;