
//jQuery for navbar mobile response
$.get("api/items", (data) => {
  console.log("Items", data);

});
$(".sidenav").sidenav();


$("select").formSelect();

