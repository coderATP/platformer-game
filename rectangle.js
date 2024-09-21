export class Rectangle{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
        this.color = color || "rgba(0,0,255,0.7)";
        this.id = undefined;
    }
    
    set(x, y){
        this.x = x;
        this.y = y;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
    }
    
    render(ctx){
        ctx.save()
        ctx.fillStyle = this.color || 'rgba(255, 255, 255, 1)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}