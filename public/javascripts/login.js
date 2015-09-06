$(document).ready(function() {
	
	$('#login_form').on('submit' , function(event) {
		var user_name = $("input[name=username]").val();
		var password = $("input[name=password]").val()
		console.log(user_name);
		console.log(password);
		var got_all_input = received_all_inputs(user_name,password);
		if(got_all_input == false) {
			alert("Missing login information!");
		}
		else {
			var ajaxdata = {
            'username': user_name,
            'password': password,
        	};
			$.ajax({
		        url : "/submitlogin", // the endpoint
		        headers: { 'Content-Type': 'application/json'},
		        type : "POST", // http method
		        dataType:"json",
		        data : JSON.stringify({ajaxdata}), // data sent with the post request
		   		
		        // handle a successful response
		        success : function(json) {
		            console.log(json); // log the returned json to the console
		            console.log("success"); // another sanity check
		            window.location.replace("/questions");
		        }, 
		
		        // handle a non-successful response
		        error : function(xhr,errmsg,err) {
		            console.log("Error.");
		            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
		        }
		    });	
		}
		return false;
	});
});

function received_all_inputs(user_name,password) {
	var result = true;
	if( user_name == null || password == null || user_name == "" || password == "" ) {
		result = false;
	}
	return result;
}