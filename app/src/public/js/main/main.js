'use strict';

$(document).ready(function () {
    setProfile();
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
                console.log(res)
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

// 1. 아이디로 자신의 MBTI 타입과 상대방 MBTI 타입 찾기
// 2. 상대방과 나와 MBTI 타입이 일치한 사람들 가져오기(9명)
// 3. 6시간마다(0, 6, 12, 18)시 마다 변경되도록 설정

function getType(type){
    switch(type){
        case 0: return "mouse";
        case 1: return "cow";
        case 2: return "tiger";
        case 3: return "rabbit";
        case 4: return "dragon";
        case 5: return "snake";
        case 6: return "horse";
        case 7: return "sheep";
        case 8: return "monkey";
        case 9: return "chick";
        case 10: return "dog";
        case 11: return "pig";
    }
}

function moveProfile(username){
    location.href = `/profile/${username}`;
}

function searchProfile(){
    let username = $('#search').val();
    moveProfile(username);
}