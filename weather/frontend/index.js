window.onload = function() {

  var searchBox = document.getElementById('search-box');
  var searchBoxDiv = document.getElementById('search-box-div');
  var searchBtn = document.getElementById('search-btn');
  var backgrounds = document.getElementById('backgrounds');
  var body =document.getElementById("body");
  console.log(backgrounds);

  var url = 'http://localhost:3000';

  searchBtn.addEventListener('click', function(ev) {
    ev.preventDefault();

    var placeSearch = searchBox.value;

    var data = {
      queryString: placeSearch
    };
    console.log("data is", data);
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
  console.log("res in determine", response);
  var resHits = response.hits;
  console.log("response.hits", resHits);
  var resHitsLen = resHits.length;
  console.log("resHitsLen", resHitsLen);
  for(var i = 0; i < resHitsLen; i++){
    console.log(resHits[i]);
    console.log(resHits[i].pageURL);
    var imgContainer = document.createElement('div');
    imgContainer.id="img-containerID"
    backgrounds.appendChild(imgContainer)
    var pic = resHits[i].webformatURL;
    var img = document.createElement('img');
    img.src = pic;
    var button = document.createElement("button");
    button.id = "makeBack";
    button.innerText = "make background"
    imgContainer.appendChild(img);
    imgContainer.appendChild(button);
    button.addEventListener("click", function(){
      var parent = $(this).parent();
      console.log(parent);
      var childImg = parent[0].children[0].src;
      console.log("child", childImg);
      console.log("button was pressed for", parent);
      console.log("child", childImg);

      body.style.background="url("+childImg+")" ;
    })
  }
}

function display(response){
  console.log("res", response);
  for(var key in response){
    switch (key) {
      case "main":
        console.log("main is", response[key]);
        var div = document.createElement('div');
        div.innerHTML = "<b>"+ key + ":</b><br>";
        all.appendChild(div);
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
        all.appendChild(div);
        div.innerHTML +=response[key];
        break;
      case "weather":
        console.log("weather is", response[key]);
        var div = document.createElement('div');
        div.innerHTML = "<br>"+"<b>"+ key + ":</b><br>";
        all.appendChild(div);
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

  //   console.log("key is", key);
  //   if(typeof(response[key])==='object'){
  //     console.log("inside if: key, ", key);
  //     console.log("key is an object", key);
  //     var objectKey = response[key];
  //     for(var val in objectKey){
  //       console.log("obj[val]", objectKey[val]);
  //       var p = document.createElement('p');
  //       p.innerHTML = "<b>" +key + " " +  val + "</b>: " + " " + objectKey[val];
  //       all.appendChild(p);
  //     }
  //
  //   }
  //   console.log(response[key]);
  //   var p = document.createElement('p');
  //   p.innerHTML = "<b>" + key + "</b>: " + " " + response[key];
  //   all.appendChild(p);
  // }


  // The rest is the same as the original marvel lab solution //

}; // end window onload fxn
