// Get references to the tbody element, input field and button
var $tbody=document.getElementsByTagName("tbody").item(0);
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $nextBtn = document.querySelector("#next");
var $prevBtn = document.querySelector("#prev");
var pagelastrowoffset = 49;
var currentpage = 0;
var currentstartrow = 0;

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$nextBtn.addEventListener("click", handleNextButtonClick);
$prevBtn.addEventListener("click", handlePrevButtonClick);

// Set filteredAddresses to addressData initially
var filteredSightings = dataSet;
var maxrow = filteredSightings.length;

// renderTable renders the filteredSightings to the tbody
function renderTable() {
    $tbody.innerHTML = "";
    var currentmaxrow = currentstartrow + pagelastrowoffset;
    currenttablerow=0;
    for (var i = currentstartrow; ((i < currentmaxrow) && (i < maxrow)); i++) {
        // Get get the current address object and its fields
        var sighting = filteredSightings[i];
        var fields = Object.keys(sighting);
        // Create a new row in the tbody, set the index to be i + startingIndex
        var $row = $tbody.insertRow(currenttablerow);
        for (var j = 0; j < fields.length; j++) {
            // For every field in the sightings object, create a new cell and set its inner text to be the current value at the current sigthing's field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = sighting[field];
        }
       currenttablerow++
    }
}

function handleSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterDate = $dateInput.value.trim();
    var filterCity = $cityInput.value.trim().toLowerCase()
    var filterState = $stateInput.value.trim().toLowerCase()
    var filterCountry = $countryInput.value.trim().toLowerCase()
    var filterShape = $shapeInput.value.trim().toLowerCase()
    
    // Set filteredSightings to an array of all sightings whose "date" matches the filter
    filteredSightings = dataSet.filter(function(sighting) {
        var sightingDate = sighting.datetime;
        var sightingCity = sighting.city;
        var sightingState = sighting.state;
        var sightingCountry = sighting.country;
        var sightingShape = sighting.shape;
        
        // If true, add the date to the filteredSightings, otherwise don't add it to filteredSightings
        return ((sightingDate === filterDate) && (sightingCity === filterCity) && (sightingState === filterState) && (sightingCountry === filterCountry) && (sightingShape === filterShape));
    });
    renderTable();
}

function handleNextButtonClick() {
    // Increment page variables and re-render
    currentstartrow = currentstartrow + pagelastrowoffset +1;
    currentpage++;
    renderTable();
}

function handlePrevButtonClick() {
    // Decrement page variables and re-render
    if (currentpage != 0) {
        currentstartrow = currentstartrow - pagelastrowoffset -1;
        currentpage--;
        renderTable();       
    }
}

// Render the table for the first time on page load
renderTable();