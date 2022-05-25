const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');

const endPoint = qnaList.length;                                        // 질문 개수
const select = [0, 0, 0, 0, 0, 0, 0, 0];        // 설문조사결과


// Test 시작
function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    
    // Swap
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)

        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}

// 다음 설문
function goNext(qIdx){

    if(qIdx === endPoint){
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;

    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }

    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

// 테스트 답
function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    
    // 클래스 지정
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    // answer.classList.add('fadeOut');

    // 위치 지정
    a.appendChild(answer);

    // 설정
    answer.innerHTML = answerText;
    answer.addEventListener('click', function(){
        var children = document.querySelectorAll('.answerList');

        for(let i=0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }

        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;

            for(let i=0; i< target.length; i++){
                select[target[i]] += 1;
            }

            for(let i=0; i<children.length; i++){
                children[i].style.display = 'none';
            }

            goNext(++qIdx);
        }, 450);
    }, false);
}

// 테스트 결과
function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)});
    setResult();
}

// 테스트 결과 연산
function calResult(){
    
    // var result = select.indexOf(Math.max(...select));
    let MBTI = "";
    MBTI += select[0] > select[1] ? "I" : "E";
    MBTI += select[2] > select[3] ? "S" : "N";
    MBTI += select[4] > select[5] ? "T" : "F";
    MBTI += select[6] > select[7] ? "J" : "P";

    let result = -1;
    switch(MBTI){
        case "INTJ": result = 0; break;
        case "INTP": result = 1; break;
        case "ENTJ": result = 2; break;
        case "ENTP": result = 3; break;
        case "INFJ": result = 4; break;
        case "INFP": result = 5; break;
        case "ENFJ": result = 6; break;
        case "ENFP": result = 7; break;
        case "ISTJ": result = 8; break;
        case "ISFJ": result = 9; break;
        case "ESTJ": result = 10; break;
        case "ESFJ": result = 11; break;
        case "ISTP": result = 12; break;
        case "ISFP": result = 13; break;
        case "ESTP": result = 14; break;
        case "ESFP": result = 15; break;
    }

    return result;
}

function setResult(){
    let point = calResult();

    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    // image URL도 변경해야함.
    var imgURL = '/rss/img/'+point+'/1.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

