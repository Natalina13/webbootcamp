//check Off specific todos by clicking on them
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed")
	// if($(this).css("color") === "rgb(128, 128, 128)"){
	// 	$(this).css({
	// 	color: "black",
	// 	textDecoration: "none"
	// })
	// }
	// else{
	// 	$(this).css({
	// 	color: "gray",
	// 	textDecoration: "line-through"
	// })
	// }
});
//click on X to delete todo
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){//this here refers to span
		$(this).remove(); //this here refers to li and not span
	});
	//stop event bubbling
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grab input text from user
		var todo = $(this).val()
		$(this).val("")
		//create a new li and add to ul
		$("ul").append("<li><span><i class='fas fa-trash-alt'></i></span> "+todo+"</li>")

	}
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle(1000);
});