function getData(){
    var city = document.getElementById('city').value;
    var country = document.getElementById('country').value;
    var info = document.getElementById('info');
    info.scrollIntoView({ block: 'end',  behavior: 'smooth' });

    if(city && country){

        var url = 'http://api.openweathermap.org/data/2.5/find?q=';
        var misc = '&units=metric&type=accurate&mode=json';
        var key = '&APPID=b4060c19a246c5370036529d4ffaa380';
      

      //GET WEATHER
      fetch(url+city+","+country+misc+key)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        //console.log(data);
        document.getElementById("info").style.visibility = "visible";
        document.getElementById("cityWeather").src="http://openweathermap.org/img/w/"+data.list[0].weather[0].icon+".png";
        document.getElementById("cityWeather").title=data.list[0].weather[0].description;
        document.getElementById("cityTemperature").innerHTML = data.list[0].main.temp+"ºC";
        document.getElementById("cityWind").innerHTML = "wind: "+data.list[0].wind.speed+"km/h";
        
      })
      .catch(function(err) {
            //console.log(err);
            alert('Please enter a valid city');
          });

      //GET POPULATION 
      var urlPopulation = "http://api.population.io/1.0/population/"
      var misc2 = "/today-and-tomorrow/"
      var country2 = getSelectedOption(document.getElementById('country'));

      fetch(urlPopulation+country2+misc2)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        //console.log(data);
        document.getElementById("countryName").innerHTML = country2;
        document.getElementById("countryPopulation").innerHTML = data.total_population[0].population;
      })
      .catch(function(err) {
            //console.log(err);
            alert('Please enter a valid city');
          });
    
    }else{
    alert('Please enter a valid city');
    }

    MyFadeFunction();
    initMap(city);
}

function getSelectedOption(element) {
    return element.options[element.selectedIndex].text;
}

var opacity = 0;
function MyFadeFunction() {

   if (opacity<1) {
      opacity += .1;
      setTimeout(function(){MyFadeFunction()},50);
   }
   document.getElementById('info').style.opacity = opacity;
}

var map, infoWindow;
function initMap(city) {

    var myOptions = {
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map(document.getElementById("map"),myOptions);

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': city }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0]);
            map.setCenter(results[0].geometry.location);
        } else {
            alert("Could not find location: " + location);
        }
    });

}

var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 2000); // Change image every 2 seconds
}
