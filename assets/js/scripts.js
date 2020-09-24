$(document).ready(function(){

    // CREATE DURATION BUTTONS
    var buttons = $("input:radio").click(function() {
        $(this).parent().toggleClass('select');  
        buttons.not(this).parent().removeClass('select');            
    }); 

    // function char70() {
    //     var str = document.getElementById("userDesc");
    //     var res = str.substring(0, 70);
    //     document.getElementById("userDesc").innerHTML = res;
    // }

    // APPLICATION OHSNAP
    $('#applybtn').click(function() {
        ohSnap('Application Sent', {color: 'green'})
    })

    // DELETE POSTED JOB
    $("button.deletebtn").click(function(){
        let id = $(this).attr("id"), row = $(this).closest(".row")
        $.ajax({
            method: "POST",
            url: "/deletepost",
            data: {
                delID: id
            },
            success: function(){
                row.remove()
                // alert("deleted bye")
            },
            error: function(res){
                // alert(res)
                console.log('ERROR! Not Deleted')
            }
        });
    });

    $("button.accept").click(function(){
        let id = $(this).attr("id")
        let jobID = $('input#jobID').attr("value")
        console.log(id)
        console.log(jobID)
        $.ajax({
            method: "POST",
            url: "/accepteduser",
            data: {
                jobID: jobID,
                id:id
            },
            success: function(){
                console.log('yay')
            },
            error: function(res){
                // alert(res)
                console.log('ERROR! Acceptance Did Not Push Through')
            }
        });
    });
});