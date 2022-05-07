$(document).ready(function() {
    var slope, xDiff, meetsEdge, corner, clipPathChange;
    const corners = ["0 0, 0 100%", "100% 0, 100% 100%"];

    // Adjust width and height on resize
    var width = Math.round($(window).width() / 2);
    var height = Math.round($(window).height() / 2);
    console.log(width + ", " + height)
    $(window).resize(function() {
        width = Math.round($(window).width() / 2);
        height = Math.round($(window).height() / 2);
    });

    // Move screen divide on mouse move
    $(document).mousemove(function(event) {
        slope = (height - event.pageY) / (width - event.pageX);

        // Get polygon coordinates
        xDiff = height / slope;
        meetsEdge = [width + xDiff, width - xDiff];

        // Get corner
        corner = corners[0]
        if (event.pageY > height) {corner = corners[1];}

        clipPathChange = "polygon(" + corner  + ", " + meetsEdge[0] + "px " + (height * 2) + "px, " + meetsEdge[1] + "px " + 0 + ")";
        $(".bottom-cover").css({"clip-path": clipPathChange});
    });

    // Change both buttons upon hovering on one
    $("#top-button, #bottom-button").mouseover(function() {
        $("#top-button").addClass("hovered");
        $("#bottom-button").addClass("hovered");
    });

    // Change back button upon moving mouse out
    $("#top-button, #bottom-button").mouseout(function() {
        $("#top-button").removeClass("hovered");
        $("#bottom-button").removeClass("hovered");
    });


    // Zoom on click and remove other elements to centerize the button and other details
    $("#top-button, #bottom-button").click(function() {
        // Remove other elements to center button and clean up screen
        $("h1").remove();
        $("p").remove();
        $("img").remove();

        // Make button permanently change colors
        $("#top-button, #bottom-button").unbind();
        $("#top-button, #bottom-button").unbind();
        $("#top-button").addClass("hovered");
        $("#bottom-button").addClass("hovered");

        // Zoom in slowly
        $("body").css({"overflow": "hidden"});
        $("#top-button").addClass("transition");
        $("#bottom-button").addClass("transition");

        // Then load new page after finished animation
        setTimeout(function() {
            window.location.href = "hta.html";
        }, 900);
    });
});