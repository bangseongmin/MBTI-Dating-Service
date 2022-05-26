'use strict';

const id = document.querySelector('#id');
const name = document.querySelector('#name');
const pw = document.querySelector('#pw');
const confirmPw = document.querySelector('#confirm-pw');
const phone = document.querySelector('#phone');
const gender = document.getElementById('gender');
const address = document.getElementById('addr');
const age = document.getElementById('age');

const registerBtn = document.querySelector('#registerBtn');

registerBtn.addEventListener('click', register);

// 회원가입
function register() {
    if (!id.value) return alert("아이디를 입력하세요.");
    if(!pw.value) return alert("비밀번호를 입력하세요.");
    if (pw.value !== confirmPw.value) return alert("비밀번호가 일치하지 않습니다.");
    
    let reg = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";
    if(!reg.search(pw.value)){
        alert("비밀먼호는 8글자 이상 문자와 조합하여 사용해주세요");
        return;
    }

    // console.log(gender.options[gender.selectedIndex].value);
    // console.log(address.options[address.selectedIndex].value);

    const req = {
        id: id.value,
        name: name.value,
        pw: pw.value,
        phone: phone.value,
        address: address.options[address.selectedIndex].value,
        gender: gender.options[gender.selectedIndex].value,
        age: age.options[age.selectedIndex].value
    };

    // console.log(JSON.stringify(req));

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

                makeNotice(id.value);

                location.href = "/testPage";
            } else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(err);
        })
}

function setAge(){
    let temp_html = ``;

    for(let i=20; i<=50; i++){
        temp_html = `<option value="${i}세">${i} 세</option>`
        $('#age').append(temp_html);
    }
}

function makeNotice(id){
    let req = {id:id};
    fetch('/notice/register',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
    .then((res)=>{
        if(res.success){
            console.log(res.msg);
        }
    }).catch((err)=>{
        console.error(new Error("회원가입 공지메시지 에러 발생"));
    })
}

$(document).ready(function() { setAge(); });