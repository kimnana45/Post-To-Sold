$(document).ready(() => {
  // Getting references to the name input and item container, as well as the table body
  const nameInput = $("#item-name");
  const itemList = $("tbody");
  const itemContainer = $(".item-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an item
  $(document).on("submit", "#item-form", handleItemFormSubmit);
  $(document).on("click", ".delete-item", handleDeleteButtonPress);

  // Getting the initial list of Items
  getItems();

  // A function to handle what happens when the form is submitted to create a new Item
  function handleItemFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (
      !nameInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upsertItem function and passing in the value of the name input
    upsertItem({
      name: nameInput.val().trim()
    });
  }

  // A function for creating an item. Calls getItems upon completion
  function upsertItem(itemData) {
    $.post("/api/items", itemData).then(getItems);
  }

  // Function for creating a new list row for items
  function createItemRow(itemData) {
    const newTr = $("<tr>");
    newTr.data("item", itemData);
    newTr.append("<td>" + itemData.name + "</td>");
    if (itemData.Posts) {
      newTr.append("<td> " + itemData.Posts.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    //This needs to be updated from items.html probably
    newTr.append(
      "<td><a href='/index?item_id=" + itemData.id + "'>Go to Items</a></td>"
    );
    newTr.append(
      "<td><a href='/cms?item_id=" + itemData.id + "'>Post an item</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Item</a></td>"
    );
    return newTr;
  }

  // Function for retrieving items and getting them ready to be rendered to the page
  function getItems() {
    $.get("/api/items", data => {
      const rowsToAdd = [];
      for (let i = 0; i < data.length; i++) {
        rowsToAdd.push(createItemRow(data[i]));
      }
      renderItemList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of items to the page
  function renderItemList(rows) {
    itemList
      .children()
      .not(":last")
      .remove();
    itemContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      itemList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no items
  function renderEmpty() {
    const alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an item before you can create a Post.");
    itemContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    const listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("item");
    const id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/items/" + id
    }).then(getItems);
  }
});
