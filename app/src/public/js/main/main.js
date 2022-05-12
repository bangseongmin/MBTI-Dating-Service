'use strict';

$(document).ready(function () {
    setProfile();
    getInit();
})

function setProfile(){
    let result = get_query();
    const id = result["id"];
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
                console.log(res.msg);
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

// 1. 아이디로 자신의 MBTI 타입과 상대방 MBTI 타입 찾기
// 2. 상대방과 나와 MBTI 타입이 일치한 사람들 가져오기(9명)
// 3. 6시간마다(0, 6, 12, 18)시 마다 변경되도록 설정
function getInit(){
    

    let id = $('#userId').text();

    const req = {
        id: id
    };

    fetch("/searchUserMBTI", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())     // then은 서버에서 응답한 데이터
        .then((res) => {
            if (res.success) {
                console.log(res.data);
                
            }else{
                if(res.err) return alert(res.err);
                alert(res.msg.json());
            }
        })
        .catch((err) => {
            console.error(err);
        })
}