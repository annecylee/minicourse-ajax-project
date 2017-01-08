
//Capitalize First Letter
String.prototype.capitalizeFirstLetter = function() {
    return this.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val().capitalizeFirstLetter();
    var city = $('#city').val().capitalizeFirstLetter();
    var address = street + ', ' + city;

    $greeting.text("So, you want to live at " + address + "?");
    var addressUrl = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address;
    $body.append('<img class="bgimg" src="' + addressUrl + '">');

    //load NY times
    //NYT Article Search API
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "xxxxxxxxxx",
      'q': city,
      'sort': "newest"
    });

    //Load Jason-encoded data
    $.getJSON(url, function(data){
      $('#nytimes-header').text('New York Times Articles About ' + city)
      var articles = data['response']['docs']
      $.each(articles,function(index,value){
        var webUrl = value['web_url'];
        var leadP = value['lead_paragraph'];
        var title = value['headline']['main']
        if (webUrl !== null && leadP != null){
          $("#nytimes-articles").append("<li class='article'><a href='" + webUrl + "'>" + title + "</a>" +
          "<p>" + leadP + "</p></li>")
        }
      })
    }).fail(function(){
      $('#nytimes-header').text('New York Times Articles Could Not Be Loaded')
    })

    return false;
};

$('#form-container').submit(loadData);
