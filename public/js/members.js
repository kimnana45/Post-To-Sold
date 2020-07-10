$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});

//jQuery for navbar mobile response
$(document).ready(function(){
  $('.sidenav').sidenav();
});



  $("#delete").click(function() {
    console.log($(this).attr("data-id"));
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + $(this).attr("data-id")
    })
      // On success, run the following code
      .then(function() {
        console.log("Deleted Successfully!");
        location.reload()
      });
    
  });
  
