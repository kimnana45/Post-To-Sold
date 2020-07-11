

$.get("api/items", (data) => {
  console.log("Items", data);

});
//jQuery for navbar mobile response
$(document).ready(function(){
  $('.sidenav').sidenav();
});

// $("select").formSelect();

$("#purchaseBtn").click(function() {
  console.log($(this).attr("data-id"));
  $.ajax({
    method: "DELETE",
    url: "/api/posts/" + $(this).attr("data-id")
  })
    // On success, run the following code
    .then(function() {
      console.log("Purchased Successfully!");
      location.reload()
    });
  
});