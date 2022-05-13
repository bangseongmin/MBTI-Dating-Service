function get_query(){ 
    let url = document.location.href; 
    let qs = url.substring(url.indexOf('?') + 1).split('&'); 
    for(var i = 0, result = {}; i < qs.length; i++){ 
        qs[i] = qs[i].split('='); 
        result[qs[i][0]] = decodeURIComponent(qs[i][1]); 
    } 
    return result; 
}

