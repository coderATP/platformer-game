const margin = 30;
export function drawCharacterStatus(ctx, character){
    ctx.font = "30px myOtherFont";
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.fillText(character.currentState, ctx.canvas.width-margin, 90);
}
export function drawHeroStatus(ctx, hero){
    ctx.font = "30px myOtherFont";
    ctx.textAlign = "left";
    ctx.fillStyle = "black";
    ctx.fillText(hero.state, margin, 90);
}

export function drawPlayerScore(ctx, player){
    ctx.font = "30px Helvetica";
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.fillText("Score:  " +player.score, ctx.canvas.width-margin, 60);
    ctx.fillStyle = "gold";
    ctx.fillText("Score:  " +player.score, ctx.canvas.width-margin, 62);
}
export function drawPlayerhealthbar(ctx, player){
    ctx.font = "30px Impact";
    ctx.textAlign = "left";
    ctx.strokeStyle = "gold";
    ctx.lineWidth = 3;
    ctx.fillStyle = "white";

    const y = 5;
    const width = 25;
    const padding = player.healthbarPadding;
    const height = 20;

    for(let i = 0; i < player.lives; ++i){
        ctx.fillRect(margin+i * width, y, width-padding, height);
    }
    for(let i = 0; i < player.maxLives; ++i){
        ctx.strokeRect(margin+i * width, y, width-padding, height);
    }
}
export function drawPlayerenergybar(ctx, player){
    ctx.font = "30px Impact";
    ctx.textAlign = "left";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.fillStyle = "cyan";

    const y = 45;

    const width = 25;
    const padding = player.healthbarPadding;
    const height = 20;
    ctx.fillRect(margin, y, player.energy - padding, height);
    ctx.strokeRect(margin, y, player.maxEnergy - padding, height);
}

export function drawEnemyhealthbar(game, ctx, enemy){
    ctx.font = "30px Impact";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.fillStyle = "cyan";

    const y = 45;
    const height = 5;
    if(enemy.lives <= 10) ctx.fillStyle = "red";
    else if(enemy.lives <= 30) ctx.fillStyle = "yellow";
    else ctx.fillStyle = "green";

    ctx.fillRect(-game.camera.viewportX + (enemy.collisionbox.x + enemy.collisionbox.width/2) - enemy.lives/2, -game.camera.viewportY + enemy.collisionbox.y-height, enemy.lives, height);
    //ctx.strokeRect(-game.camera.viewportX +  (enemy.collisionbox.x + enemy.collisionbox.width/2) - enemy.lives/2, -game.camera.viewportY + enemy.collisionbox.y-height, enemy.lives, height);
}

export function drawGrid(game, ctx){
    game.rows = Math.floor(game.height/game.tileSize);
    game.columns = Math.floor(game.width/game.tileSize);
    for(let row = 0; row < game.rows; ++row){
        for(let col = 0; col < game.columns; ++col){
            ctx.strokeStyle = "black";
            ctx.strokeRect(
                col*game.tileSize,
                row*game.tileSize,
                game.tileSize,
                game.tileSize);
        }
    }
}