window.onload = function() {

  var searchBox = document.getElementById('search-box');
  var searchBoxDiv = document.getElementById('search-box-div');
  var searchBtn = document.getElementById('search-btn');
  var backgrounds = document.getElementById('backgrounds');
  var results = document.getElementById("results");
  var body =document.getElementById("body");
  var right = document.getElementById("right");
  var highestLikes = 0;
  var highestLikesUrl = "";
  var highestFavs = 0;
  var highestFavsUrl = "";
  var url = 'http://localhost:3000';

  function hide(){
    results.style.display = "none";
    backgrounds.style.display = "none";
  }

  hide();

  function show(){
    results.style.display = "flex";
    backgrounds.style.display = "flex";
  }
  searchBtn.addEventListener('click', function(ev) {
    show();
    ev.preventDefault();
    backgrounds.innerHTML = "";
    results.innerHTML = "";

    var placeSearch = searchBox.value;
    var data = {
      queryString: placeSearch
    };
    console.log("data is", data);

    //places
    $.ajax({
      url: url + '/places/search',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log( "response:", response );
      display(response);
    }); // end ajax

    //images
    $.ajax({
      url: url + '/images/search',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log( "response:", response );
      determineBackground(response);
    }); // end ajax
  }); // end search btn

function determineBackground(response){
  console.log("####IN DETERMINE BK FX#########");
  console.log("response", response);
  var resHits = response.hits;
  var resHitsLen = resHits.length;
  highestLikes = 0;
  highestFavs = 0;
  console.log("response.totalH", response.totalHits);
  if(response.totalHits < 1){
    backgrounds.innerHTML = "SORRY THERE ARE NO IMAGES WITH THAT CRITERIA, TRY AGAIN..."
  }
  else{
    for(var i = 0; i < resHitsLen; i++){
      if(resHits[i].likes > highestLikes){
        highestLikes = resHits[i].likes;
        highestLikesUrl = resHits[i].webformatURL;
      }
      if(resHits[i].favorites > highestFavs){
        highestFavs = resHits[i].favorites;
        highestFavsUrl = resHits[i].webformatURL;
      }
      set_background(highestFavsUrl);

      var imgContainer = document.createElement('div');
      imgContainer.id="img-containerID"
      backgrounds.appendChild(imgContainer)

      var img = document.createElement('img');
      var pic = resHits[i].webformatURL;
      img.src = pic;
      img.id = "img-id";

      var button = document.createElement("button");
      button.id = "makeBack";
      button.className = "glyphicon glyphicon-plus"
      button.innerText = "make back"

      var add = document.createElement("button");
      add.id = "add";
      add.className="glyphicon glyphicon-heart";
      add.innerText = "Favorite"

      imgContainer.appendChild(img);
      imgContainer.appendChild(button);
      imgContainer.appendChild(add);

      // img.addEventListener("mouseover", function(){
      //   console.log("MOUSE OVER IMAGE");
      //   var parent = $(this).parent();
      //   console.log("in mouse, parent", parent);
      //   var childImg = parent[0].children[0].src;
      //   // set_background(childImg);
      // }) //imglistener

      button.addEventListener("click", function(){
        console.log("BACKGROUND BUTTON WAS PRESSED");
        var parent = $(this).parent();
        var childImg = parent[0].children[0].src;
        set_background(childImg);
      }) //button listener

      add.addEventListener("click", function(){
        console.log("ADD TO FAVS BUTTON WAS PRESSED");
        //add to favorites
      }) //button listener
    } //end for loop
  }//end else
} //end funx

function set_background(childImg){
  var reg = "linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
  var moz = "-moz-linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
  var webkit = "-webkit-linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
  var ms = "-ms-linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
  var second = "url("+childImg+")"
  right.style.background=reg + second;
  right.style.background=moz + second;
  right.style.background=webkit + second;
  right.style.background=ms + second;
  right.style.backgroundSize="cover";
  right.style.backgroundPosition = "center center";
  right.style.backgroundRepeat = "no-repeat";
  right.style.backgroundAttachment = "fixed"
}

function display(response){
  console.log("res", response);
  for(var key in response){
    switch (key) {
      case "main":
        console.log("main is", response[key]);
        var div = document.createElement('div');
        div.innerHTML = "<b>"+ key + ":</b><br>";
        results.appendChild(div);
        var outerIndex = response[key];
        console.log(key, "outerIndex", outerIndex);
          for(var inner in outerIndex){
            console.log("inner", inner);
            switch (inner) {
              case "temp":
                  div.innerHTML+=inner + " " + outerIndex[inner] + "<br>";
                break;
              case "temp_max":
                  div.innerHTML+=inner + " " + outerIndex[inner] + "<br>";
                break;
              case "temp_min":
                  div.innerHTML+=inner + " " + outerIndex[inner] + "<br>";
                break;
              case "humidity":
                  div.innerHTML+=inner + " " + outerIndex[inner] + "<br>";
                break;
              default:
                break;
            }
          }
        break;
      case "name":
        var div = document.createElement('div');
        div.innerHTML = "<br>"+"<b>"+ key + ":</b><br>";
        results.appendChild(div);
        div.innerHTML +=response[key];
        break;
      case "weather":
        console.log("weather is", response[key]);
        var div = document.createElement('div');
        div.innerHTML = "<br>"+"<b>"+ key + ":</b><br>";
        results.appendChild(div);
        var outerIndex = response[key];
        var innerIndex = outerIndex[0];
        console.log("innerindex", innerIndex);
          for(var inner in innerIndex){
            switch (inner) {
              case "icon":
                  console.log("icon", inner);
                  console.log("icon", innerIndex[inner]);
                  var img = document.createElement('img');
                  div.appendChild(img);
                break;
              case "description":
                  div.innerHTML+=inner + " " + innerIndex[inner] + "<br>";
                break;
                default:
                  break;
            }
          }
        break;
      default:
      break;

    }
  }
}
}; // end window onload fxn
