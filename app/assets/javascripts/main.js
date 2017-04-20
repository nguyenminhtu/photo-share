$(document).on('turbolinks:load', function() {
	// var baseUrl = "http://localhost:3000/";
	var baseUrl = "https://evening-cove-86299.herokuapp.com/";
	$(document).ready(function () {

		// function for load more
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
		$(".like-image").on("click", function (e) {
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
		$(".dislike-image").on("click", function (e) {
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