// Event handling
document.addEventListener("DOMContentLoaded", function (event) {

  // Unobtrusive event binding
  document.querySelector("#navMenuButton").addEventListener("click", function (event) {
    $dc.loadMenuCategories();
  });

});

// Loads the menu categories view
$dc.loadMenuCategories = function () {
  $ajaxUtils.sendGetRequest(
    "menu-categories.html",
    buildAndShowMenuCategoriesHTML);
};

// Builds HTML for the categories page based on the data from the server
function buildAndShowMenuCategoriesHTML(categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    "menu-categories-title.html",
    function (categoriesTitle) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        "menu-category.html",
        function (categoryHtml) {
          var categoriesViewHtml = buildCategoriesViewHtml(categories,
            categoriesTitle,
            categoryHtml);
          document.querySelector("#main-content")
            .innerHTML = categoriesViewHtml;
        },
        false);
    },
    false);
}

// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
  categoriesTitle,
  categoryHtml) {

  var finalHtml = categoriesTitle;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
        "short_name",
        short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}

// Appends price with '$' if price exists
function insertItemPrice(html,
  pricePropName,
  priceValue) {
  // If not specified, replace with empty string
  if (!priceValue) {
    return insertProperty(html, pricePropName, "");
  }

  priceValue = "$" + priceValue.toFixed(2);
  html = insertProperty(html, pricePropName, priceValue);
  return html;
}

// Inserts properties from object into html string
function insertProperty(string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}
