var init_user_search;

init_user_search = function () {
	$("#user-lookup-form").on("ajax:before", function (event, data, status) {
		show_spinner();
	});

	$("#user-lookup-form").on("ajax:after", function (event, data, status) {
		hide_spinner();
	});

	$("#user-lookup-form").on("ajax:success", function (event, data, status) {
		$("#user-lookup").replaceWith(data);
		init_user_search();
	});

	$("#user-lookup-form").on("ajax:error", function (event, xhr, status, error) {
		hide_spinner();
		$("#user-search-result").replaceWith(' ');
		$("#user-search-error").replaceWith("<p class='red-text darken-4 center-align'>User could not found !</p>");
	});
}