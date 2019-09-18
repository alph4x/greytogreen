var headerHeight = 82; //change css header height and landing margin top when changing this
var thresholdWidth = 950; //responsiveness to devices with width lower than this
function init() {
    if (window.innerWidth < thresholdWidth) 
        mobileInit();
    $('.landing').css("height", window.innerHeight - headerHeight);
    $('.sec-content').css("min-height", window.innerHeight - headerHeight);
    var landingCenterHeight = $('.contentx').height();
    // console.log(landingCenterHeight);
    var centerMTop = (window.innerHeight - landingCenterHeight)/2;
    $('.contentx').css("margin-top", centerMTop+"px");
    // $('#map').css("min-height", (window.innerHeight-header_height)*0.7);
    // temporary
}

function mobileInit() {
    console.log("mobile mode");
    $('.header_1').css("display", "none");
    $('.header_2').css("display", "block");
}

function scrollUpdate() {
    var scrollY = window.scrollY;
    var cut = headerHeight;
    // if (scrollY >= cut) {
        // $('.header').removeClass("headerUnscrolledBgcolor");
        // $('#nav-links').remove();
        // $('.header').addClass("headerScrolledBgcolor");
        // $('#logo_header').addClass("slide-right");

        // $.keyframe.define([{
        //     name: 'slideRight',
        //     '0%':   {transform:"translateX(0px)"},
        //     // '50%': {top:$("#testcontainer").innerHeight() + "px"},
        //     '100%': {transform:"translateX(500px)"}
        // }]);

        // $("#logo_header").playKeyframe({
        //     name: 'slideRight',
        //     duration: 500
        // });

        // $('#nav-links').removeClass('d-flex');
        // $('#nav-links').addClass('navlinksOnScroll');
    // } else if (scrollY < cut) {
        // $('#nav-links').removeClass('navlinksOnscroll');
        // $('#nav-links').addClass('d-flex');
        // $('.header').removeClass("headerScrolledBgcolor");
        // $('#logo_header').removeClass("slide-right");
        // $('.header').addClass("headerUnscrolledBgcolor");
    // }
}

$(document).ready(function () {
    init();
    // console.log("fuck");
});

function openNav() {
    var targetW = window.innerWidth * .9;
    targetW = targetW + "px";
    document
        .getElementById("mySidenav")
        .style
        .width = targetW;
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document
        .getElementById("mySidenav")
        .style
        .width = "0";
}