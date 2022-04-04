'use strict';

const id = document.querySelector('#id');
const name = document.querySelector('#name');
const pw = document.querySelector('#pw');
const confirmPw = document.querySelector('#confirm-pw');
const searchBtn = document.querySelector('#lBtn');
const registerBtn = document.querySelector('#registerBtn');

// 로그인 시
registerBtn.addEventListener('click', register);
searchBtn.addEventListener('click', openZipSearch);

function register() {
    if (!id.value) return alert("아이디를 입력하세요.");

    if (pw.value !== confirmPw.value) return alert("비밀번호가 일치하지 않습니다.");
    
    const req = {
        id: id.value,
        name: name.value,
        pw: pw.value
    };

    // console.log(req);
    // console.log(JSON.stringify(req));

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())     // then은 서버에서 응답한 데이터

        /* res.json()의 반환값은 Promise다.
           기본 res의 반환 값은 Response 스트림인데,
           .json() 메소드를 통해 Response(응답) 스트림을 읽을 수 있다.
           Response는 데이터가 모두 받아진 상태가 아니다.
           .json으로 Resonse 스트림을 가져와 완료될때까지 읽는다.
           다 읽은 body의 텍스트를 Promise 형태로 반환한다. */
        .then((res) => {
            if (res.success) {
                location.href = "/login";
            } else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(new Error("회원가입 중 에러 발생"));
        })
}

function openZipSearch(){
    new daum.Postcode({
        oncomplete: function(data) {
        $('[name=zip]').val(data.zonecode); // 우편번호 (5자리)
        $('[name=addr1]').val(data.address);
        $('[name=addr2]').val(data.buildingName);
        }
    }).open();
}