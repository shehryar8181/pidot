var addClosed = document.querySelector(".skip");
var img = document.querySelector("footer img");
function banner() {
    addClosed.addEventListener("click", function () {
        img.style.display = "none";
        addClosed.style.display = "none";
    });
}
banner();

var hiddenTime = document.querySelector(".second-time");
var timeButton = document.querySelector(".timeBtn");
var timebuttonUp = document.querySelector(".timeBtn-up");

function timeHidenShow() {
    timeButton.addEventListener("click", function () {
        timeButton.style.display = "none";
        hiddenTime.style.display = "block";
        timebuttonUp.style.display = "block";
    });
    timebuttonUp.addEventListener("click", function () {
        timeButton.style.display = "block";
        hiddenTime.style.display = "none";
        timebuttonUp.style.display = "none";
    });
}
timeHidenShow();

var hiddenGuest = document.querySelector(".hide-guest");
var guestButton = document.querySelector(".guestBtn");
var guestBtn = document.querySelector(".guestBtn-up");
function guestHidenShow() {
    guestButton.addEventListener("click", function () {
        guestButton.style.display = "none";
        hiddenGuest.style.display = "block";
        guestBtn.style.display = "block";
    });
    guestBtn.addEventListener("click", function () {
        guestButton.style.display = "block";
        hiddenGuest.style.display = "none";
        guestBtn.style.display = "none";
    });
}
guestHidenShow();

