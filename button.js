
export class Button {

    constructor (x, y, width, height, source = "", text = "", fontColor = "black", color = "red", fill = true) {
        this.active = true;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.color = color;
        this.fontColor = fontColor;
        this.fill = fill;
        this.fontSize = height/1.5;
        this.source = source;

        if (this.source != "") {
            this.image = new Image();
            this.image.src = this.source;
        }
    }   

    draw(c, x = this.x, y = this.y) {
        if (!this.active) return;
        if (this.source != ""){

            c.drawImage(this.image, x, y, this.width, this.height);

            return;
        }

        c.beginPath();
        c.lineWidth = "1";
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        if (this.fill) c.fillRect(this.x, this.y, this.width, this.height)
        else c.rect(this.x, this.y, this.width, this.height);
        c.stroke();

        if (this.text != "") {
            
            c.beginPath();
            c.fillStyle = "yellow";
            c.font = this.fontSize+"px Arial";
            c.fillText(this.text, this.x, this.y + this.height/2 + this.fontSize/3);
            
        }
        
        c.closePath();
    }




    collision(x, y) {
        return (
            this.active &&
            x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height
        );
    }
}