history.scrollRestoration = "manual";
var currentSlide = 0;

// Scale canvas to best fit inside container
function scale() {
    $("canvas").each(function(i, canvas_) {
        const canvas = $(canvas_);
        const parent = canvas.parent();
        
        const xRatio = parent.width() / canvas.width();
        const yRatio = parent.height() / canvas.height();
        const ratio = Math.min(xRatio, yRatio)
        canvas.css({
            "transform": "scale(" + ratio + ")",
            "transform-origin": "top left"
        });
    })
}

scale();
$(window).resize(function() {
    scale();
});

// Points along with the descriptions and coordinates stored here
// [x%, y%] [true x, true y (based on canvas scaled size)] [title, desc] context (referenced in order to draw on canvas) [hovered, clicked]
var canvasPoints = [
    [
        [[50, 22], [null, null], ["Skeleton", "A frame to support the body of an organism. Contains bones, cartilage, ligaments, and tendon. Humans have an endoskeleton, which forms the support structure inside the body. Other organisms, especially many invertabrates, may have an exoskeleton, which is external."], null, [false, false]],
    ],
    [
        [[50, 5], [null, null], ["Head", "Serves as a protective cavity for the brain. It's one of the most important bones and is known as the start for all vertebra like structures., the idea of the head comes from the evolutionary trend cephalization. Cephalization is a term used for when animals began to evolve to have the head of the nervous system at the front of their body. Which produced a head like part of the body. The head's shape and structure varies for many different organisms such as, birds, humans, fish, and tetrapods."], null, [false, false]],
        [[63.5, 43], [null, null], ["Arm", "While the arm is commonly thought up as a portion of the human body from the shoulder to the wrist. Though scientifically, the arm is known as the region of the body from the shoulder joint to the elbow joint. The arm consists of mainly the humerus which is three long bones inside of the arm. It joins with the scapula at the shoulder joint. It then joins with the elbow at the ulna and radius at the elbow. The muscles in the arm are divided by a fascial layer and split into two compartments which are anterior and posterior compartments of the arm."], null, [false, false]],
        [[55, 60], [null, null], ["Leg", "A weight-bearing structure that is the entire lower-limb of the body. Used for movement and standing. Humans specifically have legs adapted for walking upright."], null, [false, false]],
        [[55, 96], [null, null], ["Foot", "A weight-bearing structure that also assists in locomotion. The human foot consists of 26 bones, 33 joints, and hundreds of muscles, tendons, and ligaments. The feet of other organisms may be paws, hooves, or some other type."], null, [false, false]],
    ],
    [
        [[51, 30], [null, null], ["Humerus", "A bone that connects the shoulder to the elbow."], null, [false, false]],
        [[50.5, 56], [null, null], ["Ulna", "A long bone that spans from the elbow to the fingers. The ulna forms part of the wrist and elbow joints. In four-legged animals, it is particularly important for muscle attachment and is sometimes fused with the radius (not shown as it this depicts a human ulna)."], null, [false, false]],
        [[54, 62], [null, null], ["Radius", "The larger of the two major forearm bones. The radius is part of two joints, the elbow and wrist side of the hand. The bicep attaches to the radius."], null, [false, false]],
        [[53, 80], [null, null], ["Hand", "An appendage with mutliple fingers adapted for grasping and holding objects. Humans typically have five digits on each hand, which is normally composed of 27 bones. The hand contains many nerve endings and therefore, the sense of touch is often associated with the hands. Opposable thumbs are at a side of each hand and are able to be brought opposite of the fingers. This opposable thumb furthers the ability for a human to grab objects."], null, [false, false]],
    ],
    [

    ],
    [

    ],
    [

    ],
    [

    ],
];

