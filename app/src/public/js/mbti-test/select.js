function select(idx){
    let result = get_query();
    let id = result["id"];
    let userType = result["userType"];

    let req = {
        id: id,
        userType: userType,
        userOType: idx
    }

    alert(req);

    fetch("/selectOne", {
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
            location.href = `/main?id=${id}`;
        } else {
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(err);
    })
}