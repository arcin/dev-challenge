// You can use CoffeScript in maps.js.coffee if you'd rather.

//### Add google maps integration
$(document).on('page:load', function (event) {
  var plot_me = {
    visited: [
      '5175 W San Fernando Rd, Los Angeles, CA 90039',
      '10 Congress Street #202, Pasadena, CA 91105',
      '471 W Broadway Ave. #340, Glendale, CA 91204',
      '800 S Fairmount Ave. #425,  Pasadena, CA 91105',
      '1560 Chevy Chase Dr. #325,  Glendale, CA 91206'
    ],
    revisit: [
      '729 Ivy Street, Glendale, CA 91105',
      '2329 W. Rosecrans Ave., Gardena, CA 90249',
      '10 Congress Street #300, Pasadena, CA 91105'
    ],
    unvisited: [
      '463 Riverdale Dr, Glendale, CA 91204',
      '1560 Chevy Chase Dr. #345, Glendale, CA 91206',
      '1138 N Brand Blvd #B, Glendale, CA 91202',
      '280 E Colorado Blvd #103, Pasadena, CA 91101',
      '800 S Fairmont Avenue #310, Pasadena, CA 91105',
      '1141 N Brand Blvd #306, Glendale, CA 91202'
    ]
  }

  var map = GMapsHelper.initialize(plot_me);
  // 1510 was the fastest I could ping the Google api's without getting
  // rate limited.
  requestInterval = setInterval(function(){ map.spawnMarkers() }, 1510);
});


var domDependencies = {
  canvasID: 'map-canvas'
};

var GMapsHelper = (function(d){
  // Private module stuff
  var icons = {
     visited: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
     revisit: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
     unvisited: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
   };
  var _createMap = function(){
    var mapOptions, map;
    mapOptions = {
      center: {lat: 34.133764, lng: -118.1507633},
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById(d["canvasID"]),
        mapOptions);
    return map
  }
  var _createGeocoder = function(){
    return new google.maps.Geocoder();
  }
  var _addressesToMarkers = function(addressObj){
    var groups = [];
    for (addressType in addressObj) {
      var group = {};
      group.addresses = addressObj[addressType];
      group.type = addressType;
      groups.push(group);
    }
    return groups;
  }
  var _initializeMapObject = function(addresses){
    var initOptions = {
      map: _createMap(),
      geocoder: _createGeocoder(),
      icons: icons,
      markerGroups: _addressesToMarkers(addresses)
    }
    return new GMap(initOptions);
  }
  // GMap class
  var GMap = function(opts) {
    this.map = opts["map"];
    this.geocoder = opts["geocoder"];
    this.icons = opts["icons"];
    this.markerGroups = opts["markerGroups"]
  }

  GMap.prototype.placeMarker = function(address, type){
    var that, marker;
    that = this;
    that.geocoder.geocode({address: address}, function(results, status){
      if (status == google.maps.GeocoderStatus.OK) {
          marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: that.map,
            icon: that.icons[type]
          });
      } else {
        console.log("awwww snap ", status);
      }
    })
  }

  GMap.prototype.placeAllMarkers = function(addresses, type) {
    for(var i = 0; i < addresses.length; i++) {
      this.placeMarker(addresses[i], type)
    }
  }
  GMap.prototype.spawnMarkers = function(){
    var group;
    if (this.markerGroups.length === 0) {
      clearInterval(requestInterval);
      return
    }
    group = this.markerGroups.pop();
    this.placeAllMarkers(group.addresses, group.type)
  }

  // Public module stuff
  return {
    initialize: function(addresses){
      return _initializeMapObject(addresses)
    }
  }
})(domDependencies)