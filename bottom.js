//전체화면
var enterFullscreen = function(el) {
    if(el.requestFullscreen) {
        el.requestFullscreen();
    } else if(el.msRequestFullscreen) {
        el.msRequestFullscreen();
    } else if(el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
    } else if(el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
    } else {
          console.log('Fullscreen API is not supported.');
    }
};
//전체화면 나가기
var exitFullscreen = function() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

var fullscreenButton = document.getElementById('fullscreen-button');
fullscreenButton.addEventListener('click', function(e) {
    e.preventDefault();
    if((window.innerWidth === screen.width && window.innerHeight === screen.height) || (window.fullScreen)) {
        exitFullscreen();
            } else {
        enterFullscreen(document.documentElement);
    }   
});

var eventList = ["fullscreenchange", "MSFullscreenChange", "mozfullscreenchange", "webkitfullscreenchange"];
for(event of eventList) {
    window.addEventListener(event, function() {
        if(fullscreenButton.querySelector('.fa').classList.contains('fa-compress')) {
            fullscreenButton.querySelector('.fa').classList.add('fa-expand');
            fullscreenButton.querySelector('.fa').classList.remove('fa-compress');
        } else if(fullscreenButton.querySelector('.fa').classList.contains('fa-expand')) {
            fullscreenButton.querySelector('.fa').classList.remove('fa-expand');
            fullscreenButton.querySelector('.fa').classList.add('fa-compress');
        }
    });
}
//타이머 
$(function() {
  $('#countdown').hide();
  // contact form animations
  $('#countBtn').click(function() {  
    $('#countdown').show().focus();
    $('body').scrollTop(0);
     if((window.innerWidth === screen.width && window.innerHeight === screen.height) || (window.fullScreen)) {
        exitFullscreen();
            } else {
        enterFullscreen(document.documentElement);
    }   
  })
});
var intervalHandle;
var secondsRemaining;
var playing = false;
//멈춤
function pauseCountdown() {
  clearInterval(intervalHandle);
  

  return;
}
//다시재생
function resumeCountdown() {
  tick();
  intervalHandle = setInterval(tick, 1000);
  return;

}
//재생
function tick() {
  var timeDisplay = document.getElementById("time");
  
  var hr = Math.floor(secondsRemaining / 3600);
  var min = Math.floor(secondsRemaining / 60);
  var sec = secondsRemaining - (min * 60);
  
  if(hr < 10) {
    hr = "0" + hr;
  }  

  if(min < 10) {
    min = "0" + min;
  }
  
  if(sec < 10) {
    sec = "0" + sec;
  }
  
  var message = hr + ":" + min + ":" + sec;
  timeDisplay.innerHTML = message;
  
  if(secondsRemaining === 0) {
    document.getElementById("errorMessage").innerHTML = "<strong>시간이 종료되었습니다.</strong>";
    document.getElementById("errorMessage").setAttribute("class","alert alert-success text-center");
    clearInterval(intervalHandle);
     $("#countdown").addClass("blink");
     playpause.innerHTML = "▶";
   playing=false;
  }
  secondsRemaining--;
}
//시작
function startCountdown() {
  var minutes = document.getElementById("cd_minutes").value;
  
   //check if it is a number
  if(isNaN(minutes)||minutes == ""){
      document.getElementById("errorMessage").innerHTML = "Yikes! It's not a number. <strong>TRY AGAIN</strong>";
      document.getElementById("errorMessage").setAttribute("class","alert alert-danger text-center");
       
       //hides error after 5 secs
      setTimeout(errorHide, 5000);
      return;
  }
  //get the seconds
  secondsRemaining = minutes * 60;
  //reoccuring function
  intervalHandle = setInterval(tick, 1000);
  //hide input form once running
 $("#setmins").addClass("disable");
  document.getElementById("errorMessage").innerHTML ="";
    $("#countdown").removeClass("blink");

}