function draw(canvas_, firstTime) {
    const canvas = $(canvas_)[0];
    const context = canvas.getContext("2d");
    // context.imageSoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    const img = new Image();
    
    var xRatio = null;
    var yRatio = null;
    img.onload = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Draw image
        xRatio = canvas.width / img.width;
        yRatio = canvas.height / img.height;
        const ratio = Math.min(xRatio, yRatio);
        const width = img.width * ratio;
        const height = img.height * ratio;
        const x = canvas.width / 2 - width / 2;
        const y = canvas.height / 2 - height / 2;
        context.drawImage(img, x, y, width, height);
        
        // Draw circles
        var points = canvasPoints[currentSlide];
        points.forEach(function(point, i) {
            const x = point[0][0] * canvas.width / 100;
            const y = point[0][1] * canvas.height / 100;
            context.beginPath();
            context.arc(x, y, 20, 0, 2 * Math.PI, false);
            context.fillStyle = "transparent";
            context.lineWidth = 5;
            context.strokeStyle = "#606060";
            if (point[4][0]) {
                context.fillStyle = "rgba(0, 0, 0, 0.4)";
            }
            if (point[4][1]) {
                context.strokeStyle = "#000000";
            }
            context.fill();
            context.stroke();
            
            points[i][1][0] = x
            points[i][1][1] = y
            points[i][3] = context;
        });

        // Apply events to canvases
        if (firstTime) {
            var points = canvasPoints[canvas.parentElement.parentElement.id - 1];
            canvas.addEventListener("mousemove", function(event) {
                const rect = canvas.getBoundingClientRect();
                const x = (event.x - rect.x) * 1000 / rect.width;
                const y = (event.y - rect.y) * 1000 / rect.height;
                var hoverPoint = null;
                points.forEach(function(point, i) {
                    const pointX = point[1][0];
                    const pointY = point[1][1];
                    // console.log(Math.sqrt(Math.pow(pointX - x, 2) + Math.pow(pointY - y, 2)));
                    if (Math.sqrt(Math.pow(pointX - x, 2) + Math.pow(pointY - y, 2)) <= 20) {
                        points[i][4][0] = true;
                        hoverPoint = i;
                    } else {
                        points[i][4][0] = false;
                    }
                });
                if (hoverPoint != null) {
                    $("html, body").css("cursor", "pointer");
                } else {
                    $("html, body").css("cursor", "default");
                }
            }, false);
            canvas.addEventListener("click", function(event) {
                const rect = canvas.getBoundingClientRect();
                const x = (event.x - rect.x) * 1000 / rect.width;
                const y = (event.y - rect.y) * 1000 / rect.height;
                const clickDesc = $(".slides #" + (currentSlide + 1) + " .notes .clickdesc");
                var hoverPoint = null;
                points.forEach(function(point, i) {
                    const pointX = point[1][0];
                    const pointY = point[1][1];
                    if (Math.sqrt(Math.pow(pointX - x, 2) + Math.pow(pointY - y, 2)) <= 20) {
                        points[i][4][1] = true;
                        hoverPoint = i;
                    } else {
                        points[i][4][1] = false;
                    }
                });
                if (hoverPoint != null) {
                    clickDesc.children("h1").text(points[hoverPoint][2][0]);
                    clickDesc.children("p").text(points[hoverPoint][2][1]);
                }
                else {
                    clickDesc.children("h1").text("Nothing Selected");
                    clickDesc.children("p").text("Click on a part to get more information about it");
                }
            }, false);
        }
    };
    const id = canvas.parentElement.parentElement.id;
    if (id == "1") {img.src = "..\\img\\hta\\human.png";}
    else if (id == "2") {img.src = "..\\img\\hta\\skeleton.jpg";}
    else if (id == "3") {img.src = "..\\img\\hta\\arm.png";}
    else if (id == "4") {img.src = "..\\img\\hta\\bone.webp";}
    else if (id == "5") {img.src = "..\\img\\hta\\cell.jpg";}
    else if (id == "6") {img.src = "..\\img\\hta\\lipid.jpg";}
    else if (id == "7") {img.src = "..\\img\\hta\\carbon.png";}
}

function switchSlides() {
    $(".slides").css({transform: "translate(0, -" + (100 * currentSlide) + "vh)"});
}

$(window).on("load", function() {
    // Edit bars
    const progressBars = $("progress");
    const barMax = $(".slides").children().length;
    progressBars.each(function(i, progressBar) {
        progressBar.value = progressBar.parentElement.parentElement.parentElement.id;
        progressBar.max = barMax;
    })

    // Draw images
    const canvases = $(".canvas");
    canvases.each(function(i, canvas_) {
        draw(canvas_, true);
        // Constantly redraw to show changes on hover and click
        setInterval(function() {
            draw(canvas_, false);
        }, 45);
    });
    scale();

    // Switch slides
    const slidesTotal = $(".slides").children().length;
    $(".left").on("click", function() {
        if (currentSlide > 0) {
            currentSlide -= 1;
            switchSlides();
        }
    });
    $(".right").on("click", function() {
        if (currentSlide < slidesTotal - 1) {
            currentSlide += 1;
            switchSlides();
        }
    });
});

