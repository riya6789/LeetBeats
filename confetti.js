function celebrateWithConfetti() {
 var count = 200;
  
 function fire(particleRatio, opts) {
   confetti({
     ...opts,
     particleCount: Math.floor(count * particleRatio)
   });
 }

 // Confetti from bottom right
 function rightConfetti() {
   var defaults = {
     origin: { y: 1, x: 1 },
     angle: 135, 
     spread: 60,
     startVelocity: 50,
     decay: 0.9,
     gravity: 1
   };

   fire(0.25, {
     ...defaults,
     spread: 26,
     startVelocity: 55,
   });
   fire(0.2, {
     ...defaults,
     spread: 60,
   });
   fire(0.35, {
     ...defaults,
     spread: 100,
     decay: 0.91,
     scalar: 0.8
   });
   fire(0.1, {
     ...defaults,
     spread: 120,
     startVelocity: 25,
     decay: 0.92,
     scalar: 1.2
   });
   fire(0.1, {
     ...defaults,
     spread: 120,
     startVelocity: 45,
   });
 }

 // Confetti from bottom left
 function leftConfetti() {
   var defaults = {
     origin: { y: 1, x: 0 }, 
     angle: 45, 
     spread: 60,
     startVelocity: 50,
     decay: 0.9,
     gravity: 1
   };

   fire(0.25, {
     ...defaults,
     spread: 26,
     startVelocity: 55,
   });
   fire(0.2, {
     ...defaults,
     spread: 60,
   });
   fire(0.35, {
     ...defaults,
     spread: 100,
     decay: 0.91,
     scalar: 0.8
   });
   fire(0.1, {
     ...defaults,
     spread: 120,
     startVelocity: 25,
     decay: 0.92,
     scalar: 1.2
   });
   fire(0.1, {
     ...defaults,
     spread: 120,
     startVelocity: 45,
   });
 }

 rightConfetti();
 leftConfetti();
}