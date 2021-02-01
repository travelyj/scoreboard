

function beforeGame(obj,obj2){
 if(obj!="" && obj2!=""){
   localStorage.clear();
 }
}
let enterFullscreen = function(el) {
  if(el.requestFullscreen) {
    el.requestFullscreen();
  } else if(el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } else if(el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if(el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else {
    noFullscreenSupport();
  }
};

let exitFullscreen = function() {
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

let fullscreenButton = document.getElementById('fullscreen-button');
fullscreenButton.addEventListener('click', function(e) {
  e.preventDefault();
  if((window.innerWidth === screen.width && window.innerHeight === screen.height) || (window.fullScreen)) {
    exitFullscreen();
  } else {
    enterFullscreen(document.documentElement);
  }   
});

let eventList = ["fullscreenchange", "MSFullscreenChange", "mozfullscreenchange", "webkitfullscreenchange"];
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

window.onload = function() {

  const videos = [
  { 'name' : 'sample0' },
  { 'name' : 'sample1' },
  { 'name' : 'sample2' }
  ];
  // Create an instance of a db object for us to store our database in
  let db;


  function init() {
  // Loop through the video names one by one
    // Open transaction, get object store, and get() each video by name
    let objectStore = db.transaction(['videos_os'],'readonly').objectStore('videos_os');

    //키값 1에 저장된 값 불러오기
    let request = objectStore.get(1);

    request.onsuccess = function() {
      // If the result exists in the database (is not undefined)
      if(request.result){
        //indexeddb에 저장된 비디오 가져오기
        console.log('taking videos from IDB');    
        console.log(request.result);

        displayVideo(request.result);
      } else {
        // Fetch the videos from the network
        fetchVideoFromNetwork(videos);
      }
    }
  };
  // Define the fetchVideoFromNetwork() function
  function fetchVideoFromNetwork(videos) {
    console.log('fetching videos from network');
    //비디오 경로 배열로 넣기
    let urls = [];
    for(let i = 0; i < videos.length; i++) {
      urls.push('videos/' + ("sample"+i) + '.mp4');
    };

    // then expose their response bodies as blobs
    let mp4Blob = urls.map(function(url){
      return fetch(url).then(function(response){
        return response.blob();
      })
    });
   // Run the next code when a promise has fulfilled
    Promise.all(mp4Blob).then((results)=> {
    //비디오 재생
    displayVideo(results);
    // store it in the IDB using storeVideo()
    storeVideo(results);
  }).catch(function(err){
    console.log(err);
  })
};

  // Define the storeVideo() function
  function storeVideo(mp4Blob) {
  // Open transaction, get object store; make it a readwrite so we can write to the IDB
  let objectStore = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os');

  // Add the blobs to the IDB using add()
  let request = objectStore.add(mp4Blob);

  request.onsuccess = function() {
    console.log('Record addition attempt finished');
  }

  request.onerror = function() {
    console.log(request.error);
  }
};

//비디오 파일 loop 
function displayVideo(mp4Blob) {
    videoSrc = [];
     video = document.getElementById('videos');
     
    for(let i = 0; i <mp4Blob.length; i++) {
      videoSrc.push(URL.createObjectURL(mp4Blob[i]));
    }
    let videoCount = videoSrc.length;
    let video_index = 0;
    function onload(){
     video.addEventListener('ended',onVideoEnded,false);
     video.src = videoSrc[video_index];
     video.play();  
   } 
   function onVideoEnded(){
     video_index++;
     if(video_index > videoCount-1) video_index = 0;
     video.src = videoSrc[video_index];
     video.play();
   }
   onload();
 };


  // Open our database; it is created if it doesn't already exist
  // (see onupgradeneeded below)
  let request = window.indexedDB.open('videos_db', 1);

  // onerror handler signifies that the database didn't open successfully
  request.onerror = function() {
    console.log('Database failed to open');
  };

  // onsuccess handler signifies that the database opened successfully
  request.onsuccess = function() {
    console.log('Database opened succesfully');

    // Store the opened database object in the db letiable. This is used a lot below
    db = request.result;
    init();
  };

  // Setup the database tables if this has not already been done
  request.onupgradeneeded = function(e) {

    // Grab a reference to the opened database
    let db = e.target.result;

    // Create an objectStore to store our videos in (basically like a single table)
    // including a auto-incrementing key
    // let objectStore = db.createObjectStore('videos_os');
    let objectStore = db.createObjectStore('videos_os', { autoIncrement : true });

    // Define what data items the objectStore will contain
    // objectStore.createIndex('mp4', 'mp4', { unique: true });

    console.log('Database setup complete');
  };

  
};
