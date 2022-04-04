'use strict';

const id = document.querySelector('#id');
const name = document.querySelector('#name');
const pw = document.querySelector('#pw');
const confirmPw = document.querySelector('#confirm-pw');
const phone = document.querySelector('#phone');

const postNum = document.querySelector('input[name="zip"]');
const addr1 = document.querySelector('input[name="addr1"]');
const addr2 = document.querySelector('input[name="addr2"]');

const searchBtn = document.querySelector('#lBtn');
const registerBtn = document.querySelector('#registerBtn');

registerBtn.addEventListener('click', register);
searchBtn.addEventListener('click', openZipSearch);


// 회원가입
function register() {
    if (!id.value) return alert("아이디를 입력하세요.");
    if(!pw.value) return alert("비밀번호를 입력하세요.");
    if (pw.value !== confirmPw.value) return alert("비밀번호가 일치하지 않습니다.");
    
    const str = `(${postNum.value})${addr1.value}-${addr2.value}`;

    const req = {
        id: id.value,
        name: name.value,
        pw: pw.value,
        phone: phone.value,
        address: str
    };

    console.log(JSON.stringify(req));

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())     // then은 서버에서 응답한 데이터
        .then((res) => {
            if (res.success) {
                location.href = "/login";
            } else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(err);
        })
}

// 주소 입력
function openZipSearch(){
    new daum.Postcode({
        oncomplete: function(data) {
        $('[name=zip]').val(data.zonecode); // 우편번호 (5자리)
        $('[name=addr1]').val(data.address);
        $('[name=addr2]').val(data.buildingName);
        }
    }).open();
}

// 전화번호 하이픈
var autoHypenPhone = function(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4){
        return str;
    }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 11){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{              
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }

    return str;
}

phone.onkeyup = function(){
    this.value = autoHypenPhone( this.value ) ;  
}