module.exports = getJWTToken = (req) => {
    const cookies = req.headers.cookie.split("; ");
    const token = cookies.find(e => e.includes("token"));
    let jwt;
    if(token){
        jwt = token.split("=")[1];
    }
    return jwt ? jwt : undefined;
}