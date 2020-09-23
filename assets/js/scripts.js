$(document).ready(function(){
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
});