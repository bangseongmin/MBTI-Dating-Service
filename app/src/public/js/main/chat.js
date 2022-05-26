$( '.friend-drawer--onhover' ).on( 'click',  function() {
  
    $( '.chat-bubble' ).hide('slow').show('slow');
    
  });


$(document).ready(function(){
  
});

function setting(){
  let src = $('#myimage').attr("src");
  console.log(src);
  $('#profile-image').attr('src', src);
}

function sendMsg(){
  let input = $('#stextAreaExample').val();
  let temp_html = `<div class="row no-gutters">
  <div class="col-md-3 offset-md-9">
      <div class="chat-bubble chat-bubble--right">
          ${input}
      </div>
  </div>
</div>`;
  $('#panel').append(temp_html);
}