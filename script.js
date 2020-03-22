// wait for the whole DOM to load
$(document).ready(function() {

// creates DOM, reads from local storage 
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
            // this is to make sure this is a string
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
        row.addClass("row text-center");
        columnLeft.addClass("col-sm-2 col-2 hour pr-0 text-right");
        columnMiddle.addClass("col-sm-8 col-8 px-0");
        columntRight.addClass("col-sm-2 col-2 pl-0");
        activityNote.addClass("h-100");
        saveButton.addClass("btn btn-primary saveBtn h-100 w-100 btn-block"); 
        
            // here we need to set different backgrounds
            if ( parseInt(id) < parseInt(moment().format('HH'))) {
                // this is past
                activityNote.addClass("past");
            } else if (parseInt(id) === parseInt(moment().format('HH'))) {
                // this is present
                activityNote.addClass("present");
            } else {
                // this is future
                activityNote.addClass("future");
            }
           
        
        // add IDs to each element, each element from the same row will have same numeric part of ID
        // for example, row for time 03am will have the following DOM objects with ids:
        // r03, cl03,cm03,cr03,an03,sb03
        row.attr("id","r" + id);
        columnLeft.attr("id","cl" + id);
        columnMiddle.attr("id","cm" + id);
        columntRight.attr("id","cr" + id);
        activityNote.attr("id","an" + id);
        saveButton.attr("id","sb" + id);
        
        // add text to left columnt, we need to display AM and PM
        (parseInt(id) < 12 ) ? leftTime.text(id + "AM") : leftTime.text(id + "PM")
        // add text to each save button, add bootstrap type=button        
        saveButton.text("SAVE");
        saveButton.attr("type","button");
        // generate local storage key
        let lsID = "an" + id;
        // read from local storage
        let localNote = localStorage.getItem(lsID);
        // read and assign to activity note IF NOT NULL
        localNote !== "null" ? activityNote.val(localNote) : activityNote.val("");

        // append DOM elements
        columnLeft.append(leftTime);
        columnMiddle.append(activityNote);
        columntRight.append(saveButton);
        // append DOM elements to one row
        row.append(columnLeft,columnMiddle,columntRight); 
        // append row to the main container
        $(".container").append(row);
       
    }
}

// function which marks the current hour as red
// it will run on every new hour
// as the result it will highlight the current row with red color
// and mark the last hour as grey
function refreshCurrentRow(oHour,nHour){
    // we need to change 2 rows
    $("#an" + oHour).removeClass("present");
    $("#an" + oHour).addClass("past");

    $("#an" + nHour).removeClass("future");
    $("#an" + nHour).addClass("present");      
}


// jQuery DOM to display current time every second
let timer= setInterval(function() {
    
    // take the time 
    let currentTime = moment().format('MMMM Do YYYY, HH:mm:ss');
    
    // display 
    $("#currentDay").text(currentTime);
    
    // update current hour
    currentHour = moment().format('HH');
    
    // we look for the following time XX:59:59
    if (moment().format('mm') == 59  &&  moment().format('ss') == 59) {
        // calculate next hour
        let newHour = moment().add(1,'hours').format('HH');
        // pass actual hour and next hour
        refreshCurrentRow(currentHour,newHour);
    }
}, 1000);

renderPlanner();

// each save button  on click saves to local storage
$(".saveBtn").on( "click", function() {
    // stops execution of default action
    event.preventDefault(); 
    // calculate DOM id of corresponding activity note e.g.==> an + 03
    let id = this.id.substr(2);
    // save to local storage, create key-value e.g. an03-value_of(#an03)
    localStorage.setItem("an"+id,$("#an"+id).val()); 
    // add tick icon to the left column
    $("#cl" + id).addClass("bg-warning");
});

});  