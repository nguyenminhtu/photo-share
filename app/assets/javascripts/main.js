$(document).on('turbolinks:load', function() {
	// var baseUrl = "http://localhost:3000/";
	var baseUrl = "evening-cove-86299.herokuapp.com/";
	$(document).ready(function () {
		$('.modal').modal();

		// function for load more image index page
		$("button#load-more").click(function (e) {
			e.preventDefault();

			show_spinner();

			$(this).hide();

			var last_id = $(".image-record").last().attr('data-id');

			$.ajax({
				type: 'GET',
				url: baseUrl + "load_more",
				data: {
					id: last_id
				},
				dataType: "script",
				success: function () {
					hide_spinner();
				},
				error: function () {
					hide_spinner();
				}
			});
		});




		//function for like image
		$("body").delegate(".like-image", "click", function (e) {
			e.preventDefault();

			var id = $(this).attr('id-like');

			$.ajax({
				type: 'PUT',
				url: baseUrl + 'images/' + id + '/like',
				dataType: 'script',
				success: function () {
				},
				error: function () {
				}
			});
		});




		//function for like image
		$("body").delegate(".dislike-image", "click", function (e) {
			e.preventDefault();

			var id = $(this).attr('id-dislike');

			$.ajax({
				type: 'PUT',
				url: baseUrl + 'images/' + id + '/dislike',
				dataType: 'script',
				success: function () {
				},
				error: function () {
				}
			});
		});





		//unfollow function
		$("body").delegate("a#unfollow", "click", function (e) {
			var me = $(this);
			e.preventDefault();

			swal({
			  title: "Are you sure?",
			  text: "You will not be able to follow this user!",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Yes, delete it!",
			  cancelButtonText: "No, cancel plx!",
			  closeOnConfirm: true,
			  closeOnCancel: false
			},
			function(isConfirm){
			  if (isConfirm) {
			  	var id = me.attr('id-friend');

				$.ajax({
					type: 'DELETE',
					url: baseUrl + 'friendships/' + id,
					dataType: 'script',
					success: function () {
					},
					error: function () {
					}
				});
			  } else {
			    swal("Cancelled", "Your friend is safe :)", "error");
			  }
			});

		});
		$("body").delegate("button#unfollow-user", "click", function (e) {
			var me = $(this);
			e.preventDefault();

			swal({
			  title: "Are you sure?",
			  text: "You will not be able to follow this user",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Yes, delete it!",
			  cancelButtonText: "No, cancel plx!",
			  closeOnConfirm: true,
			  closeOnCancel: false
			},
			function(isConfirm){
			  if (isConfirm) {
			  	var id = me.attr('id-unfollow');

				$.ajax({
					type: 'DELETE',
					url: baseUrl + 'friendships/' + id,
					dataType: 'script',
					success: function () {
					},
					error: function () {
					}
				});
			  } else {
			    swal("Cancelled", "Your friend is safe :)", "error");
			  }
			});
		});





		//follow user
		$("body").delegate("button#follow-user", "click", function (e) {
			e.preventDefault();

			var id_user = $(this).attr('id-user');
			var id_follow = $(this).attr('id-follow');

			$.ajax({
				type: 'POST',
				url: baseUrl + 'add_friend',
				data: {
					friend: id_follow,
					user: id_user
				},
				dataType: 'script',
				success: function () {
				},
				error: function () {
				}
			});
		});




		//delete comment
		$("body").delegate("a.delete-comment", "click", function (e) {
			var me = $(this);
			e.preventDefault();

			swal({
			  title: "Are you sure?",
			  text: "You will not be able to recover this comment!",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Yes, delete it!",
			  cancelButtonText: "No, cancel plx!",
			  closeOnConfirm: true,
			  closeOnCancel: false
			},
			function(isConfirm){
			  if (isConfirm) {
			  	var id_comment = me.attr("id-delete-comment");
				var id_post = me.attr("id-delete-post");

				$.ajax({
					type: "DELETE",
					url: baseUrl + "images/" + id_post + "/comments/" + id_comment,
					dataType: 'script',
					success: function () {
					},
					error: function () {
					}
				});
			  } else {
			    swal("Cancelled", "Your friend is safe :)", "error");
			  }
			});

		});





		//delete image
		$("body").delegate("a.delete-image", "click", function (e) {
			var me = $(this);
			e.preventDefault();

			swal({
			  title: "Are you sure?",
			  text: "You will not be able to recover this image!",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Yes, delete it!",
			  cancelButtonText: "No, cancel plx!",
			  closeOnConfirm: true,
			  closeOnCancel: false
			},
			function(isConfirm){
			  if (isConfirm) {
			  	var id = me.attr("data-id");

				$.ajax({
					type: "DELETE",
					url: baseUrl + "images/" + id,
					dataType: 'script',
					success: function () {
					},
					error: function () {
					}
				});
			  } else {
			    swal("Cancelled", "Your friend is safe :)", "error");
			  }
			});

		});






		// edit comment
		$(document).delegate("button.update-comment", "click", function (e) {
			e.preventDefault();

			var id_image = $(this).attr("id-edit-comment-image");
			var id_comment = $(this).attr("id-edit-comment");

			var content = $("div#modal_comment_"+id_comment).find("textarea").val();

			$.ajax({
				type: 'PUT',
				url: baseUrl + 'images/' + id_image + '/comments/' + id_comment,
				data: {
					content: content
				},
				dataType: 'script',
				success: function () {
				},
				error: function () {
				}
			});

		});




		// load more comment
		$(document).delegate("button.loadmore-comment", "click", function (e) {
			e.preventDefault();

			show_spinner();

			$(this).hide();

			var last_id = $(".comment-record").last().attr('data-id');

			var id_image = $(this).attr("id-image-comment");

			$.ajax({
				type: 'GET',
				url: baseUrl + "more-comment",
				data: {
					id: last_id,
					image_id: id_image
				},
				dataType: "script",
				success: function () {
					hide_spinner();
				},
				error: function () {
					hide_spinner();
				}
			});
		});





		// load more image in profile page
		$(document).delegate("button.loadmore-image", "click", function (e) {
			e.preventDefault();

			$(this).hide();

			show_spinner();

			var last_id = $(".image-record").last().attr("data-id");

			$.ajax({
				type: 'GET',
				url: baseUrl + 'more-image',
				data: {
					id: last_id
				},
				dataType: 'script',
				success: function () {
					hide_spinner();
				},
				error: function () {
					hide_spinner();
				}
			});
		});






		// remove image in admin
		$(document).delegate("a.admin-remove-image", "click", function (e) {
			e.preventDefault();

			if (confirm("Are u sure want to delete this image ?")) {
				var id = $(this).attr("data-id");

				$(this).hide();

				show_spinner();

				$.ajax({
					url: baseUrl + 'admin/images/' + id,
					type: 'DELETE',
					dataType: 'script',
					success: function () {
						hide_spinner();
					},
					error: function () {
						hide_spinner();
					}
				});
			}
		});
		// remove user in admin
		$(document).delegate("a.admin-remove-user", "click", function (e) {
			e.preventDefault();

			if (confirm("Are u sure want to delete this user and all images also all comments ?")) {
				var id = $(this).attr("data-id");

				$(this).hide();

				show_spinner();

				$.ajax({
					url: baseUrl + 'admin/users/' + id,
					type: 'DELETE',
					dataType: 'script',
					success: function () {
						hide_spinner();
					},
					error: function () {
						hide_spinner();
					}
				});
			}
		});
		// remove user in admin
		$(document).delegate("a.admin-remove-comment", "click", function (e) {
			e.preventDefault();

			if (confirm("Are u sure want to delete this comment ?")) {
				var id = $(this).attr("data-id");

				$(this).hide();

				show_spinner();

				$.ajax({
					url: baseUrl + 'admin/comments/' + id,
					type: 'DELETE',
					dataType: 'script',
					success: function () {
						hide_spinner();
					},
					error: function () {
						hide_spinner();
					}
				});
			}
		});





		// function for add new comment
		$(document).delegate("form#form-add-comment", "submit", function (e) {
			e.preventDefault();
			$(this).hide();
			show_spinner();

			var content = $(this).find("textarea[id='icon_prefix2']").val();

			var user_id = $(this).find("input[name='user_id']").val();
			var image_id = $(this).find("input[name='image_id']").val();

			$.ajax({
				url: baseUrl + 'images/' + image_id + '/comments',
				type: 'POST',
				dataType: 'script',
				data: {
					content: content,
					user_id: user_id,
					image_id: image_id
				},
				success: function () {
					$("textarea#icon_prefix2").val(' ');
					hide_spinner();
				},
				error: function () {
					$("textarea#icon_prefix2").val(' ');
					hide_spinner()
				}
			});
		});





		//auto complate search box
		var countries = [
		   { value: 'Andorra', data: 'AD' },
		   { value: 'Zimbabwe', data: 'ZZ' }
		];

		$('input#search').autocomplete({
		    lookup: countries,
		    onSelect: function (suggestion) {
		        alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
		    }
		});





		//function for search user
		init_user_search();



		// function for button to top
		$(".dropdown-button").dropdown({ hover: true });
		$('a.back-to-top').hide();
		var amountScrolled = 300;

		$(window).scroll(function() {
			if ( $(window).scrollTop() > amountScrolled ) {
				$('a.back-to-top').fadeIn('100');
			} else {
				$('a.back-to-top').fadeOut('100');
			}
		});

		$('a.back-to-top').click(function() {
			$('html, body').animate({
				scrollTop: 0
			}, 400);
		});

	});  
});