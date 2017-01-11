$(function() {

	// Get the form.
	var form = $('#template-contactform');

	// Get the messages div.
	var formMessages = $('#contact-form-result');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		//var formData = $(form).serialize();
        //console.log(formData);
        
        // 
        var formData = $("form").serialize().split("&");
        console.log(formData);
        var obj={};
        for(var key in formData)
        {
        console.log(formData[key]);
        obj[formData[key].split("=")[0]] = formData[key].split("=")[1];
        }

        console.log(obj);
        var newData = JSON.stringify({"name": obj.name, "email": obj.email, "message": "Phone: " + obj.phone + " Business: " +  obj.business + " Message: " + obj.message});

        
        //var newData = JSON.stringify(formData);
        //console.log(formData);

		// Submit the form using AJAX.
		$.ajax({
            type: "POST",
            url: 'https://7ekftddozh.execute-api.us-west-2.amazonaws.com/prod/contact',
            contentType: 'application/json',
            data: newData,
            dataType: 'json',
            success: function (data) {
                $('#messages').removeClass('hide').addClass('alert alert-success alert-dismissible').slideDown().show();
                $('#messages_content').html('<h4>Thank You! Your information has been sent</h4>');
                $('#modal').modal('show');
                
            // Process success
            },
            error: function (e) {
                $('#messages').removeClass('hide').addClass('alert alert-warning alert-dismissible').slideDown().show();
                $('#messages_content').html('<h4>Looks like we ran into an error please try again later</h4>');
                $('#modal').modal('show');
            // Process error
            },
        });

	});

});
