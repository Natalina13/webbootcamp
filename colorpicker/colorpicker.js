var numberofsquares = 6;
var colors = [];
var colorpicked;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colordisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetbutton = document.querySelector("#reset");
var modebtn = document.querySelectorAll(".mode");

init();

function init(){
	setMode();
	setSquare();	
	reset();
}

function setMode(){
	for(var i =0; i<modebtn.length; i++){
		modebtn[i].addEventListener("click", function(){
		modebtn[0].classList.remove("selected");
		modebtn[1].classList.remove("selected");
		this.classList.add("selected");
		//this.textContent === "Easy" ? numberofsquare = 3 : numberofsquare = 6;
		if(this.textContent === "Easy"){
			numberofsquares = 3;
		}
		else{
			numberofsquares = 6;
		}
		reset(numberofsquares);
		});
	}
}

function setSquare(){
	for(var i=0; i<squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === colorpicked){
				message.textContent = "Correct!!";
				changecolors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetbutton.textContent = "Play Again?"
			}
			else{
				this.style.backgroundColor = "#232323";
				message.textContent = "Try Again!!"
			}
		});
	}
}

function reset(){
	colors = generaterandomcolors(numberofsquares);
	colorpicked = pickcolor();
	colordisplay.textContent = colorpicked;
	message.textContent = "";
	resetbutton.textContent = "New Colors"
	for(var i=0; i<squares.length;i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else{
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";

}

resetbutton.addEventListener("click", function(){
	reset();
	// colors = generaterandomcolors(numberofsquares);
	// colorpicked = pickcolor();
	// colordisplay.textContent = colorpicked;
	// message.textContent = "";
	// this.textContent = "New Colors"
	// for(i=0; i<squares.length;i++){
	// 	squares[i].style.backgroundColor = colors[i];
	// }
	// h1.style.backgroundColor = "steelblue";
})

colordisplay.textContent = colorpicked;

for(var i=0; i<squares.length; i++){
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click", function(){
		var clickedColor = this.style.backgroundColor;
		if(clickedColor === colorpicked){
			message.textContent = "Correct!!";
			changecolors(clickedColor);
			h1.style.backgroundColor = clickedColor;
			resetbutton.textContent = "Play Again?"
		}
		else{
			this.style.backgroundColor = "#232323";
			message.textContent = "Try Again!!"
		}
	});
}

function changecolors(color){
	for(var i = 0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;

	}
}

function pickcolor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generaterandomcolors(num){
	var arr = [];
	for(var i=0; i<num; i++){
		arr.push(randomcolor())
	}
	return arr;
}

function randomcolor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb("+r+", "+g+", "+b+")";
}


// easy.addEventListener("click",  function(){
// 	numberofsquares = 3;
// 	easy.classList.add("selected");
// 	hard.classList.remove("selected");
// 	colors = generaterandomcolors(numberofsquares);
// 	colorpicked = pickcolor();
// 	colordisplay.textContent = colorpicked;
// 	for(var i = 0; i < squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.backgroundColor = colors[i];
// 		}
// 		else{
// 			squares[i].style.display = "none";
// 		}
// 	}
// })

// hard.addEventListener("click",  function(){
// 	numberofsquares = 6;
// 	hard.classList.add("selected");
// 	easy.classList.remove("selected");
// 	colors = generaterandomcolors(numberofsquares);
// 	colorpicked = pickcolor();
// 	colordisplay.textContent = colorpicked;
// 	for(var i = 0; i < squares.length; i++){
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = "block";
// 	}
// })




