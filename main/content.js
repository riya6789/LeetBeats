function isLeetCodeProblemPage(url) {
  return url.includes("leetcode.com/problems/");
}

function onUrlChange(url) {
  if (submitClicked) {
    //console.log("submit clicked");
    watchForAcceptedResult();
  }
}

function watchForAcceptedResult() {
  const observer = new MutationObserver((mutations, obs) => {
    //console.log("Observer callback triggered.");
    mutations.forEach(mutation => {
      //console.log("Mutation detected:", mutation);
    });

    // Introduce a small delay before checking for the accepted element
    setTimeout(() => {
      const acceptedElement = document.querySelector('span[data-e2e-locator="submission-result"]');
      
      if (acceptedElement) {
        //console.log("Accepted element found.");
        const resultText = acceptedElement.textContent.trim();
        //console.log("Result text:", resultText);

        if (resultText === "Accepted") {
          //console.log("Solution Accepted!");
          celebrateWithConfetti();
          playCelebrationVideo();
        } else {
          //console.log("Solution not Accepted, playing sad song video.");
          playSadSongVideo();
        }
        obs.disconnect();
        submitClicked = false;
      } else {
        //console.log("Accepted element not found.");
        playSadSongVideo();
      }
      obs.disconnect();
      submitClicked = false;
    }, 300);
  });

  // Start observing after a delay
  setTimeout(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }, 500);

  setTimeout(() => {
    //console.log("Timeout reached, disconnecting observer.");
    observer.disconnect();
    submitClicked = false;
  }, 8000);
}

function setupUrlChangeListener() {
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      //console.log("Url change detected");
      onUrlChange(url);
    }
  }).observe(document, {subtree: true, childList: true});
}

function initialize() {
  //console.log("LeetCode extension initialized");
  setupSubmitButtonListener();
  setupUrlChangeListener();
}

initialize();

function setupSubmitButtonListener() {
  const observer = new MutationObserver((mutations, obs) => {
    const submitButton = document.querySelector('button[data-e2e-locator="console-submit-button"]');
    if (submitButton) {
      submitButton.addEventListener('click', () => {
        submitClicked = true;
        //console.log("Submit button clicked, submitClicked set to true.");
        setTimeout(() => {
          submitClicked = false;
          //console.log("Timeout reached in setupSubmitButtonListener, submitClicked reset to false.");
        }, 10000);
      });
      obs.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

let submitClicked = false;

function playCelebrationVideo() {
  if (document.getElementById('leetcode-celebration-video')) {
    //console.log("Celebration video is already playing, skipping.");
    return;
  }

  const videoFilesHappy = ["main/v1.mp4","main/v2.mp4","main/v3.mp4","main/v4.mp4"];
  const randomVideo = videoFilesHappy[Math.floor(Math.random() * videoFilesHappy.length)];
  const video = document.createElement('video');
  video.src = chrome.runtime.getURL(randomVideo);
  video.id = 'leetcode-celebration-video';
  video.autoplay = true;
  video.controls = false;
  video.loop = false;
  document.body.appendChild(video);
  video.style.display = 'block';
  
  video.onended = () => {
    video.style.display = 'none';
    video.remove();
  };
}

function playSadSongVideo() {
  if (document.getElementById('leetcode-sad-video')) {
    //console.log("Sad video is already playing, skipping.");
    return;
  }

  const videoFilesSad = ["main/c1.mp4","main/c2.mp4"];
  const randomVideo = videoFilesSad[Math.floor(Math.random() * videoFilesSad.length)];
  
  try {
    const videoUrl = chrome.runtime.getURL(randomVideo);
    const video = document.createElement('video');
    video.src = videoUrl;
    video.id = 'leetcode-sad-video';
    video.autoplay = true;
    video.controls = false;
    video.loop = false;
    video.preload='auto';
    document.body.appendChild(video);
    video.style.display = 'block';
    
    video.onended = () => {
      video.style.display = 'none';
      video.remove();
    };
  } catch (error) {
    console.error("Error playing sad song video:", error);
  }
}
