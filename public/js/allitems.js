$(document).ready(function () {
  $('select').formSelect();
});

//-------------><------------------//
$(document).ready(function () {
  //conatiner that hold all of our post info
  const postContainer = $(".postItem");
  const categorySelect = $("#category");
  //variable to hold our post
  let posts;

  //This code handle when we want to get posts froma specific user
  // Looks for a query param in the url for UserId
  let url = window.location.search;
  let userId;
  if (url.indexOf("?user_id") !== -1) {
    userId = url.split("=")[1];
    getPosts(userId);
  }
  //If there's not userId then we get all posts
  else {
    getPosts();
  }

  //function to grab post from the database base on user
  function getPosts(user) {
    userId = user || "";
    if (userId) {
      userId = `/?user_id=${userId}`;
    }
    $.get(`api/postItem${userId}`, function (data) {
      console.log("Post", data);
      posts = data;
      if (!posts || !posts.lenth) {
        noPost(user);
      }
      else {
        initRow();
      }
    });
  }

  //initRow handles appending all of our constructed post HTML inside postContainer
  function initRow() {
    postContainer.empty();
    let postsToAdd = [];
    for (let i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    postContainer.append(postsToAdd);
  }

  //This function construct a post HTML
  function createNewRow(posts) {
    console.log(posts);
    const newPostCard = `
    <div class="col s12 m4">
        <div class="postItem card">
          <div class="card-image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/MTD_Lawn_Mower.jpg/1200px-MTD_Lawn_Mower.jpg">
            <span class="card-title"></span>
          </div>
          <div class="card-content">
            <p>$300</p>
            <hr class="my-4">
            <p>5 year old lawnmover. Used but definetily not abused. Recently had routine service to make sure it is ship-shape. Call/Text at 4077044070 to inquire.</p>
            <hr class="my-4">
            <p>Category: Lawn</p>
            <hr class="my-4">
            <p>Sold by: Users Email as a link (like from the teambuilder hw)</p>
          </div>
        </div>
      </div>
    `
  }
});

//jQuery for navbar mobile response
$(document).ready(function(){
  $('.sidenav').sidenav();
});