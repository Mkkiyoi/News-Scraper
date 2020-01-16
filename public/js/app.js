// Get JSON for the articles
$.getJSON('/articles', function(data) {
  for (let i = 0; i < data.length; i++) {
    // Display the articles on the page.
    $("#articles").append(
      '<div class="mb-5" id=' + data[i]._id + '>' +
        '<div class="card mb-4 mx-4">' +
          '<div class="card-header">' +
            '<a href="' + data[i].link + '">' + data[i].link + '</a>' +
            '<div data-id=' + data[i]._id + ' class="btn btn-outline-secodary float-right add-comment">Comment</div>' +
          '</div>' +
          '<div class="card-body">' +
            '<p>' + data[i].title + '</p>' +
          '</div>' +
        '</div>' +
        '<div id="comment-' + data[i]._id + '" class="ml-2"></div>' +
      '</div>'
    );
  }
});

$(document).on("click", ".add-comment", function() {
  let articleId = $(this).attr("data-id");

  console.log(articleId)

  $("#comment-" + articleId).empty();

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + articleId
  }).then(function(data) {
    console.log(data);
    // Display comments if there are any
    if (data.comment.length !== 0) {
      for (let i = 0; i < data.comment.length; i ++) {
        $('#comment-' + articleId).append(
          '<div id="' + data.comment[i]._id + '" class="alert alert-secondary" role="alert" data-id="' + data.comment[i]._id + '">' + 
          '<p>' + data.comment[i].body + '</p>' +
          '<div class="float-right btn btn-danger delete-comment">Delete</div>'+
          '</div>');
      }
    }

    // Append form form for adding a comment.
    $('#comment-' + articleId).append("<h6>Add a comment to this Article</h6>");
    $('#comment-' + articleId).append("<div class='input-group'><textarea id='comment-body-input' name='body' class='form-control mb-2'></textarea></div>");
    $('#comment-' + articleId).append("<button data-id='" + data._id + "' id='savecomment' class='btn btn-outline-secondary'>Comment</button>");
  });
});

// Post request to save the comment enter.
$(document).on("click", "#savecomment", function() {
  let articleId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + articleId,
    data: {
      body: $("#comment-body-input").val()
    }
  }).then(function(data) {
    $("#comment-" + articleId).empty();
  });

  $("#comment-body-input").val("");
});

$(document).on("click", ".delete-comment", function() {
  let commentId = $(this).parent().attr("data-id");
  $("#" + commentId).remove();
  $.ajax({
    method: "DELETE",
    url: "/comments/" + commentId,
  }).then(function(data) {
    console.log("Comment element removed.")
  });
});

