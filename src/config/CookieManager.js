class CookieManager {

    setUserCookies = (res,req)=>{
        res.cookie("auth_token", req.user.token);
        res.cookie("user_profile_photo", req.user.profile_photo);
        res.cookie("user_username", req.user.username);
    
    }
    clearUserCookies = (res) =>{
        res.clearCookie("auth_token");
        res.clearCookie("user_profile_photo");
        res.clearCookie("user_username");
    
    
    }


}

export default new CookieManager;