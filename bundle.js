/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	window.addEventListener("load", getstationDetails(callbackfxn));

	function getstationDetails(callbackIN)
	{
	    firebase.database().ref("100").once('value').then(function(snapshot) {
	        callbackIN(snapshot.val())
	    });
	}


	function callbackfxn(snap) {
	    var stationDetails = [];
	    var chartValues = [];
	    for (var key in snap) {
	        // skip loop if the property is from prototype
	        if (!snap.hasOwnProperty(key)) continue;

	        var obj = snap[key];
	        stationDetails.push(obj);
	    }
	    /*var oldest = stationDetails[0]["unixtime"];
	    for (var i = 0; i < stationDetails.length; i++) {
	        if (oldest < stationDetails[i]["unixtime"])
	        {
	            oldest = stationDetails[i]["unixtime"];
	        }*/
	    for (var i = 0; i < stationDetails.length; i++) {
	        console.log(stationDetails[i]["unixtime"]);
	        chartValues.push([stationDetails[i]["unixtime"], stationDetails[i]["Height"]]);
	        console.log
	    }
	    console.log(chartValues)
	    zingchart.render({
	        id:"waveHeight",
	        width:"100%",
	        height:400,
	        data:{
	            "type":"line",
	            "title":{
	                "text":"Wave Heights over time"
	            },
	            "plot":{
	                "line-width":1,
	                "aspect":"spline",
	                "marker":{
	                    "visible":false
	                }
	            },
	            "series":[
	                {
	                    "values": chartValues
	                }
	            ],
	            "scale-x": {
	                transform: {
	                    "all": "%m/%d/%y  %h:%i %A",
	                    'type' : "date"
	                },
	                "label": {
	                    "text":"Hour"
	                }
	            },
	            "scale-y": {
	                "label": {
	                    "text":"Wave Height (m)"
	                }
	            }
	        }
	    });
	    return stationDetails;
	}

/***/ }
/******/ ]);