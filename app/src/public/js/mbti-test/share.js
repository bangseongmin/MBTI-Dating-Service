const url = 'http://localhost:3000/';

function setShare(){
    var resultImg = document.querySelector('#resultImg');
    var resultAlt = resultImg.firstElementChild.alt;
    const shareTitle = 'MBTI 검사';
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

async function nextPage(){
    let id = await getUser();
    var resultImg = document.querySelector('#resultImg');
    var userType = resultImg.firstElementChild.alt;
    let check = window.location.pathname.split('/')[1];
    let n = window.location.pathname.split('/')[2];

    const req = {
        id : id,
        userType : userType
    }

    if(check == "test"){
        fetch(`/test`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        }).then((res) => res.json())
        .then((res)=> {
            if (res.success) {
                location.href = '/';
            }else{
                alert("실패하셨습니다.");
                return;
            }
        })
    }else{
        location.href = `/selectOne?type=${userType}`;
    }
}
