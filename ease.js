let counter = 0;
function smoothstep(n){
    return n*n*n;
}

export function ease(deltaTime, interval){
    if(counter < ms){
        let normalisedTime = counter/interval;
        let curvedTime = smoothstep(normalisedTime);
        //camera pos = lerp(vx1, vx2, time)
        counter+= deltaTime;
    }
}

export function lerp(startVal, endVal, time){
    return endVal*time + startVal*(1-time)
}