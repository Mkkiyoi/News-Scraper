// Get JSON for the articles
$.getJSON('/articles', function(data) {
  for (let i = 0; i < data.length; i++) {
    // Display the articles on the page.
    $("#articles").append(
      '<div class="mb-5" id=' + data[i]._id + '>' +
        '<div class="card mb-4 mx-4">' +
          '<div class="card-header">' +
            '<a href="' + data[i].link + '">' + data[i].link + '</a>' +
            '<a href="/save" class="btn btn-outline-secodary float-right">Save</a>' +
          '</div>' +
          '<div class="card-body">' +
            '<p data-id=' + data[i]._id + '>' + data[i].title + '</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }
});

$(document).on("click", "p", function() {
  let articleId = $(this).attr("data-id");

  console.log(articleId)

  $("#" + articleId).empty();

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + articleId
  }).then(function(data) {
    let noteDiv = $('<div>').addClass('float-right ml-2');
    // Append form form for adding a note.
    noteDiv.append("<h6>Add a Note to this Article</h6>");
    noteDiv.append("<input id='note-title-input' name='title' class='form-control mb-2'>");
    noteDiv.append("<div class='input-group'><textarea id='note-body-input' name='body' class='form-control mb-2'></textarea></div>");
    noteDiv.append("<button data-id='" + data._id + "' id='savenote' class='btn btn-outline-secondary'>Save Note</button>");

    // Append to article div.
    $(noteDiv).appendTo("#" + articleId);

    // Display note if one already exists.
    if (data.note) {
      $("#note-title-input").val(data.note.title);
      $("#note-body-input").val(data.note.body);
    }
  });
});

// Post request to save the note enter.
$(document).on("click", "#savenote", function() {
  let articleId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + articleId,
    data: {
      title: $("#note-title-input").val(),
      body: $("#note-body-input").val()
    }
  }).then(function(data) {
    $("#" + articleId).empty();
  });

  $("#note-title-input").val("");
  $("#note-body-input").val("");
});

