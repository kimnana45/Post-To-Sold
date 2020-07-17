

$.get("api/items", (data) => {
  console.log("Items", data);

});
$(document).ready(function(){
  $('.sidenav').sidenav();
});

$(".purchase-btn").click(function() {
    console.log($(this).attr("data-id"));
    $.ajax({
      method: "PUT",
      url: "/api/posts/" + $(this).attr("data-id"),
      data: {sold: 1}
    })
     
      .then(function() {
        console.log("Purchased Successfully!");
        location.reload()
      });
    });
