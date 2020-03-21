// wait for the whole DOM to load
$(document).ready(function() {

    // global variable, we will use current HOUR as the pointer to the active row
  
    if (localStorage.getItem("notes") === null) {
        let notesArray = [];
        for (let i=0; i<24; i++){
            notesArray[i]="_";
        }
        localStorage.setItem("notes", JSON.stringify(notesArray));
    } else {

        let notesArray = JSON.parse(localStorage.getItem("notes"));
    }

 
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
        
        columnLeft.addClass("col-lg-2 col-md-2 col-sm-2 hour pr-0 text-right");
        columnMiddle.addClass("col-lg-8 col-md-8 col-sm-8 px-0");
        columntRight.addClass("col-lg-2 col-md-2 col-sm-2 pl-0");
        activityNote.addClass("h-100");
        saveButton.addClass("btn btn-primary saveBtn h-100 w-100"); //
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

      

        
        saveButton.text("SAVE");
        saveButton.attr("type","button");

        // append DOM elements to make one row
        columnLeft.append(leftTime);
        columnMiddle.append(activityNote);
        columntRight.append(saveButton);
        row.append(columnLeft,columnMiddle,columntRight); 
            
        // add row to container
        $(".container").append(row);
       
    }
}

    // function which marks the current hour as red
    // it will run on every new hour
    // as the result it will highlight the current row with red color
    function refreshCurrentRow(){
        // becasue this function run only when time is XX:59:59
        // we assume that red color can be moved as soon as we are in new hour
        let oldHour = moment().format('HH');
        let newHour = oldHour;
        setTimeout(function(){ newHour = moment().format('HH'); }, 1000);

        // this is new actual hour
        console.log("Old hour:" + oldHour);
        console.log("New hour:" + newHour);

        // we need to change 2 rows
        $("#an" + oldHour).removeClass("present");
        $("#an" + oldHour).addClass("past");

        $("#an" + newHour).removeClass("future");
        $("#an" + newHour).addClass("present");      
    }


    // jQuery DOM to display current time every second
    let timer= setInterval(function() {
        // take the time 
        let currentTime = moment().format('MMMM Do YYYY, HH:mm:ss');
        // display 
        $("#currentDay").text(currentTime);
        // update where we are
        currentHour = moment().format('HH');
        
        if (moment().format('mm') == 59  &&  moment().format('ss') == 59) {
            console.log("time to refesh");
            refreshCurrentRow();
        }
    }, 1000);



    // ===========================
    // fire up the Planner
    // ===========================
    renderPlanner();







});  