$(document).ready(() => {
  // Getting jQuery references to the postItem name, description, price, category, picture
  const nameInput = $("#itemName");
  const descriptionInput = $("#itemDescription");
  const priceInput = $("#itemPrice");
  const category = $("#category");
  const picture = $("#postPicture");
  // const cmsForm = $("#cms");//don't need this anymore?

  //onclick event 
  $("#submitItem").on("click", handleFormSubmit);
  $("#postPicture").on("click", uploadPicture);

  //function for uploading picture
  function uploadPicture() {
    filepicker.pick(
      {
        mimetype: "image/*",
        services: [
          "COMPUTER",
          "FACEBOOK",
          "INSTAGRAM",
          "URL",
          "IMGUR",
          "PICASA"
        ],
        openTo: "COMPUTER"
      },
      Blob => {
        console.log(JSON.stringify(Blob));
        const handler = Blob.url.substring(Blob.url.lastIndexOf("/") + 1);
        document.getElementById("postPicture").dataset.handler = handler;
      },
      FPError => {
        console.log(FPError.toString());
      }
    );
  }
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  const url = window.location.search;
  let postId;

  //function for uploading picture
  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }
  // Otherwise if we have an user_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    console.log(userId);
  }

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("1");
    // Wont submit the post if we are missing a name, description, price, category, or picture
    if (
      !nameInput.val().trim() ||
      !descriptionInput.val().trim() ||
      !priceInput.val() ||
      !category ||
      !picture) {
      return;
    }
    console.log("2");
    const handler = document.getElementById('postPicture').dataset.handler;
    // Constructing a newPost object to hand to the database
    const newPost = {
      name: nameInput
        .val()
        .trim(),
      description: descriptionInput
        .val()
        .trim(),
      price: priceInput
        .val()
        .trim(),
      category: category.val(),
      picture: `https://cdn.filestackcontent.com/${handler}`,
    };

    console.log(newPost);
    // Submits a new post and brings user to blog page upon completion
    $.post("/api/posts", newPost, () => {
      console.log(newPost);
      window.location.href = "/allitems";
    });
  }
});


//jQuery for navbar mobile response
$(document).ready(function () {
  $('.sidenav').sidenav();
});

//jQUery for dropdown catgory area
$(document).ready(function () {
  $('select').formSelect();
});
