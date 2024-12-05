$(document).ready(function () {
    // Initialize modal
    $('.modal').modal();
    
    // Click event for "Click Me" button
    $('#clickMeButton').on('click', function () {
        // Open the modal when the button is clicked
        $('#modal1').modal('open');
    });

    // Click event for form submit button
    $('#formSubmit').on('click', function () {
        // Show an alert when the form is submitted
        alert("Form Submitted!");
    });
});
