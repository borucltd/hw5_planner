// wait for the whole DOM to load
$(document).ready(function() {

    // global variable, we will use current HOUR as the pointer to the active row
    let currentHour = 0;

    // jQuery DOM to display current time every second
    let timer= setInterval(function() {
        // take the time 
        let currentTime = moment().format('MMMM Do YYYY, HH:mm:ss');
        // display 
        $("#currentDay").text(currentTime);
        // update where we are
        currentHour = moment().format('HH');
        console.log(currentHour);
    }, 1000);
     

function renderPlanner() {

    // start from 00 to 23, this can be easily changed to 09 to 17
    let id="00";
    let dayPart = ["AM", "PM"];
    for (let i=0; i<24; i++){
        // generetate id which will be assigned to all eleemnts in ONE row, represetns hour
        if (i < 10) {
            // for i = 0 1 2 3 ... 9, we need 00, 01, 02 ... 09
            id = (parseInt(i,10) + 100).toString().substring(1);
        } else {
            // this is to make sure this is string
            id = i.toString();
        }  

        // create DOM objects
        let row = $("<div></div>");
        let columnLeft = $("<div></div>");
        let columnMiddle = $("<div></div>");
        let columntRight = $("<div></div>");

        let leftTime= $("<p></p>");
        let activityNote = $("<textarea></textarea>");
        let saveButton = $("<button></button>");

        // add classes to DOM objects
        row.addClass("row");
        columnLeft.addClass("col-lg-2 hour");
        columnMiddle.addClass("col-lg-8");
        columntRight.addClass("col-lg-2");
        saveButton.addClass("saveBtn");
            // here we need to set different backgournd for actvity
            // similar thing will be done by refreshPlanner which will be triggered every hour
            if ( parseInt(id) < parseInt(moment().format('HH'))) {
                // this will be past
                activityNote.addClass("past");
            } else if (parseInt(id) === parseInt(moment().format('HH'))) {
                // this is present
                activityNote.addClass("present");
            } else {
                // this is future
                activityNote.addClass("future");
            }

            
        
        // add IDs to each element, each element from the same row will have same numeric part of ID
        row.attr("id","r" + id);
        columnLeft.attr("id","cl" + id);
        columnMiddle.attr("id","cm" + id);
        columntRight.attr("id","cr" + id);
        activityNote.attr("id","an" + id);
        saveButton.attr("id","sb" + id);

        // add texts to DOM elements ==> HERE we will need to check local storage
        // we need to display AM and PM
        (parseInt(id) < 12 ) ? leftTime.text(id + "AM") : leftTime.text(id + "PM")
        activityNote.text("");
        saveButton.text("SAVE");

        // append DOM elements to make one row
        columnLeft.append(leftTime);
        columnMiddle.append(activityNote);
        columntRight.append(saveButton);
        row.append(columnLeft,columnMiddle,columntRight); 
            
        // add row to container
        $(".container").append(row);
       
    }
}





    // ===========================
    // fire up the Planner
    // ===========================
    renderPlanner();

});  