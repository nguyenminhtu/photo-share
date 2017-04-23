$(document).on('turbolinks:load', function() {
	var baseUrl = "http://localhost:3000/";
	// var baseUrl = "https://evening-cove-86299.herokuapp.com/";
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
			e.preventDefault();

			if (confirm("Are you sure ?")) {
				var id = $(this).attr('id-friend');

				$.ajax({
					type: 'DELETE',
					url: baseUrl + 'friendships/' + id,
					dataType: 'script',
					success: function () {
					},
					error: function () {
					}
				});
			};
		});
		$("body").delegate("button#unfollow-user", "click", function (e) {
			e.preventDefault();

			if (confirm("Are you sure ?")) {
				var id = $(this).attr('id-unfollow');

				$.ajax({
					type: 'DELETE',
					url: baseUrl + 'friendships/' + id,
					dataType: 'script',
					success: function () {
					},
					error: function () {
					}
				});
			};
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
			e.preventDefault();

			if (confirm("Are u sure want to delete this comment ?")) {
				var id_comment = $(this).attr("id-delete-comment");
				var id_post = $(this).attr("id-delete-post");

				$.ajax({
					type: "DELETE",
					url: baseUrl + "images/" + id_post + "/comments/" + id_comment,
					dataType: 'script',
					success: function () {
					},
					error: function () {
					}
				});
			}
		});




		// edit comment
		$("body").delegate("button.update-comment", "click", function (e) {
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




		//share facebook
		





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