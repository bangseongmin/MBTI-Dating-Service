function readTest(){
    $("#cards-box").empty();
    fetch('/api/tests', {
        method: "GET",
    })
    .then((res) => res.json())     // then은 서버에서 응답한 데이터
    .then((res) => {
        let list = res['list'];
        let doneList = res['doneList'];
        
        for(let i=0; i<list.length; i++){
            let done = doneList[i]['done'];
            let idx = list[i]['idx'];
            let title = list[i]['title'];
            let content = list[i]['content'];
            let starCount = list[i]['star'];
            let url = list[i]['url'];
            let star = '⭐'.repeat(starCount);
            let likecount = list[i]['likecount'];
            makeHTML(idx, url, star, title, content, likecount, done);
        }
    })
    .catch((err) => {
        console.error(err);
    })
}

function makeHTML(idx, url, star, title,content, likecount, done){
    let temp_html = `<div class="col">
                        <div class="card">
                            <img src="${url}" class="card-img-top" alt="..." onclick="gotoTest(${idx})">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${content}</p>
                                <p>${star}</p>
                                <div class="like-icon">
                                    <i id="likeBtn-${idx}" onclick="javascript:like(${idx}, 'like');" class="like las la-heart"></i>
                                    <i id="dislikeBtn-${idx}" onclick="javascript:like(${idx}, 'dislike');" class="dislike lar la-heart"></i>
                                    <p id="getLike-${idx}">${likecount}</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
   
    
    $("#cards-box").append(temp_html);

    if(!done){
        $(`#likeBtn-${idx}`).hide();
    }else{
        $(`#dislikeBtn-${idx}`).hide();
    }
}

function action(){

}

function like(num, action){
    let id = $("#userId").text();

    if(action == 'like'){
        $(`#likeBtn-${num}`).hide();
        $(`#dislikeBtn-${num}`).show();
    }else{
        $(`#likeBtn-${num}`).show();
        $(`#dislikeBtn-${num}`).hide();
    }

    const req = {       // dislike = +1, like -1
        id : id,
        num : num,
        action : action,
    }

    $.ajax({
        type: 'PUT',
        url: '/test/like',
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(req),
        success: function (response) {
            if(response['success']){                
                $(`#getLike-${num}`).text(response['count']);
            }
        }
    });
}

function gotoTest(n){
    window.location.href = `/test/${n}`;
}

$(document).ready(function(){
    // 1. 테스트를 요청한다.
    // 2. 테스트를 정렬해서 가져온다.
    readTest();
})
