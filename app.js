document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const sky = document.querySelector(".sky");
  const groundContainer = document.querySelector(".ground-container");
  const timer = document.querySelector(".timer-text");
  const score = document.querySelector(".score-text");

  let visibileNow = false;
  let currentlyNotColliding = true;
  let speed = 2;
  let projectileSpeed = 3;
  let normalSpeed = 2;
  let elementContainer = [];
  const backgroundArray = ["Beach", "Capital", "Krakow", "Lake", "Mountain"];
  const obstacles = [
    "Dragon.gif",
    "Eagle.gif",
    "FootballPlayer.gif",
    "PolishFlag.png",
    "Shamrock.png",
    "Siren.gif",
  ];
  const timerJump = ms => new Promise(res => setTimeout(res, 0.001))

  let ballAngle;
  let jumpCond = false;
  let birdBottom = 250;
  let birdLeft = 100;
  let isGameOver = false;

  let gravity = 2;
  let time = 60;
  let scoreCount = 0;

  timer.innerHTML = time;
  score.innerHTML = scoreCount;
  sound = document.createElement("audio");
  sound.src = "Sounds/PolishAnthem.mp3";
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  document.body.appendChild(this.sound);
  sound.volume = 0.1;
  sound.play();


  jumpSound = document.createElement("audio");
  jumpSound.src = "Sounds/Jump.wav";
  jumpSound.setAttribute("preload", "auto");
  jumpSound.setAttribute("controls", "none");
  jumpSound.style.display = "none";
  document.body.appendChild(this.jumpSound);
  jumpSound.loop = false;

  collectSoundTime = document.createElement("audio");
  collectSoundTime.src = "Sounds/Get_Item2.wav";
  collectSoundTime.setAttribute("preload", "auto");
  collectSoundTime.setAttribute("controls", "none");
  collectSoundTime.style.display = "none";
  document.body.appendChild(this.collectSoundTime);
  collectSoundTime.loop = false;

  FireballShoot = document.createElement("audio");
  FireballShoot.src = "Sounds/Get_Item2.wav";
  FireballShoot.setAttribute("preload", "auto");
  FireballShoot.setAttribute("controls", "none");
  FireballShoot.style.display = "none";
  document.body.appendChild(this.collectSoundTime);
  FireballShoot.loop = false;
  FireballShoot.play();

  collectSoundScore = document.createElement("audio");
  collectSoundScore.src = "Sounds/PolishAnthem.mp3";
  collectSoundScore.setAttribute("preload", "auto");
  collectSoundScore.setAttribute("controls", "none");
  collectSoundScore.style.display = "none";
  document.body.appendChild(this.collectSoundScore);
  collectSoundScore.loop = false;
  collectSoundScore.play();

  gameOverSound = document.createElement("audio");
  gameOverSound.src = "Sounds/Explode2.wav";
  gameOverSound.setAttribute("preload", "auto");
  gameOverSound.setAttribute("controls", "none");
  gameOverSound.style.display = "none";
  document.body.appendChild(this.gameOverSound);
  gameOverSound.loop = false;



  gameDisplay.addEventListener('click', function (e) {

    if (!isGameOver) {

      if (jumpCond === false) {
        if (birdBottom < 470)
          jump();
        jumpSound.play();

      }

    }
  });




  function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
      return ele != value;
    });
  }
  const isOverlapping = (e1, secondDiv) => {

    e2 = secondDiv.mdiv;
    if (e1.length && e1.length > 1) {
      e1 = e1[0];
    }
    if (e2.length && e2.length > 1) {
      e2 = e2[0];
    }
    const rect1 = e1 instanceof Element ? e1.getBoundingClientRect() : false;
    const rect2 = e2 instanceof Element ? e2.getBoundingClientRect() : false;

    let overlap = false;

    if (rect1 && rect2) {
      overlap = !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );

      return { number: secondDiv.number, overlapState: overlap };
    }


    console.warn('Please provide valid HTMLElement object');
    return { number: 25, overlapState: overlap };
  }




  const startGame = () => {
    birdBottom -= gravity;
    bird.style.left = birdLeft + "px";
    bird.style.bottom = birdBottom + "px";
    gravity += 0.3;



    timer.innerHTML = time;
    score.innerHTML = scoreCount;

    elementContainer.forEach(element => {
      num = isOverlapping(bird, element);

      console.log(currentlyNotColliding);

      if (num.overlapState) {
        if (currentlyNotColliding) {
          switch (num.number) {
            case 0: currentlyNotColliding = false;
              gameOver();
              break;
            case 1: currentlyNotColliding = false;
              element.mdiv.style.backgroundImage = "url('./obstacle/EaglePickup.gif')";
              time += 7;
              collectSoundTime.play();

              elementContainer = arrayRemove(elementContainer, element);
              break;
            case 111: currentlyNotColliding = false;
              element.mdiv.style.backgroundImage = "url('./obstacle/BallPickUp.gif')";
              bird.style.backgroundImage = "url('./LeperchaunCatch.gif')";
              time += 7;
              collectSoundTime.play();
              elementContainer = arrayRemove(elementContainer, element);
              break;
            case 3: currentlyNotColliding = false;
              element.mdiv.style.backgroundImage = "url('./obstacle/FlagPickup.gif')";
              elementContainer
              elementContainer = arrayRemove(elementContainer, element);
              scoreCount += 25;
              collectSoundTime.play();

              break;
            case 4: scoreCount += 75;
              currentlyNotColliding = false;
              element.mdiv.style.backgroundImage = "url('./obstacle/CloverPickup.gif')";
              elementContainer = arrayRemove(elementContainer, element);
              break;
            case 5: currentlyNotColliding = false;
              time += 7;
              element.mdiv.style.backgroundImage = "url('./obstacle/SirenPickup.gif')";
              time += 7;
              collectSoundTime.play();
              elementContainer = arrayRemove(elementContainer, element);
              break;
            case 11: currentlyColliding = false; gameOver(); break;
          }

        } else {
          currentlyNotColliding = true;
        }
      }
    });

  };

  let gameTimerId = setInterval(startGame, 20);
  startGame.setTimeout

  const jump = () => {
    jumpCond = true;
    nexPosY = birdBottom + 75;
    load();
    gravity = 2;
    jumpCond = false;
  };
  async function load() { // We need to wrap the loop into an async function for this to work
    bird.style.backgroundImage = "url(LeprechaunJumpGIF.gif)"
    while (birdBottom < nexPosY) {

      gravity = 0;
      birdBottom += 2;
      await timerJump(3); // then the created Promise can be awaited
    }
    bird.style.backgroundImage = "url(LeprechaunFallGIF.gif)"
  }

  const control = (e) => {
    if (e.keyCode === 32) {
      jump();
    }
  };

  const generateObstacle = () => {
    let obstacleLeft = 400;
    let projectileLeftFire = 400;
    let projectileLeftBall = 400;
    let randomHeight = 62 + Math.random() * 380;
    let obstacleBottom = randomHeight;
    let projectileBottomFire = randomHeight;
    let projectileBottomBall = 50;

    const obstacle = document.createElement("div");
    const projectileFire = document.createElement("div");
    const projectileBall = document.createElement("div");

    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      projectileFire.classList.add("projectiles");
      projectileBall.classList.add("projectiles");
    }

    let obstacleNumber = Math.floor(Math.random() * 6);


    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(projectileFire);
    gameDisplay.appendChild(projectileBall);
    obstacleNames = obstacles[obstacleNumber];
    obstacle.style.backgroundImage = `url('./obstacle/${obstacles[obstacleNumber]}')`;

    obstacle.style.left = obstacleLeft + "px";
    projectileFire.style.left = projectileLeftFire + "px";
    projectileBall.style.left = projectileLeftBall + "px";
    obstacle.style.bottom = obstacleBottom + "px";

    elementContainer.push({ number: obstacleNumber, mdiv: obstacle })

    if (obstacleNumber === 0) {
      projectileFire.style.bottom = projectileBottomFire + "px";
      projectileFire.style.backgroundImage = `url('./obstacle/Fireball.gif')`;
      projectileFire.style.visibility = "hidden";
      elementContainer.push({ number: 11, mdiv: projectileFire })
    }
    else if (obstacleNumber === 2) {
      obstacle.style.bottom = 50 + "px";
      projectileBall.style.bottom = 50 + "px";
      projectileBall.style.backgroundImage = `url('./obstacle/Ball.png')`;
      projectileBall.style.visibility = "hidden";
      elementContainer.push({ number: 111, mdiv: projectileBall })
    }
    const moveProjectileFire = () => {

      if (projectileLeftFire < 300) {
        speed = projectileSpeed;
        projectileFire.style.visibility = "visible";

      }

      projectileLeftFire -= speed;
      projectileFire.style.left = projectileLeftFire + "px";

      if (projectileLeftFire === -10) {

        clearInterval(projectiletimerIdFire);
        gameDisplay.removeChild(projectileFire);
      }

      if (birdBottom <= 60 || birdBottom === 470) {
        clearInterval(projectiletimerIdFire);
      }
    };


    const moveProjectileBall = () => {

      if (projectileLeftBall <= 300) {
        speed = projectileSpeed;
        projectileBall.style.visibility = "visible";
        visibileNow = true;

      } else {
        visibileNow = false;
      }

      if (visibileNow) {
          ballAngle = 5;
      }
      else{
          ballAngle = 0;
      }

      projectileLeftBall -= speed;
      projectileBottomBall += ballAngle;
      console.log(ballAngle);
      projectileBall.style.left = projectileLeftBall + "px";
      
      projectileBall.style.bottom = projectileBottomBall + "px";

      if (projectileLeftBall === -10) {
        if (projectileBall.style.backgroundImage === "Ball.png")
          timer -= 7;
        clearInterval(projectiletimerIdBall);
        gameDisplay.removeChild(projectileBall);
        score.innerHTML = scoreCount;
      }

      if (birdBottom <= 60 || birdBottom === 470) {
        clearInterval(projectiletimerIdBall);
      }
    };
    let projectiletimerIdFire = setInterval(moveProjectileFire, 20);
    let projectiletimerIdBall = setInterval(moveProjectileBall, 20);

    const moveObstacle = () => {

      obstacleLeft -= normalSpeed;
      obstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === -10) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        score.innerHTML = scoreCount;
      }

      if (birdBottom <= 60 || birdBottom === 470) {
        clearInterval(timerId);
        gameOver();
      }
    };
    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) {
      setTimeout(generateObstacle, 2000);
    }
  };

  generateObstacle();

  const ChangeBackground = () => {
    let randomBackground = Math.floor(Math.random() * 4);
    console.log(randomBackground);
    sky.style.backgroundImage = `url('./backgrounds/${backgroundArray[randomBackground]}Static.png')`;
    groundContainer.style.backgroundImage = `url('./backgrounds/${backgroundArray[randomBackground]}Ground.png')`;
  };

  let backgroundChange = setInterval(() => {
    if (!isGameOver) {
      ChangeBackground();
    }
  }, 20000);

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(backgroundChange);

    console.log("Game over");
    gameOverSound.play();

    bird.style.backgroundImage = "url(LeprechaunDead.png)"

    isGameOver = true;
    document.removeEventListener("keyup", control);
  };

  document.addEventListener("keyup", control);

  const startTimer = () => {
    let timerCounter = setInterval(() => {
      if (time === 0) {
        gameOver();
        isGameOver = true;
        clearInterval(timerCounter);
      }
      if (!isGameOver) {
        time -= 1;
        timer.innerHTML = time;
      }
    }, 1000);
  };
  startTimer();
});