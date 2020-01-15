// Get JSON for the articles
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      '<div class="card mb-4 mx-4">' +
        '<div class="card-header">' +
          '<a href="' + data[i].link + '">' + data[i].link + '</a>' +
          '<a href="/save" class="btn btn-outline-secodary float-right">Save</a>' +
        '</div>' +
        '<div class="card-body">' +
          '<p data-id=' + data[id]._id + '>' + data[i].title + '</p>' +
        '</div>' +
      '</div>'
    );
  }
});

