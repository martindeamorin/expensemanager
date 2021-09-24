const getJWTToken = () => {
    const cookies = document.cookie.split("; ");
    const remember = cookies.find(e => e.includes("remember"));
    let jwt;
    if(remember){
        jwt = remember.split("=")[1];
    }
    console.log(cookies)
    return jwt ? jwt : undefined;
}


export default getJWTToken;