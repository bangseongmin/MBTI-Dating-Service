'use strict';

$(document).ready(function () {
    setProfile();
    get_ideal_type();
})

async function setProfile(){
    let id = await getUser();
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
                $("#myimage").attr("src", `/rss/img/${res.msg['image']}`);
            } else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(err);
        })
}


function moveProfile(username){
    location.href = `/profile/${username}`;
}

function searchProfile(){
    let username = $('#search').val();
    moveProfile(username);
}