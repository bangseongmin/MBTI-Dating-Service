const name = document.querySelector('#name');
const phone = document.querySelector('#phone');

const findPBtn = document.querySelector('#findPBtn');    // 비밀번호 찾기
const pw = document.querySelector('#pw');
const cpw = document.querySelector('#confirm-pw');

findPBtn.addEventListener('click', findPassword);

function findPassword(){
    if(!id.value) return alert("아이디를 입력하세요.");
    if(!phone.value) return alert("휴대폰 번호를 입력하세요.");
    
    const checkStr = findPBtn.innerHTML;

    if(checkStr == "find"){
        const req = {
            id: id.value,
            phone: phone.value
        }

        fetch("/findPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())     // then은 서버에서 응답한 데이터
        .then((res) => {
            if (res.success) {
                
                pw.removeAttribute('hidden');
                cpw.removeAttribute('hidden');
                findPBtn.innerHTML = "save";
               
            } else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }else if(checkStr == 'save'){
        if(!pw.value) return alert("비밀번호를 입력하세요.");
        if(pw.value != cpw.value) return alert("비밀번호가 일치하지 않습니다.");
       
        const req = {
            id: id.value,
            pw: pw.value
        }

        fetch("/updatePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())     // then은 서버에서 응답한 데이터
        .then((res) => {
            if (res.success) {
                alert("비밀번호가 수정되었습니다.");
                location.href = '/login';            
            } else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }
    


}
