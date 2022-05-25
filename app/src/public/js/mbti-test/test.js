const select = [3, 2, 4, 1, 5, 2, 3, 7];        // 설문조사결과

function solution(){
    let MBTI = "";
    MBTI += select[0] > select[1] ? "I" : "E";
    MBTI += select[2] > select[3] ? "S" : "N";
    MBTI += select[4] > select[5] ? "T" : "F";
    MBTI += select[6] > select[7] ? "J" : "P";

    let temp = -1;
    switch(MBTI){
        case "INTJ": temp = 0; break;
        case "INTP": temp = 1; break;
        case "ENTJ": temp = 2; break;
        case "ENTP": temp = 3; break;
        case "INFJ": temp = 4; break;
        case "INFP": temp = 5; break;
        case "ENFJ": temp = 6; break;
        case "ENFP": temp = 7; break;
        case "ISTJ": temp = 8; break;
        case "ISFJ": temp = 9; break;
        case "ESTJ": temp = 10; break;
        case "ESFJ": temp = 11; break;
        case "ISTP": temp = 12; break;
        case "ISFP": temp = 13; break;
        case "ESTP": temp = 14; break;
        case "ESFP": temp = 15; break;
    }

    console.log(MBTI);
    return temp;
}

console.log(solution());