const name = document.querySelector('#name');
const phone = document.querySelector('#phone');

const findUBtn = document.querySelector('#findUBtn');    // 아이디 찾기
const show = document.querySelector('#show');

findUBtn.addEventListener('click', findAccount);

function findAccount(){
    if(!name.value) return alert("이름을 입력하세요.");
    if(!phone.value) return alert("휴대폰 번호를 입력하세요.");
    
    const req = {
        name: name.value,
        phone: phone.value
    }

    fetch("/findUsername", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())     // then은 서버에서 응답한 데이터
    .then((res) => {
        if (res.success) {
            
            console.log(res);
            show.value = res.msg;
        } else {
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(err);
    })


}
