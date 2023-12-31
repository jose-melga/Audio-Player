let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let hideVolume = document.getElementsByClassName('volume');


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;




//hidding volume control for mobile and tablet devices
function hideControlVolume() {
	var divElements = document.querySelectorAll(".volume");

	// Check if the user is on a mobile or tablet device
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		// Hide all div elements with the class name 'volume'
		divElements.forEach(function (element) {
			element.style.display = "none";
		});
	}
}

//create a audio Element

let track = document.createElement('audio');

//All songs list
let All_song = [
	{
		name: "Feel Alive",
		path: "music/Feel Alive - Melga Music (Original Mix).mp3",
		img: "img/Feel Alive - Melga Music (Original Mix).jpg",
		singer: "Melga Music"
	},
	
	
	
	{
		name: "Pump It Up",
		path: "music/Danzel - Pump It Up (Club Mix - Tony Mendes Video Re Edit) (320 kbps).mp3",
		img: "img/dancel - pump it up.jpg",
		singer: "Tony Mendes"
	},
	{
		name: "Let's All Chant",
		path: "music/Eugenio Fico - Let's All Chant (Original Mix).mp3",
		img: "img/eugenio - lets all chant.webp",
		singer: "Eugenio Fico"
	},
	{
		name: "Hit 'Em Up Styl",
		path: "music/James Hurr, ESSEL - Hit 'Em Up Style (Extended Mix).mp3",
		img: "img/hit em up style.jpg",
		singer: "James Hurr, ESSEL"
	},

    {
		name: "La Danza",
		path: "music/John Summit - La Danza (Extended Mix) (320 kbps) (1).mp3",
		img: "img/la danza.jpg",
		singer: "John Summit"
	},
    

    {
		name: "Can't Fight",
		path: "music/Matroda - Can't Fight The Feeling (Original Mix).mp3",
		img: "img/cant fight the feeling.jpg",
		singer: "Matroda"
	},


    {
		name: "Sax In The Mix",
		path: "music/Block & Crown - Sax In The Mix (Original Mix).mp3",
		img: "img/sax in the mix.jpg",
		singer: "Block & Crown"
	},
];




// All functions

//heart
// function load the track
function load_track(index_no) {
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;
	track_image.src = All_song[index_no].img;
	artist.innerHTML = All_song[index_no].singer;
	track.load();

	timer = setInterval(range_slider, 1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}


load_track(index_no);


//mute sound function
function mute_sound() {
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}


// reset song slider
function reset_slider() {
	slider.value = 0;
}

// play song
function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song() {
	if (index_no < All_song.length - 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
	} else {
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song() {
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
		playsong();

	} else {
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change() {
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch() {
	if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
		autoplay = 1;
		auto_play.style.background = "#FF8A65";
	}
}


function range_slider() {
	let position = 0;

	// update slider position
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	// function will run when the song is over
	if (track.ended) {
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		if (autoplay == 1) {
			index_no += 1;
			load_track(index_no);
			playsong();
		}
	}
}

// Call the function to hide control volume when the page loads
window.onload = function () {
	hideControlVolume();
};