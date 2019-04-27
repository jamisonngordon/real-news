$(function () {
    $('#comment').click(function (event) {
        let id = $(event.target).data('id');
        $.ajax("/api/comment/" + id, {
            type: "POST",
            data: {'val' : $('#input-' + id).val().trim()}
        }).then(
            function(response) {
                console.log(response);
                location.reload();
            }
        );
    });
    $('.delete').click(function () {
        let id = $(event.target).data('id');
        let parentID = $(event.target).parent().parent().parent().children('#comment').data('id');
        $.ajax("/api/comment/" + parentID + '/' + id , {
            type: "DELETE"
        }).then(
            function(response) {
                console.log(response);
                location.reload();
            }
        );
    });
});