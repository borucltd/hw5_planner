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

    // start from 00 to 23
    let id="00";
    for (let i=0; i<24; i++){
        // generetate id which will be assigned to all eleemnts in ONE row, represetns hour
        if (i < 10) {
            // for i = 0 1 2 3 ... 9, we need 00, 01, 02 ... 09
            id = (parseInt(i,10) + 100).toString().substring(1);
        } else {
            id = i.toString();
        }  

        //DOM manipulation code
        let domArray=["row", ]
        let row = $("<div></div>");
        row.addClass("row");
        
        // left part
            let columnLeft = $("<div></div>");
            columnLeft.addClass("col-lg-2 hour");

            let leftTime= $("<p><p>");
        
            columnLeft.append(leftTime);

        // middle part
            let columnMiddle = $("<div></div>");
            columnMiddle.addClass("col-lg-8");

            let activityNote = $("<textarea></textarea>");
            activityNote.text("");

            columnMiddle.append(activityNote);

        // right part
            let columntRight = $("<div></div>");
            columntRight.addClass("col-lg-2");

            let saveButton = $("<button></button>");
            saveButton.addClass("saveBtn");
            saveButton.text("SAVE");
            
            columntRight.append(saveButton);

        
            // left, middle, right parts go to one row
            row.append(columnLeft,columnMiddle,columntRight);
            // each row goes inside to the container

        $(".container").append(row);




       


    }
}




    // DOM
    renderPlanner();

});  