$(document).ready(function () {
    $("#datepicker").datepicker({
        language: "en",
        dateFormat: "dd/mm",
        inline: true,
        autoClose: true,
        editable: false, // Set to false to make the date picker static
        date: "2024-01-22", // Set the initial date
    });

    var currentDate = new Date();
    $("#datepicker").datepicker({
        minDate: currentDate,
    });

    $(function () {
        $("#datepicker").datepicker({
            onSelect: function (date, datepicker) {
                if (date != "") {
                    resetNextDetail();
                    $(".cal-img").hide();
                    $(".span-1").show().text(date);
                    $("#time-tab").prop("disabled", false);
                    $("#time-tab").tab("show");
                    $("#calender-tab").css("opacity", 1);
                }
            },
        });

        $(".input-time").on("click", function () {
            // Get the value of the selected radio button
            var selectedTime = $(this).val();

            // Display the selected time at the top
            $("#selectedTime")
                .text("" + selectedTime)
                .addClass("selected-time");
                resetAfterTime();
            $(".time-img").hide();
            $("#guest-number-tab").prop("disabled", false);
            $("#guest-number-tab").click();
            $("#time-tab").css("opacity", 1);
        });

        $(".input-guest").on("click", function () {
            // Get the value of the selected radio button
            var selectedGuest = $(this).val();

            // Display the selected guest at the top
            $("#selectedGuest")
                .text("" + selectedGuest)
                .addClass("selected-guest");
                resetAfterGuest ( );
            $(".guest-img").hide();
            $("#seating-tab").tab("show");
            $("#seating-tab").prop("disabled", false);
            $("#guest-number-tab").css("opacity", 1);
        });

        $(".input-seat").on("click", function () {
            // Get the value of the selected radio button
            var selectedSeat = $(this).val();

            // Display the selected time at the top
            $("#selectedSeat")
                .text("" + selectedSeat)
                .addClass("selected-seat");
            $(".seating").hide();
            $("#seating-tab").css("opacity", 1);
            $("#nav-reservation-tab").css("opacity", 1);
        });

        // Attach a click event handler to all radio buttons with the class "input-seat"
        $(".input-seat").on("click", function () {
            $("#nav-guest-details-tab").tab("show");
            $("#nav-guest-details-tab").prop("disabled", false);
            $(".seating-bottom-button").prop("disabled", false);
        });

        //seating-bottom-button to open the next tab
        $(".seatBtn").on("click", function () {
            $("#nav-guest-details-tab").tab("show");
        });

        //attach click event on gender bottom button to open the remarks tab
        $(".formBtn").on("click", function () {
            var isValid = true;

            // Check if the form fields are filled out correctly
            $(".needs-validation :input").each(function () {
                if (!this.checkValidity()) {
                    isValid = false;
                    $(this).addClass("is-invalid");
                } else {
                    $(this).removeClass("is-invalid");
                }
            });

            // If the form is valid, switch to the next tab
            if (isValid) {
                $("#remarks-tab").tab("show");
                $("#nav-summary-tab").prop("disabled", false);
                $("#remarks-tab").prop("disabled", false);
                $("#gender-tab").css("opacity", 1);
            }
        });

        //attach click event on remarks bottom button to open the summary tab
        $(".remarks-bottom-button").on("click", function () {
            $("#nav-summary-tab").tab("show");
            $("#nav-summary-tab").css("opacity", 1);
            $("#remarks-tab").css("opacity", 1);
            $("#nav-guest-details-tab").css("opacity", 1);
        });

        //attach click event on summary bottom button to open a payment tab
        $(".summary-payment-button").on("click", function () {
            $("#nav-guest-details-tab").tab("show");
            $("#payment-tab").tab("show");
        });

        //attach click event on payment bottom button to open a summary tab for confirm booking
        $(".payment-bottom-button").on("click", function () {
            var isValid = true;

            // Check if the form fields are filled out correctly
            $(".pay-validation :input").each(function () {
                if (!this.checkValidity()) {
                    isValid = false;
                    $(this).addClass("is-invalid");
                } else {
                    $(this).removeClass("is-invalid");
                }
            });

            // If the form is valid, switch to the next tab
            if (isValid) {
                $("#nav-summary-tab").tab("show");
                $(".summary-payment-button").hide();
                $(".summary-confirm-button").show();
            }
        });
    });

    $("#nav-reservation, #nav-guest-details").change(function () {
        var date = $("#datepicker").val();
        var time = $("input[name=time]:checked").val();
        var selectedGuest = $("input[name=guest]:checked").val();
        var selectedSeat = $("input[name=seat]:checked").val();
        var firstName = $("#first").val();
        var lastName = $("#last").val();
        var emailAddress = $("#inputEmail4").val();
        var phoneNumber = $("#inputNumber4").val();
        var companyName = $("#company-name").val();
        var remarks = $("#remarks").val();

        //update a summary content
        var html_content = `
            <p style="padding-left: 3px;">
                <img src="images/calendar-lines_svgrepo.com.png" class="cal-img" alt=""> ${date + "/2024"}</p>
            <p  style="padding-left: 3px;">
                <img src="images/clock.png" class="time-img" alt="">  ${time}</p>
            <p><img src="images/group.png" class="guest-img" alt="">  ${selectedGuest}</p>
            <p style="padding-left: 3px;">
                <img src="images/seat.png" class="seating" alt="">  ${selectedSeat}</p>
            <p style="padding-left: 3px;">
                <img src="images/2 - Gender/users-3_svgrepo.com.png" alt="">  ${firstName + " " + lastName}</p>
            <p style="padding-left: 3px;">
                <img src="images/email.png" alt=""> ${emailAddress}</p>
            <p style="padding-left: 3px;">
                <img src="images/phone.png" alt=""> ${phoneNumber}</p>
            <p style="padding-left: 3px;">
                <img src="images/company.png" alt=""> ${companyName}</p>
            <p style="padding-left: 3px;">
                <img src="images/2 - Allergies/details_svgrepo.com.png" alt=""> ${remarks}</p>
            `;
        $("#summaryContent").html(html_content);
    });
});

var payTab = document.querySelector("#payment-tab");
var payBtn = document.querySelector(".summary-payment-button");
var details = document.querySelector(".guest-details-section");
var payLine = document.querySelector("#payLine");
payBtn.addEventListener("click", function () {
    payTab.style.display = "block";
    details.style.paddingLeft = "2rem";
    payLine.style.display = "block";
    details.style.paddingRight = "2rem";
});

function resetNextDetail() {
    $("#selectedTime").text("").removeClass("selected-time");
    $(".time-img").show();

    $("#selectedGuest").text("").removeClass("selected-guest");
    $(".guest-img").show();  

    $("#selectedSeat").text("").removeClass("selected-seat");
    $(".seating").show(); 
}

function resetAfterTime ( ) {
    $("#selectedGuest").text("").removeClass("selected-guest");
    $(".guest-img").show();

    $("#selectedSeat").text("").removeClass("selected-seat");
    $(".seating").show(); 
}

function resetAfterGuest ( ) {
    $("#selectedSeat").text("").removeClass("selected-seat");
    $(".seating").show(); 
}