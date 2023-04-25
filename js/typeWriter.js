let i = 0;
let text1 = "Haiii Babiiii!!!";
let text2 = "Today is a Big Day for us.";
let text3 = "In this past year, I've come to know you as the most beautiful, kind, and loving person I've ever met.";
let text4 = "You are my rock, my confidance, my partner in crime, and my soulmate.";
let text5 = "You've been my constant source of strength and inspiration, and I feel so lucky to have you by my side.";

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