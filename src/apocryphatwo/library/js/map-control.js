// ESO Interactive Map Control

/* Define Global Variables
--------------------------------------------------*/
var $ = jQuery;
var esomap;
var siteurl = "http://tamrielfoundry.com/"
var tileurl = "http://tamriel.objects.dreamhost.com/";

// Locate our map tiles
if ( "localhost" == window.location.host ) {
	siteurl = "http://localhost/tamrielfoundry/"
	tileurl = "http://localhost/eso-map/tiles/";
}

// Markers
var zone = "cyrodiil"
var locations = new Array();
var activeMarkers = [];
var zoneCoords;

// Boundaries
var allowedBounds;

// Tooltips
var iconver = 0.72;
var tilever = 0.3;
var infowindow;

// Initialization
;$(document).ready(function(){ interactiveMap(zone); });


/* Initiate the Map API
--------------------------------------------------*/
function interactiveMap( zone ) {
	
	// Define the map type
	var mapTypeOptions = {
	   getTileUrl: function(coord,zoom) {
		  return tileurl + zoom + "_" + coord.x + "_" + coord.y + ".jpg?ver=" + tilever;
	   },
	   tileSize: new google.maps.Size(256, 256),
	   maxZoom: 7,
	   minZoom: 2,
	   opacity: 1,
	   name: "ESO Interactive Map"
	};
	var interactiveMapType = new google.maps.ImageMapType( mapTypeOptions );
	
	// Setup map options
	var mapOptions = {
		center: new google.maps.LatLng(0,0),
		zoom: 2,
		streetViewControl: false,
		mapTypeControl: false,
		backgroundColor: "black",
		draggableCursor: "crosshair",
	   };
	   
	// Instantiate the map
	esomap = new google.maps.Map( document.getElementById('map-canvas') , mapOptions );
	esomap.mapTypes.set( 'interactive-map' , interactiveMapType );
	esomap.setMapTypeId( 'interactive-map' );
	
	// Limit panning to legal bounds depending on the zoom level
	allowedBounds = set_bounds( 'new' );
	google.maps.event.addListener( esomap , 'zoom_changed' , function() { 
		set_bounds();
		maybe_hide_markers();
	});
	
	// Add a movement listener to enforce the boundaries
	var lastValidCenter = esomap.getCenter();
	google.maps.event.addListener(esomap, 'center_changed', function() {    	
		if (allowedBounds.contains(esomap.getCenter())) {
			lastValidCenter = esomap.getCenter();
			return; 
		} 	
    	esomap.panTo(lastValidCenter);
	});
	
	// Add a click listener to display the coordiantes
	google.maps.event.addListener(esomap, "click",  
		function(event) {
		
			// Populate the form fields
        	document.getElementById("latFld").value = event.latLng.lat();
        	document.getElementById("lngFld").value = event.latLng.lng();
		}
	);
	
	// Add an info window
	infowindow = new google.maps.InfoWindow();
	
	// If arguments were passed during setup, use them
	if ( '' != zone )
		get_markers();

}

/* Set the boundaries given the zoom level
--------------------------------------------------*/
function set_bounds() {

	// Get the new zoom level
	var zoom 	= esomap.getZoom();
	var center 	= esomap.getCenter();
	
	// Define the allowed boundaries [SW,NE]
	var zoomBounds = [
		[-35,-20,35,20],
		[-70,-100,70,100],
		[-75,-120,75,120],
		[-80,-130,80,130],
		[-85,-135,85,135],
		[-87,-140,87,140],
	];
	var swlat = zoomBounds[zoom-2][0];
	var swlng = zoomBounds[zoom-2][1];
	var nelat = zoomBounds[zoom-2][2];
	var nelng = zoomBounds[zoom-2][3];
	
	// Set the new bounds
	allowedBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng( swlat , swlng ),   //SouthWest Corner
		new google.maps.LatLng( nelat , nelng )    //NorthEast Corner
	);
	
	// Helper function for checking the sign of a variable
	function sign( x ) { return x > 0 ? 1 : x < 0 ? -1 : 0; }
		
	// If changing the zoom has put us out of bounds, move
	if ( !allowedBounds.contains( center ) ) {
		
		// Figure out which dimension is out of bounds
		if ( Math.abs( center.lat() ) > Math.abs( swlat ) ) {
			goodLat = sign( center.lat() ) * ( Math.abs( swlat ) - 0.01 );
		} else {
			goodLat = center.lat();
		}
		if ( Math.abs( center.lng() ) > Math.abs( swlng ) ) {
			goodLng = sign( center.lng() ) * ( Math.abs( swlng ) - 0.01 );
		} else {
			goodLng = center.lng();
		}
		
		// Set some new good bounds
		var goodBounds = new google.maps.LatLng( goodLat , goodLng );
		esomap.panTo( goodBounds );
	}
	
	return allowedBounds;
}

/* Remove markers from the map
--------------------------------------------------*/
function clear_markers() {
	for (var i = 0; i < activeMarkers.length; i++ ) {
		activeMarkers[i].setMap(null);
	}
	activeMarkers = [];
}

