$(document).ready(function () {
  // Getting jQuery references to the postItem name, description, price, category, picture
  const nameInput = $("#itemName");
  const descriptionInput = $("#itemDescription");
  const priceInput = $("#itemPrice");
  const category = $("#category");
  const picture = $("#postPicture");
  const cmsForm = $("#cms");
  // Adding an event listener for when the form is submitted
  // $(cmsForm).on("click", function hanler(){
  //   console.log("This works!");
  // })
  $(cmsForm).on("submit", handleFormSubmit);
  $("#postPicture").on("click", uploadPicture);

  //function for uploading picture
  function uploadPicture() {
    filepicker.pick(
      {
        mimetype: 'image/*',
        services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
        openTo: 'COMPUTER'
      },
      function(Blob){
        console.log(JSON.stringify(Blob));
        const handler = Blob.url.substring(Blob.url.lastIndexOf('/') + 1);
        document.getElementById('postPicture').dataset.handler = handler;
      },
      function(FPError){
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
  }

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    console.log("test");
    event.preventDefault();
    console.log("1")
    // Wont submit the post if we are missing a name, description, price, category, or picture 
    if (!nameInput.val().trim() ||
      !descriptionInput.val().trim() ||
      !priceInput.val() ||
      !category ||
      !picture) {
      return;
    }
    console.log("2");
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
      category: category,
      picture: document.getElementById('postPictute').dataset.handler,      
    };

    // Submits a new post and brings user to blog page upon completion  
      $.post("/api/posts", newPost, function () {
        console.log(newPost);
        window.location.href = "/allitems";
      });
  }
});
