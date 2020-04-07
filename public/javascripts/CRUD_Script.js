$(document).ready(function () {

	$('.delete_btn').click(function (e) { 
		e.preventDefault();
		id = $(this).attr('data-id');
		console.log('Delete select: '+id)
		modal_delete(id)
	});

	$('.edit_btn').click(function (e) { 
		e.preventDefault();
		id = $(this).attr('data-id');
		console.log('Edit select: '+id)
		update(id);
	});

	//Show display after click open delete modal
	$('.delete_ShowModal_btn').click(function (e) { 
		e.preventDefault();
		id = $(this).attr('data-id');
		console.log('Delete select: '+id);
		$('.delete_btn').attr('data-id', id);
		$('#Modal_delete').modal('show');
		html = '<div align="center"><b>Delete Task: </b>'+id+'</div>';
		$('#show_content_delete').html(html);
	});

	//Show display after click open edit modal
	$('.edit_ShowModal_btn').click(function (e) { 
		e.preventDefault();
		id = $(this).attr('data-id');
		console.log('Edit select: '+id);
		$('.edit_btn').attr('data-id', id);
		$('#Modal_edit').modal('show');
		//ajax query data
		query(id);
		//end of ajax query data
	});

	//Reset id after modal close
	$('#Modal_delete, #Modal_edit').on('hidden.bs.modal', function (e) {
		$('#show_content_edit, #show_content_delete').empty();
		$('.delete_btn, .edit_btn').removeAttr('data-id');
	  })
});

function query(id) {
	$.ajax({
		type: "POST",
		url: "CRUD/query_task/"+id,
		data: {
			id: id
		},
		success: function (res) {
			if (res.success) {
				console.log('id from ajax call is', res);
				//render html
				html = 	'<div align="center"><b>Edit Task: </b>'+id+'</div>'+
						'<div><textarea id="desc_edit">'+res.data.desc+'</textarea></div>';
				$('#show_content_edit').html(html);
			} else {
				console.log(res.err_msg);
				}
		}
	});
}

function update(id) {
	let desc_edit = $('#desc_edit').val();
	console.log(desc_edit);
	$.ajax({
		type: "PUT",
		url: "CRUD/update/"+id+"/"+desc_edit,
		data: {
			id: id,
			desc: desc_edit
		},
		success: function (res) {
			if (res.success) {
				console.log('Update success', res);
				window.location.reload();
			} else {
				console.log(res.err_msg);
				}
		}
	});
}

function modal_delete(id) {
	$.ajax({
		type: "DELETE",
		url: "CRUD/delete/"+id,
		data: {
			id: id
		},
		success: function (res) {
			if (res.success) {
				console.log('id from ajax call is', res);
				window.location.reload();
			} else {
				console.log(res.err_msg);
				}
		}
	});
}