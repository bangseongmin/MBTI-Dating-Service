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
    var resultImg = document.querySelector('#resultImg');
    var userType = resultImg.firstElementChild.alt;
    
    location.href = `/selectOne?type=${userType}`;
}
