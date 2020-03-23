    var firebaseConfig = {
        apiKey: "AIzaSyDVQpLcefecjpd4y1m51lw8n2L9QyAUEUA",
        authDomain: "infoooware.firebaseapp.com",
        databaseURL: "https://infoooware.firebaseio.com",
        projectId: "infoooware",
        storageBucket: "infoooware.appspot.com",
        messagingSenderId: "410010889393",
        appId: "1:410010889393:web:5ee16b923aa7962e580690",
        measurementId: "G-C77Q5Z5Y31"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    var fname, lname, gender, dob, city, sports;

    function writedata() {

        var ref = firebase.database().ref();
        var obj = {

            fname: $("#fname").val(),
            lname: $("#lname").val(),
            gender: $("#gender").val(),
            dob: $("#dob").val(),
            city: $("#city").val(),
            sports: $("#sports").val(),

            fromdate: $("#fromdate").val(),
            enddate: $("#todate").val(),
            startTime: $("input[name='startTime']:checked").val(),
            endTime: $("input[name='endTime']:checked").val()

        }
        ref.push(obj).then(function() {
            alert('User Submit Success');
            location.reload()
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error, errorCode, errorMessage);
        });
    }
    $(function() {
        var safe1, safe2
        var elements = document.getElementsByTagName("INPUT");
        for (var i = 0; i < elements.length; i++) {
            elements[i].oninvalid = function(e) {
                e.target.setCustomValidity("");
                if (!e.target.validity.valid) {
                    e.target.setCustomValidity("This field cannot be left blank");
                }
            };
            elements[i].oninput = function(e) {
                e.target.setCustomValidity("");
            }
        }

        $("#dob").datepicker({
            "maxDate": new Date()
        })

        $("#registration1").submit(function(e) {

            fname = $("#fname").val()
            lname = $("#lname").val()
            gender = $("#gender").val()
            dob = $("#dob").val()
            city = $("#city").val()
            sports = $("#sports").val()

            $("#form-data-1").hide()
            $("#form-data-2").show()
            return false;
        })
        $("#registration2").submit(function(e) {
            e.preventDefault()
            if ($("input[name='startTime']:checked").length == 0) {
                $('#start-time-error').html("Please Select Start Time");
            }
            if ($("input[name='endTime']:checked").length == 0) {
                $('#end-time-error').html("Please Select End Time");
            }
            writedata();
        })
        $("#fromdiv")
            .change(function() {
                $("#fromdate-label").addClass('active');
                $("#fromdiv").hide()
                safe1 = $('#fromdiv').val()
                var safe = $('#fromdiv').datepicker("option", "dateFormat", "dd-mm-yy").val();
                $("#fromdate").val(safe);
            })

        $("#fromdate").click(function(e) {
            e.preventDefault()
            if ($("#todate").val()) {
                $("#fromdiv")
                    .datepicker({
                        "minDate": new Date(),
                        "maxDate": safe2
                    })
            } else {
                $("#fromdiv")
                    .datepicker({
                        "minDate": new Date()
                    })
            }
            $("#fromdiv").show()
            $("#todiv").hide()
        })

        $("#todiv")
            .change(function() {
                $("#todate-label").addClass('active');
                $("#todiv").hide()
                safe2 = $('#todiv').val()
                var safe = $('#todiv').datepicker("option", "dateFormat", "dd-mm-yy").val();
                $("#todate").val(safe);
            })

        $("#todate").click(function(e) {
            e.preventDefault()
            if ($('#fromdate').val()) {
                $("#todiv")
                    .datepicker({
                        "minDate": safe1
                    })
            } else {
                $("#todiv")
                    .datepicker({
                        "minDate": new Date()
                    })
            }
            $("#todiv").show()
            $("#fromdiv").hide()
        })
        $(".start-time").change(function() {
            if (this.checked) {
                $('#start-time-error').html("");
            } else {
                $('#start-time-error').html("Please Select Start Time");
            }
        })
        $(".end-time").change(function() {
            if (this.checked) {
                $('#end-time-error').html("");
            } else {
                $('#end-time-error').html("Please Select Start Time");
            }
        })

    });