//재생/멈춤
playpause.onclick = function() {
  if (playing) {
    playing = false; 
    playpause.innerHTML = "▶";
   pauseCountdown();
  } else if (!playing) {
    playing = true; 
    playpause.innerHTML = "‖";
  if(document.getElementById("time").innerHTML == "00:00:00"){startCountdown();}else{
   resumeCountdown();
  }
  }
}
//초기화
reset.onclick = function() {
  if (playing) {
    playing = false; 
    playpause.innerHTML = "▶";
  }
   $("#setmins").removeClass("disable");
clearInterval(intervalHandle);
document.getElementById("time").innerHTML = "00:00:00";
document.getElementById("minutes").value = "";
 document.getElementById("errorMessage").innerHTML =""
    $("#countdown").removeClass("blink");

}

// // Time that the user will put in input fields
// const inputMinutes = document.getElementById('cd_minutes');
// var playing=false;


// inputMinutes.addEventListener('input', keydownHandler);
// // Time displayed on screen
// const outputHours = document.getElementById('hours');
// const outputMinutes = document.getElementById('minutes');
// const outputSeconds = document.getElementById('seconds');

// outputHours.innerHTML = '00';
// outputMinutes.innerHTML = '00';
// outputSeconds.innerHTML = '00';   
// // Time will change as user types it into input fields
// function keydownHandler() {
//   outputMinutes.innerHTML = formatTime(inputMinutes.value);
// }
// // Formats to keep a 0 in front of single digit
// function formatTime(num){
//   if (num <= 0) {
//     return `00`;
//   } else if (num < 10) {
//     return `0${num}`;
//   } else {
//     return `${num}`;
//   }
// }
// function disableInputs() {
//   inputMinutes.disabled = true;
// }
// playpause = document.getElementById('playpause');
// reset = document.getElementById('reset');

// playpause.onclick = function() {
//   if (playing) {
//     playing = false; 
//     playpause.innerHTML = "▶";
   
//   } else if (!playing) {
//     playing = true; 
//     playpause.innerHTML = "‖";
//   setCountDownDate();
//   timer();
//     disableInputs();
//   }
// }

// reset.onclick = function() {
//   if (playing) {
//     playing = false; 
//     playpause.innerHTML = "▶";
//   }
// inputMinutes.value = 0;
// }
// let countDownDate;
// // Takes inputs and adds them to current time to set the countdown time/date
// function setCountDownDate() {
//   countDownDate = new Date(new Date().getTime() + 
//               (0 * 3600000) + 
//                    (inputMinutes.value * 60000) + 
//                    (0 * 1000));
// }
// // Displays time left every second until end
// function timer() {
//   const countDown = setInterval(function() {

//     const now = new Date().getTime();
//     const timeLeft = countDownDate - now;
// console.log(timeLeft);
//     const hoursLeft = formatTime(Math.floor((timeLeft / (1000 * 60 * 60)) % 60));
//     const minutesLeft = formatTime(Math.floor((timeLeft / 1000 / 60) % 60));
//     const secondsLeft = formatTime(Math.floor((timeLeft / 1000) % 60));

//     outputHours.innerHTML = hoursLeft;
//     outputMinutes.innerHTML = minutesLeft;
//     outputSeconds.innerHTML = secondsLeft;

//     const outputEnd = document.getElementById('end');
//     const colonOne = document.getElementById('colon-one');
//     const colonTwo = document.getElementById('colon-two');

//     if (timeLeft <= 0) {
//       clearInterval(countDown); 
//         playing = false;
//         outputHours.innerHTML = ''; 
//         outputMinutes.innerHTML = '';
//         outputSeconds.innerHTML = '';
//         outputEnd.innerHTML = 'Time is up!';
//         colonOne.style.display = 'none';
//         colonTwo.style.display = 'none';
//         backgroundChange();
        
//     }
//   }, 1000);
// }
