$(document).ready(function() {
    // Before leaving page, do animation
    $(".nav ul li a").click(function() {
        const link = $(this).attr("href");
        $(".leavepage").addClass("transition");
        setTimeout(function() {
            window.location.assign(link);
        }, 300);
        return false;
    });

    // Turn off the link for the <a> that would normally lead to the current page
    $(".nav ul li a.on").off()
    $(".nav ul li a.on").click(function() {return false;});
    
    // Functions for the sliding hamburger menu
    var navBarOpen = false;
    $(".openbutton").click(function() {
        navBarOpen = !navBarOpen;
        if (navBarOpen) {
            $(".openbutton").addClass("navSlideInButton");
            $(".nav ul").addClass("navSlideInBar");

            $(".openbutton").removeClass("navSlideOutButton");
            $(".nav ul").removeClass("navSlideOutBar");
        } else {
            $(".openbutton").addClass("navSlideOutButton");
            $(".nav ul").addClass("navSlideOutBar");

            $(".openbutton").removeClass("navSlideInButton");
            $(".nav ul").removeClass("navSlideInBar");
        };
        setTimeout(function() {
            $(".bars").toggleClass("hidden");
            $(".leftarrow").toggleClass("hidden");
        }, 500);
    });

    // Button cursor change
    $(".openbutton").mouseover(function() {$(this).addClass("hovered");})
    $(".openbutton").mouseout(function() {$(this).removeClass("hovered");})

    // Change colors of links
    $(".nav ul li a").mouseover(function() {$(this).addClass("hovered");})
    $(".nav ul li a").mouseout(function() {$(this).removeClass("hovered");})
});