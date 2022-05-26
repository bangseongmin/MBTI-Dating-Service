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
        alert('stop');
        window.location.reload();
    })
    .catch((err) => {
        console.error(err);
    })
}

function loading_img(){
    $('#img-box').empty();
    let id = window.location.pathname.split('/')[2];
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

            $('#profile-id').text(id);
            $('#search-object').attr("src", `/rss/img/${title}`);


            for(let i=0; i<list.length;i++){
                let image = list[i]['image'];
                let idx = list[i].idx;
                let temp_html = `<div class="col card-box">
                                    <div class="card">
                                        <img src="/rss/img/${image}" class="card-img-top">
                                    </div>
                                    <div class="option" id="access">
                                        <a href="#" onclick="changeImage('${image}');"><span class="las la-check"></span></a>                                        
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

    let loginUser = $('#userId').text();
    if(id != loginUser){
        alert('변경할 수 없습니다.');
        return;
    }

    const req = {
        id:id,
        image:title
    }

    fetch("/changeImage", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())     // then은 서버에서 응답한 데이터
    .then((res) => {
        console.log(res);
        window.location.reload();
    })
    .catch((err) => {
        console.error(err);
    })
}

function removeImage(title){
    alert(title);
}


$(document).ready(function(){
    loading_img();
    readInfo();
    access();
})

function closeBox(){
    $("#modal-edit").removeClass("is-active");
    $('#input-name').val("");
    $('#textarea-about').val("");
}

function readInfo(){
    let id = window.location.pathname.split('/')[2];

    fetch(`/readInfo?id=${id}`, {
        method: "GET",
    })
    .then((res) => res.json())     // then은 서버에서 응답한 데이터
    .then((res) => {
        let contetnt = res[0].content;
        $('#self-content').text(contetnt);
  
    })
    .catch((err) => {
        console.error(err);
    })
}

function access(){
    let id = $('#profile-id').text();
    let loginUser = $('#userId').text();
    if(id!=loginUser){
        $('#access').removeClass("option");
    }
}