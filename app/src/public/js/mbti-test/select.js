async function select(idx){
    let result = get_query();
    let userType = result["type"];
    let id = await getUser();
    console.log(id);
    let temp = await passTEST(id);

    temp = await setMyType(id,userType, idx);
    console.log('last : '+temp);
}


function passTEST(id){
    req = {
        id:id,
    }
    fetch("/testPage", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Accept":"application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
    .then((res)=> {
        console.log(res);
    })
}

function setMyType(id, userType, idx){
    req = {
        id:id,
        userType:userType,
        userOType:idx
    }
    fetch("/saveMBTI", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Accept":"application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
    .then((res)=> {
        if (res.success) {
            location.href = '/main';
        }else{
            alert("실패하셨습니다.");
            return;
        }
    })

}