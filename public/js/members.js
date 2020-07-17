$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});

$(document).ready(function(){
  $('.sidenav').sidenav();
});

$(".delete-btn").click(function() {
    console.log($(this).attr("data-id"));
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + $(this).attr("data-id")
    })
      .then(function() {
        console.log("Deleted Successfully!");
        location.reload()
      });
    
  });
  
