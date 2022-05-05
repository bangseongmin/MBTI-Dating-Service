'use strict';

function setProfile(){
    let result = get_query();
    let id = result["id"];

    $('#userId').text(id);

    const req = {
        id: id,
    };

    fetch("/searchInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())     // then은 서버에서 응답한 데이터
        .then((res) => {
            if (res.success) {

                $('#userName').text(res.msg['name']);
            } else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(err);
        })
}

function getInit(){
    let result = get_query();
    let id = result["id"];

    const req = {
        id: id,
    };

    
}