/* Hide or display markers depending on the zoom level
--------------------------------------------------*/
function maybe_hide_markers() {
	var zoom 		= esomap.getZoom();
	var visibility	= true;
	
	// Hide markers for big picture
	if ( zoom <= 3 )
		visibility = false; 
		
	// Set the visibility status for the zoom level
	for (var i = 0; i < activeMarkers.length; i++ ) {
		activeMarkers[i].setVisible(visibility);
	}
}

/* Get zone coordinates to pan
--------------------------------------------------*/
function get_zone_coords( zone ) {

	// Supply the central coordinates for the requested zone [lat,lng,zoom]
	var coords = new Object();
	coords['roost'] 		= [-68.00,1.20,6];
	coords['auridon'] 		= [-48.93,-76.40,5];
	coords['grahtwood'] 	= [-55.42,-18.81,5];
	coords['greenshade'] 	= [-48.70,-46.90,5];
	coords['malabal'] 		= [-33.40,-39.50,5];
	coords['reapers'] 		= [-29.88,-12.00,5];

	coords['stros'] 		= [-12.43,-96.52,6];
	coords['betnikh'] 		= [16.06,-120.61,6];
	coords['glenumbra']		= [37.04,-121.27,5];
	coords['stormhaven']	= [46.85,-80.66,5];
	coords['rivenspire']	= [60.13,-92.49,5];
	coords['bangkorai']		= [42.76,-59.81,5];
	coords['alikr']			= [29.71,-90.13,5];
	
	coords['bleakrock'] 	= [56.20,53.80,7];
	coords['balfoyen'] 		= [16.10,95.10,7];
	coords['stonefalls'] 	= [15.15,74.00,5];
	coords['deshaan'] 		= [-3.95,85.33,5];
	coords['shadowfen'] 	= [-22.25,77.75,5];
	coords['therift'] 		= [35.00,38.00,5];
	coords['eastmarch'] 	= [50.60,38.75,5];

	coords['cyrodiil'] 		= [0.52,16.82,4];
	return coords[zone];
}


/* Place markers onto the map
--------------------------------------------------*/
function get_markers() {

	// First clear any existing markers
	clear_markers();
		
	// Get the requested zone
	zone = $( 'select#zone-select :selected' ).attr('value');
	
	// Pan to the selected zone and set an appropriate zoom level
	coords = get_zone_coords( zone );
	zoneCoords = new google.maps.LatLng(coords[0],coords[1]);
	esomap.setZoom(coords[2]);
	esomap.panTo( zoneCoords );
		
	// Get markers for that zone
	$.getScript( siteurl + 'esomap/zones/' + zone + '.js' , function() {

		// Loop through each marker - [ 'name' , 'description' , 'type' , 'zone' , 'lat' , 'lng' ]
		for (i = 0; i < locations.length; i++) {  
				
			// Choose an icon
			var image = {
				url: "esomap/icons/" + locations[i][1] + ".png?ver=" + iconver,
				size: new google.maps.Size(24,24),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(12,12)
			};
			
			// Define the marker
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][3], locations[i][4]),
				map: esomap,
				id: i,
				title: locations[i][0],
				desc: locations[i][2],
				type: locations[i][1],
				icon: image,
			});
			
			// Add it to the active markers array
			activeMarkers.push(marker);
			
			// Set up a click listener for it
			google.maps.event.addListener( marker, 'click', ( function() {
			
				// Use a jQuery trick to include HTML
				var desc = $('<div />').html(this.desc).text();
				var title = $('<div />').html(this.title).text();
			
				// Set up some HTML for the info window
				var marker_content = '<div class="marker-window">'+
				'<h3 class="marker-title">' + title + '</h3>'+
				'<p class="marker-content">' + desc + '</p>'+
				'</div>';	
			
				// Show the tooltip
				infowindow.setContent( marker_content );
				infowindow.open( esomap, this );
				
				// Re-populate the form fields
				var form = $('#map-controls');
				form.find('#editid').attr( 'value' , this.id );
				form.find('#latFld').attr( 'value' , this.position.d );
				form.find('#lngFld').attr( 'value' , this.position.e );
				form.find('#nameFld').attr( 'value' , title );
				form.find('#typeFld').attr( 'value' , this.type );
				form.find('#descFld').html( desc );
				form.find('#context').attr( 'value' , 'edit' );
			}));
		}
	});
}


/* Clear the form for a new marker
--------------------------------------------------*/
function ClearMarker() {

	// Clear the form
	var form = $('#map-controls');
	form.find('#editid').attr( 'value' , 0 );
	form.find('#latFld').attr( 'value' , '' );
	form.find('#lngFld').attr( 'value' , '' );
	form.find('#nameFld').attr( 'value' , '' );
	form.find('#typeFld').attr( 'value' , '' );
	form.find('#descFld').attr( 'value' , '' );
	form.find('#context').attr( 'value' , 'new' );
	
	// Alert it
	alert("Form Reset!");
}

