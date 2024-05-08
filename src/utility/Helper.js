// oop js function oop=full mean object oreanted program
class Helper{
    static isLogin(){
      let token=  sessionStorage.getItem("token");
       if(token===null){
        return false
       }
       else{
        return true
       }
    }
    // static APIBASEPATH(){
    //     return "https://cart-api.teamrabbil.com/api" //funtion system
    // }
     static APIBASEPATH ='https://cart-api.teamrabbil.com/api' //varible system





//email validation helper 
static isEmpty(value){
        if(value.length === 0){
            return true
        }

        
        else {
            return false
        }
}
//token header
static tokenHeader(){
    return {
       headers:{
        'token':sessionStorage.getItem('token')
       }
    }
}
// user unauthorized
static unauthorized(statuscode){
   if(statuscode === 401){
    window.location.href='/login'
   }
}



}
export default Helper