$(document).ready(function() { 
	$('#mcq_form').on('submit' , function(event) {
		var answer_one = $("input[name=group1]:checked").val();
		var answer_two = $("input[name=group2]:checked").val()
		var answer_three = $("input[name=group3]:checked").val()

		var got_all_input = received_all_inputs(answer_one,answer_two,answer_three);
		if(got_all_input == false) {
			alert("Answer all questions!");
		}
		else {
			$("#mcq_submit_button").prop("disabled",true);
			$('input[name=group1]').attr("disabled",true);
			$('input[name=group2]').attr("disabled",true);
			$('input[name=group3]').attr("disabled",true);
			validate_answers(answer_one,answer_two,answer_three);
			var response_one = $('#result1').text();
			var response_two = $('#result2').text();
			var response_three = $('#result3').text();
			var ajaxdata = {
            'one': answer_one,
            'two': answer_two,
            'three': answer_three,
            'feedback_one': response_one,
            'feedback_two': response_two,
            'feedback_three': response_three
        	};
			$.ajax({
		        url : "/submitanswer", // the endpoint
		        headers: { 'Content-Type': 'application/json'},
		        type : "POST", // http method
		        dataType:"json",
		        data : JSON.stringify({ajaxdata}), // data sent with the post request
		   		
		        // handle a successful response
		        success : function(json) {
		            console.log(json); // log the returned json to the console
		            console.log("success"); // another sanity check
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

function received_all_inputs(answer_one,answer_two,answer_three) {
	var result = true;
	if( answer_one == null || answer_two == null || answer_three == null) {
		result = false;
	}
	return result;
}

function validate_answers(answer_one,answer_two,answer_three) {
	if(answer_one == 4) {
		$("#result1").append("Right answer!");
	}
	else {
		$("#result1").append("Wrong answer! Correct answer is 4.");
	}

	if(answer_two == 12) {
		$("#result2").append("Right answer!");
	}
	else {
		$("#result2").append("Wrong answer! Correct answer is 12.");
	}

	if(answer_three == 1) {
		$("#result3").append("Right answer!");
	}
	else {
		$("#result3").append("Wrong answer! Correct answer is 1.");
	}
}