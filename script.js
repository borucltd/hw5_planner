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
     

    //DOM manipulation code

    let row = $("<div class=row></div>");
    var columnLeft = $("<div class=col-lg-2></div>");
    var columngMiddle = $("<div class=col-lg-8></div>");
    var columntRight = $("<div class=col-lg-2></div>");
    var saveButton = $("<button type=button class='btn btn-success'></button>");


    columnLeft.text("hour will be displayed");
    columngMiddle.text("here you will need to put a note");
    columntRight.append(saveButton);
    row.append(columnLeft,columngMiddle,columntRight);

    $(".container").append(row);
});  