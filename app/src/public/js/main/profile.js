function update_profile(){
    let id = $('#profile-id').text();
    let name = $('#input-name').val();
    let content = $('#textarea-about').val();

    const req = {
        id : id,
        name : name,
        content: content
    }
    
    fetch("/profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())     // then은 서버에서 응답한 데이터
    .then((res) => {
        closeBox();
        window.location.reload();
    })
    .catch((err) => {
        console.error(err);
    })
}

function loading_img(){
    $('#img-box').empty();
    let id = window.location.pathname.split('/')[2];;
    const req = {
        id: id,
    };

    fetch("/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())     // then은 서버에서 응답한 데이터
    .then((res) => {
        if (res.success) {
            let list = res['list'];
            let title = res['result'][0]['image'];
            console.log("title : " + title);

            $('#search-object').attr("src", `/rss/img/${title}`);


            for(let i=0; i<list.length;i++){
                let image = list[i]['image'];
                let idx = list[i].idx;
                let temp_html = `<div class="col card-box">
                                    <div class="card">
                                        <img src="/rss/img/${image}" class="card-img-top">
                                    </div>
                                    <div class="option">
                                        <a href="#" onclick="changeImage('${title}');"><span class="las la-edit"></span></a>
                                        <a href="#" onclick="removeImage('${title}');"><span class="las la-trash"></span></a>
                                    </div>
                                </div>`;
                $('#img-box').append(temp_html);
            }

        } else {
            $("#profile-name").text("");
            $("#profile-type").text("");
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(err);
    })
}

function changeImage(title){
    let id = $('#profile-id').text();

    const req = {
        id:id,
        title:title
    }
   alert(id);
    // fetch("/changeImage", {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(req),
    // })
    // .then((res) => res.json())     // then은 서버에서 응답한 데이터
    // .then((res) => {
    //     console.log(res);
    //     window.location.reload();
    // })
    // .catch((err) => {
    //     console.error(err);
    // })
}

function removeImage(title){
    alert(title);
    // let id = $('#userId').text().trim();
    // const req = {
    //     id : id,
    //     title : title
    // }

    // fetch("/profile", {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(req),
    // }).then((res) => res.json())     // then은 서버에서 응답한 데이터
    // .then((res) => {
    //     if (res.success) {
    //         alert("수정 완료되었습니다.");
    //     } else {
    //         if(res.err) return alert(res.err);
    //         alert(res.msg);
    //     }
    // })
    // .catch((err) => {
    //     console.error(err);
    // })
}


$(document).ready(function(){
    loading_img();
    readInfo();
})

function closeBox(){
    $("#modal-edit").removeClass("is-active");
    $('#input-name').val("");
    $('#textarea-about').val("");
}

function readInfo(){
    const id = $('#profile-id').text();
    console.log("출발지점 : " + id);

    fetch(`/readInfo?id=${id}`, {
        method: "GET",
    })
    .then((res) => res.json())     // then은 서버에서 응답한 데이터
    .then((res) => {
        let contetnt = res[0].content;
        $('#self-content').text(contetnt);
        console.log('성공'+contetnt);
        
    })
    .catch((err) => {
        console.error(err);
    })
}