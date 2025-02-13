let i = 0;
let text1 = "HI.";
let text2 = "We shared something truly special.";
let text3 = "Even though we've grown apart, I will always be grateful for you.";
let text4 = "You taught me love, kindness, and so much more.";
let text5 = "Some things change, but the memories will always stay.";

function typeWriter(text, tname){
	if(ok == 5){
		clearInterval(typeInterval);
	}
	if(i < text.length){
		document.getElementById(tname).innerHTML += text.charAt(i);
		i++;
	}
	else{
		ok++;
		i = 0;
	}
}


var typeInterval;

//window.onload = function() {
//	window.onload = function(){};
   	typeInterval = setInterval(function(){
		if(ok == 0){
			typeWriter(text1, "txt1");
		}
		else if(ok == 1){
			typeWriter(text2, "txt2");
		}
		else if(ok == 2){
			typeWriter(text3, "txt3");
		}
		else if(ok == 3){
			typeWriter(text4, "txt4");
		}
		else if(ok == 4){
			typeWriter(text5, "txt5");
		}
	}, 15);
//};
