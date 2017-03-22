
let $slider = $('.slider-js__outer-container');
let $innerItem = $('.slider-js__container-item');
let $arrowLeft = $('.slider-js__arrows_left');
let $arrowRight = $('.slider-js__arrows_right');
let $paginationElement = $('.slider-js__pagination-element');

let	count = $innerItem.length;
let itemLength = $slider.width() +'px';
let	totalLength = $slider.width() * count +'px';
let animationSpeed = 1000;
let intervalSlider;
let intervalProgressBar;
let currentSlide = 1;
let time = 2000;
let isPause = true;

$slider.children().css('width', totalLength);
$innerItem.css('width', itemLength);


let moveLeft = function(){
	$slider.children().animate({'margin-left': '-='+itemLength}, animationSpeed, function(){
		currentSlide++; 
		checkPostion();
	})
}

let moveRight = function(){
	
	$slider.children().animate({'margin-left': '+='+itemLength}, animationSpeed, function(){
		currentSlide--;
		checkPostion();
	})
}

let checkPostion = function(){
	if(currentSlide > count || currentSlide < 1) {
		$slider.children().css('margin-left', 0);
		currentSlide = 1;
	}
}

let startSlider = function(){
	intervalSlider = setInterval(function(){
		moveLeft();
	}, time);
}

let changeItemLoading = function() {
	$paginationElement.children('.active').removeClass('active');

	if( $paginationElement.length > currentSlide) {
		$paginationElement.find('span').eq(currentSlide).addClass('active');
	} else {
		$paginationElement.find('span').css('width', 0);
		$paginationElement.eq(0).find('span').addClass('active');
	}
}

let loading = function() {

	let bar = $paginationElement.find('.active');
	let width = 0;
	
	intervalProgressBar = setInterval(function(){

		if( width == 100) {
			clearInterval(intervalProgressBar);
			moveLeft();	
			changeItemLoading();
			loading();
		} else {
			if(isPause === false) {
				width += 10;
				bar.css('width', width+'%');
			}
		}
		
	}, time * 0.1);

}

// loading();

let stopArea = {
	mouseenter: function(){
		isPause = true;
	},
	mouseleave: function(){
		isPause = false;
	}
}

let fillArea = function(){
	$arrowLeft.click(function(){
		$paginationElement.find('span.active').css('width', '100%');	
	});
	$arrowRight.click(function(){
		$paginationElement.find('span.active').css('width', '0%');	
	});			
}

let changeClass = function(){

	if( $paginationElement.length - 1 > currentSlide  ) {
		
		$paginationElement
			.find('span')
			.removeClass('active')

		$paginationElement	
			.eq(currentSlide + 1)
			.find('span')
			.addClass('active')

	} else {
		$paginationElement
			.eq(0)
			.find('span')
			.addClass('active');
	}
}

$slider.children().on(stopArea);

$arrowLeft.on(stopArea).click(function(){
	fillArea();
	moveLeft();
	changeClass();
}); 

$arrowRight.on(stopArea).click(function(){
	fillArea();
	moveRight();
	changeClass();
}); 

// $arrowLeft
// 	.on('mouseenter', pauseSlider)
// 	.on('mouseleave', loading);

// $arrowRight
// 	.on('mouseenter', pauseSlider)
// 	.on('mouseleave', loading);
