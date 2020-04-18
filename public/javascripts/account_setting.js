$(function () {
	$("#image_edit").change(function() {
		previewImage(this);
	});

	$('#upload_image_btn').click(function (e) { 
		e.preventDefault();
		console.log($('#image_edit')[0].files[0].name);
		var formdata = new FormData();
		formdata.append('avatar', $('#image_edit')[0].files[0]);
		$.ajax({
			type: "POST",
			url: "../CRUD/upload_image_profile",
			data: formdata,
			processData: false,
    		contentType: false,
			success: function (response) {
				console.log('Upload success.')
			}
		});
	});

});

function previewImage(input) {
	if (input.files && input.files[0]) {
	  var reader = new FileReader();
	  
	  reader.onload = function(e) {
		$('#preview_image').attr('src', e.target.result);
	  }

	  reader.readAsDataURL(input.files[0]); // convert to base64 string
	}
  }