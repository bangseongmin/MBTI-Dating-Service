'use strict';

const id = document.querySelector('#id');
const pw = document.querySelector('#pw');
const loginBtn = document.querySelector('button');

// 로그인 시
loginBtn.addEventListener('click', login);


function login() {
    const req = {
        id: id.value,
        pw: pw.value
    }

    console.log(req);
}