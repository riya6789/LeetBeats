function isLeetCodeProblemPage(url) {
  return url.includes("leetcode.com/problems/");
}

function onUrlChange(url) {
  if (submitClicked && url.includes('/submissions/')) {
    watchForAcceptedResult();
  }
}

function watchForAcceptedResult() {
  const observer = new MutationObserver((mutations, obs) => {
    const acceptedElement = document.querySelector('span[data-e2e-locator="submission-result"]');
    if (acceptedElement && acceptedElement.textContent.trim() === "Accepted") {
      console.log("Solution Accepted!");
      celebrateWithConfetti();
      playCelebrationVideo();
      obs.disconnect();
      submitClicked = false; 
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Disconnect the observer after 30 seconds to prevent indefinite observation
  setTimeout(() => {
    observer.disconnect();
    submitClicked = false; 
  }, 30000);
}

function setupUrlChangeListener() {
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      onUrlChange(url);
    }
  }).observe(document, {subtree: true, childList: true});
}

function initialize() {
  console.log("LeetCode extension initialized");
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
        setTimeout(() => { submitClicked = false; }, 10000); 
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
  const videoFiles = ["v1.mp4", "v2.mp4", "v3.mp4", "v4.mp4"];
  const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
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