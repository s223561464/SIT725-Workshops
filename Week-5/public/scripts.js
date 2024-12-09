$(document).ready(function () {
    // Initialize modal
    $('.modal').modal();

    // Click event for "Click Me" button
    $('#clickMeButton').on('click', function () {
        $('#modal1').modal('open');
    });

    // Form submission event
    $('#formSubmit').on('click', function (event) {
        event.preventDefault();

        // Collect form data
        const formData = {
            name: $('#nameInput').val(),
            email: $('#emailInput').val(),
        };

        // Send data to the server
        $.ajax({
            url: "/submitForm",
            method: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function (response) {
                alert(response.message); // Show success message
                $('#modal1').modal('close'); // Close modal
            },
            error: function () {
                alert("Error submitting the form!");
            },
        });
    });
});

