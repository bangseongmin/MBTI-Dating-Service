// 1. 아이디로 자신의 MBTI 타입과 상대방 MBTI 타입 찾기
// 2. 상대방과 나와 MBTI 타입이 일치한 사람들 가져오기(9명)
// 3. 6시간마다(0, 6, 12, 18)시 마다 변경되도록 설정

function get_ideal_type(){
    $('#card-box').empty();
    fetch("/getidealtype",{
        method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
        let list = res["list"];

        for(let i=0; i<list.length; i++){
            let id = list[i].id;
            let address = list[i].address;
            let age = list[i].age;
            let name = list[i].name;
            let url = list[i].image;
            let created = list[i].in_date;
            print_ideal_type(id, address, age, name, url, created);
        }
    })
}

function print_ideal_type(id, address, age, name, url, created){
    let temp_html = `<div class="card">
                        <div class="card-image">
                        <figure class="image is-4by3">
                            <img src="/rss/img/${url}" alt="Placeholder image">
                        </figure>
                        </div>
                        <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4">${name}</p>
                                <p class="subtitle is-6">@${id}</p>
                            </div>
                        </div>

                        <div class="content">
                            <p>age : ${age} / address : ${address}</p>
                            <time datetime="2016-1-1">${created}</time>
                        </div>
                        </div>
                        <div class="option">
                        <a id="opbtn" class="lab la-gratipay" href="javascript:sendMessage('${id}')"></a>
                        </div>
                    </div>`;

    $('#card-box').append(temp_html);
}

function sendMessage(toUser){
    // toUser : 받는 사람 아이디
    let id = $('#userId').text().trim();
    let req = {
        send : id,
        to : toUser
    }

    fetch("/sendMessage", {
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
            } else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(err);
        })
}