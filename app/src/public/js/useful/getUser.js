function getUser(){
    const response = fetch("/getUser");
    return response.then(res => res.json());
}

function getName(id){
    const response = fetch(`/searchInfo?id=${id}`);
    return response.then(res => res.json());
}