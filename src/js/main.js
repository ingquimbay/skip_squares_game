var game = (function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    //1. Create the player object
    // Define all argument that will be used by fillRect()
    var player = {
        x: 0,
        y: 475,
        h: 25,
        w: 25,
        fill: '#fff',
        //6. Add a default direction for player movement.
        dir: 'right',
        //13. Add a speed property to the player this is the number of pixels 
        //the player will move each frame
        speed: 3
    }

    //15. Define an enemy spawn
    var spawn = {
        x: 50,
        y: 0,
        h: 10,
        w: 10,
        fill: '#ccff33',
        speed: 5
    }

    //18. Initialize an Object of spawns
    var spawns = {}

    //19. Initialize a variable for launching spawns.
    var spawner = null;

    //29. Add the animation frames to a variable that we can kill later
    var animation = null;

    //30. Track the state of game over
    var gameOver = false;

    //36. Create a variable to hold the score
    var score = 0;

    //16. Create a method for launching spawns
    // this iteration will launch a single spawn and then is changed to launch many
    function launchSpawns() {
        //21. Create a new enemy spawn every 400 ms
        spawner = setInterval(() => {
            //22. Use psuedo-random strings to name the new spawns
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < 10; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            //23. Add the new spawn to the Object of Spawns
            spawns[text] = {
                x: Math.floor(Math.random() * this.canvas.width),
                y: spawn.y,
                h: spawn.h,
                w: spawn.w,
                fill: spawn.fill,
                //changed speed: spawn.speed,
                speed: Math.floor(Math.random() * 7 + 1),
            }

        }, 400);
    }

    // //24. Move all spawns
    // function moveSpawns() {

    //     //25. Loop through the Object of spawns
    //     //and move each one individually.
    //     //This will look a lot like movePlayer()
    //     if (Object.keys(spawns).length > 0) {
    //         for (let spawn in spawns) {

    //             //26. Only move the spawn, if the spawn has not 
    //             //moved off of the screen.
    //             if (spawns[spawn].y <= canvas.height) {

    //                 ctx.fillStyle = spawns[spawn].fill;

    //                 ctx.save();

    //                 ctx.clearRect(
    //                     spawns[spawn].x - 1,
    //                     spawns[spawn].y - spawns[spawn].speed,
    //                     spawns[spawn].w + 2,
    //                     spawns[spawn].h + 2
    //                 );

    //                 ctx.fillRect(
    //                     spawns[spawn].x,
    //                     spawns[spawn].y = (spawns[spawn].y + spawns[spawn].speed),
    //                     spawns[spawn].w,
    //                     spawns[spawn].h
    //                 );

    //                 ctx.restore();

    //                 //31. When each spawn move detect if that spawn shares common pixels
    //                 //with the player. If so this is a collision.
    //                 //@see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    //                 if (
    //                     player.x < spawns[spawn].x + spawns[spawn].w &&
    //                     spawns[spawn].x > player.x && spawns[spawn].x < (player.x + player.w) &&
    //                     player.y < spawns[spawn].y + spawns[spawn].h &&
    //                     player.y + player.h > spawns[spawn].y
    //                 ) {
    //                     //32. If there is a collision set gameOver to true
    //                     gameOver = true;
    //                     //33. ...kill the animation frames
    //                     cancelAnimationFrame(animation);
    //                     //34. ...kill the spawner
    //                     clearInterval(spawner);
    //                 }
    //             } else {
    //                 //27. Delete the spawn from the Object of spawns if 
    //                 // that spawn has moved off of the screen.
    //                 delete spawns[spawn];
    //             }
    //         }
    //     }

    // }

    return {

        moveSpawns: function () {

            //25. Loop through the Object of spawns
            //and move each one individually.
            //This will look a lot like movePlayer()
            if (Object.keys(spawns).length > 0) {
                for (let spawn in spawns) {

                    //26. Only move the spawn, if the spawn has not 
                    //moved off of the screen.
                    if (spawns[spawn].y <= canvas.height) {

                        ctx.fillStyle = spawns[spawn].fill;

                        ctx.save();

                        ctx.clearRect(
                            spawns[spawn].x - 1,
                            spawns[spawn].y - spawns[spawn].speed,
                            spawns[spawn].w + 2,
                            spawns[spawn].h + 2
                        );

                        ctx.fillRect(
                            spawns[spawn].x,
                            spawns[spawn].y = (spawns[spawn].y + spawns[spawn].speed),
                            spawns[spawn].w,
                            spawns[spawn].h
                        );

                        ctx.restore();

                        //31. When each spawn move detect if that spawn shares common pixels
                        //with the player. If so this is a collision.
                        //@see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
                        if (
                            player.x < spawns[spawn].x + spawns[spawn].w &&
                            spawns[spawn].x > player.x && spawns[spawn].x < (player.x + player.w) &&
                            player.y < spawns[spawn].y + spawns[spawn].h &&
                            player.y + player.h > spawns[spawn].y
                        ) {
                            //32. If there is a collision set gameOver to true
                            gameOver = true;
                            //33. ...kill the animation frames
                            cancelAnimationFrame(animation);
                            //34. ...kill the spawner
                            clearInterval(spawner);
                        }
                    } else {
                        //37. Increment the score when any time
                        //an enemy sprite move off screen
                        score = score + 10;
                        //3. Write the score to a separate div
                        document.getElementById('score').innerHTML = score;

                        //27. Delete the spawn from the Object of spawns if 
                        // that spawn has moved off of the screen.
                        delete spawns[spawn];
                    }
                }
            }

        },

        //2. Draw the player to the canvas
        player: function () {
            ctx.fillStyle = player.fill;

            //3. Define how many pixels the player
            // should move each frame (i.e. speed)
            if (player.dir === 'right') {
                ctx.clearRect(
                    // Changed x-1 to player.x - player.speed
                    player.x - player.speed,
                    player.y - 1,
                    player.w + 2,
                    player.h + 2
                );

                //7. Add x pixels to move the player to the right

                ctx.fillRect(
                    // Changed player.x++ to player.x = (player.x + player.speed)
                    player.x = (player.x + player.speed),
                    player.y,
                    player.w,
                    player.h
                );

                //8. Change the player direction when the player touches the edge 
                //of the canvas.
                if ((player.x + player.w) >= canvas.width) {
                    player.dir = 'left';
                }

            } else {

                //14. Change player.x+1 to player.x+player.speed
                ctx.clearRect(
                    player.x + player.speed,
                    player.y - 1,
                    player.w + 2,
                    player.h + 2
                );

                //9. Subtract x pixels to move the player to the left
                // Changed player.x-- to player.x = (player.x - player.speed)
                ctx.fillRect(
                    player.x = (player.x - player.speed),
                    player.y,
                    player.w,
                    player.h
                );

                //10. Change the player direction when the player touches the edge 
                //of the canvas.
                if (player.x <= 0) {
                    player.dir = 'right';
                }
            }
        },

        //11. Create a setter for changing the current direction of the user.
        changeDirection: function () {
            if (player.dir === 'left') {
                player.dir = 'right';
            } else if (player.dir === 'right') {
                player.dir = 'left';
            }
        },

        //4. Create an animation frame
        //5. Redraw the player every time a frame is executed
        animate: function () {
            this.player();
            //17. Animate the spawns
            this.moveSpawns();

            //window.requestAnimationFrame(this.animate.bind(this));
            //35. Only animate if the game is not over.
            if (gameOver === false) {
                animation = window.requestAnimationFrame(this.animate.bind(this));
            }
        },

        init: function () {
            canvas.height = 600;
            canvas.width = 800;

            // 28. launch te spawns
            launchSpawns();
            this.animate();
        }
    }
})();

game.init();

//12. Add a listener to allow the  user to change the direction
//of the player sprite
window.addEventListener('keyup', function () {
    game.changeDirection();
});