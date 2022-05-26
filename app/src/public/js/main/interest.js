let targetId;

$(document).ready(function () {

    $('.nav div.nav-see').on('click', function () {
        $('div.nav-see').addClass('active');
        $('div.nav-search').removeClass('active');

        $('#see-area').show();
        $('#search-area').hide();
        getMessage();
    })

    $('.nav div.nav-search').on('click', function () {
        $('div.nav-see').removeClass('active');
        $('div.nav-search').addClass('active');

        $('#see-area').hide();
        $('#search-area').show();
        getNotice();
    })

    $('#see-area').show();
    $('#search-area').hide();
    getMessage();
})

function getNotice(){
    $('#notice-box').empty();
    fetch("/notices",{
        method:"GET",
    })
    .then((res) => res.json())
    .then((res) => {
        let list = res['list'];
        for(let i=0; i<list.length;i++){
            let title = list[i].title;
            let writer = list[i].writer;
            let content = list[i].content;
            let created_date = list[i].create_date;
            makeNotice(title, writer, content, created_date);
        }
    })
}

function makeNotice(title, writer, content, created_date){
    let temp_html = `<div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">${title}</p> 
                                    <p class="subtitle is-6">@${writer}</p>
                                </div>
                            </div>
                            <div class="content">
                                ${content}
                                <br>
                                <time style="float:right;" datetime="2016-1-1">${created_date}</time>
                            </div>
                        </div>
                    </div>`;

    $('#notice-box').append(temp_html);
}

function getMessage(){
    $("#message-box").empty();

    fetch("/messages",{
        method:"GET",
    })
    .then((res) => res.json())
    .then((res) => {
        let list = res['list'];
        for(let i=0; i<list.length;i++){
            let sender = list[i].sender;
            let recevier = list[i].recevier;
            let content = list[i].content;
            let create_date = list[i].create_date;
            makeMessage(sender, recevier, content, create_date);
        }
    })
}

function makeMessage(sender, recevier, content, create_date){
    let temp_html = `<div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">${recevier}님께</p>                                     
                                </div>
                            </div>
                            <div class="content">
                                ${content} 
                                <br>
                                <time style="float:right;" datetime="2016-1-1"> &nbsp; &nbsp;${create_date}</time>
                            </div>
                        </div>
                    </div>`;

    $("#message-box").append(temp_html);
}