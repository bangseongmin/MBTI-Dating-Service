const url = 'http://localhost:3000/';

function setShare(){
    var resultImg = document.querySelector('#resultImg');
    var resultAlt = resultImg.firstElementChild.alt;
    const shareTitle = '십이간지 연애유형 결과';
    const shareDes = infoList[resultAlt].name;
    const shareImage = url + 'image' + resultAlt;
    const shareURL = url + 'result-' + resultAlt;

    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
        title: shareTitle,
        description: shareDes,
        imageUrl: shareImage,
        link: {
            mobileWebUrl: shareURL,
            androidExecutionParams: shareURL,
        },
        },
        buttons: [
        {
            title: '결과확인하기',
            link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL,
            },
        }
        ]
    });
}

function nextPage(){
    let result = get_query();
    let id = result["id"];
    var resultImg = document.querySelector('#resultImg');
    var userType = resultImg.firstElementChild.alt;
    
    const req = {
        id: id,
    };

    fetch("/testPage", {
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
           if(res.success){
                location.href = `/selectOne?id=${id}&userType=${userType}`;
           }else{
               if(res.err) return alert(res.err);
               
               alert(res.msg);
           }
       })
       .catch((err) => {
           console.error(new Error("로그인 중 에러 발생"));
       })
}

function get_query(){ 
    let url = document.location.href; 
    let qs = url.substring(url.indexOf('?') + 1).split('&'); 
    for(var i = 0, result = {}; i < qs.length; i++){ 
        qs[i] = qs[i].split('='); 
        result[qs[i][0]] = decodeURIComponent(qs[i][1]); 
    } 
    return result; 
}

