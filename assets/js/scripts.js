$(document).ready(function(){

        // CREATE DURATION BUTTONS
    var buttons = $("input[name='jobDuration']").click(function() {
         $(this).parent().toggleClass('select');  
         buttons.not(this).parent().removeClass('select');            
    });

    // CODE FOR TRIMMING DESCRIPTION
    $('span[id=jobDesc]').each(function (f) {
        let num = $(this).text().length;

        if(num > 300) {
            var trim = $(this).text().substring(0,270);
            var ellipsis = "..."
            $(this).text(trim.concat(ellipsis));
        }
    });

        // Code for collapsible
    var coll = document.getElementsByClassName("collapsible");     
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
        } 
        });
    }

    // Automatic previous data as place holders for text and dropdown
    // Automatic color selection for button group
    var durationdb = $('input:radio[name="durationdb"]:checked').val();
    if (durationdb) {
        var duration = $('input:radio[name="jobDuration"]');
        
        if(durationdb == "1-24 Hours") {
            $('input:radio[id="1st"]').parent().addClass('select');  
            $('input:radio[id="1st"]').prop("checked", true);
            duration.not('input:radio[id="1st"]').parent().removeClass('select');
            $('input:radio[name="durationdb"]:checked').prop("checked", false);
        } else if(durationdb == "within 3 days") {
            $('input:radio[id="2nd"]').parent().addClass('select');  
            $('input:radio[id="2nd"]').prop("checked", true);
            duration.not('input:radio[id="2nd"]').parent().removeClass('select');
            $('input:radio[name="durationdb"]:checked').prop("checked", false);
        } else if(durationdb == "1 week") {
            $('input:radio[id="3rd"]').parent().addClass('select');  
            $('input:radio[id="3rd"]').prop("checked", true);
            duration.not('input:radio[id="3rd"]').parent().removeClass('select');
            $('input:radio[name="durationdb"]:checked').prop("checked", false);
        } else if(durationdb == "1 week+") {
            $('input:radio[id="4th"]').parent().addClass('select');  
            $('input:radio[id="4th"]').prop("checked", true);
            duration.not('input:radio[id="4th"]').parent().removeClass('select');
            $('input:radio[name="durationdb"]:checked').prop("checked", false);
        }
    }


    // AJAX function to delete job from manage posts
    $("button[name='delete']").click(function() {
        $.ajax({
            type: 'POST',
            url: '/deletepost',
            success: function(){
                ohSnap('Job successfully deleted', {color: 'blue'}); 
            }
        });
    })

    // AJAX function to send rating to db
    $("button[name='ratingbtn']").click(function() {
        let id = $(this).attr("id"), 
        row = $(this).closest(".row"),
        rating = $("input[name='rating']:checked").val(),
        jobID= $(this).attr("value")
        $.ajax({
            type:"POST",
            url:"/rating",
            data: {
                rating: rating,
                rateID:id,
                jobID:jobID
            },
            success: function() {
                ohSnap('Successfully rated Agent', {color: 'blue'}); 
                row.remove()
            }
        })
    })

    // BUTTON COLOR CHANGE FOR RATING
    $("input[name='rating']").click(function() {  
        if (this.id=="like") {
            console.log("like");
            $(this).prev().addClass("liked");
            $("input:radio").eq($(".dislike").removeClass("disliked"));
            // $('#like').prop("checked",true);
            // $('#dislike').prop("checked",false);
        } else if(this.id=="dislike"){
            console.log("dislike");
            $(this).prev().addClass("disliked");
            $("input:radio").eq( $(".like").removeClass("liked"));
            // $('#dislike').prop("checked",true);
            // $('#like').prop("checked",false);
        }
    }); 

    // APPLICATION OHSNAP
    $('#applybtn').click(function() {
        ohSnap('Application Sent', {color: 'green'})
    })

    // DELETE POSTED JOB
    $("button[name='delete']").click(function(){
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

    // Accepted user for job
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
                window.location.href= "/manage_posts"
            },
            error: function(res){
                // alert(res)
                console.log('ERROR! Acceptance Did Not Push Through')
            }
        });
    });
});