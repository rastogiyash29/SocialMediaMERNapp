const getCookie=(document,name)=> {
    try {
        // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.headers.cookie.split(";");
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    } 
    } catch (e) {
        console.log(e,e.message);
    }
    // Return null if not found
    return null;
}

module.exports={
    getCookie
}