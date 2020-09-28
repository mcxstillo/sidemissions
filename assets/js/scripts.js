$(document).ready(function(){

        // CREATE DURATION BUTTONS
    var buttons = $("input[name='jobDuration']").click(function() {
         $(this).parent().toggleClass('select');  
         buttons.not(this).parent().removeClass('select');            
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

    // CODE FOR TRIMMING DESCRIPTION
    $('span[id=jobDesc]').each(function (f) {
        let num = $(this).text().length;

        if(num > 300) {
            var trim = $(this).text().substring(0,300);
            var ellipsis = "..."
            $(this).text(trim.concat(ellipsis));
        }
    });

    // BUTTON COLOR CHANGE FOR RATING
    $("input:radio[name='rating']").click(function() {  
        if (this.id=="like") {
            $('#likebtn').addClass("liked");
            $('#dislikebtn').removeClass("disliked");
            $('#like').prop("checked",true);
            $('#dislike').prop("checked",false);
        } else if(this.id=="dislike"){
            $('#dislikebtn').addClass("disliked");
            $('#likebtn').removeClass("liked");
            $('#dislike').prop("checked",true);
            $('#like').prop("checked",false);
        }
    }); 

    $("button[name='delete']").click(function() {

        $.ajax({
            type: 'POST',
            url: '/deletepost',
            success: function(){
                ohSnap('Job successfully deleted', {color: 'blue'}); 
            }
        });
    })

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