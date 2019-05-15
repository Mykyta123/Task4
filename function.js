
    const Ball = function(x, y, radius) {
        this.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        this.direction = Math.random() * Math.PI * 2;
        this.radius = radius;
        this.speed = 2;
        this.x = x;
        this.y = y;
      };
      Ball.prototype = {
        updatePosition:function(width, height) {
          this.x += Math.cos(this.direction) * this.speed;
          this.y += Math.sin(this.direction) * this.speed;
          if(this.x - this.radius < 0) {
            this.x = this.radius;
            this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
          } else if (this.x + this.radius > width) {
            this.x = width - this.radius;
            this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
          }
          if(this.y - this.radius < 0) {
            this.y = this.radius;
            this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
          } else if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
          }
        }
      };
      
      // инициализируем прямоугольник
      const Rect = function(x, y, width, height) {
        this.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        this.direction = Math.random() * Math.PI * 2;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 5;
      };
      Rect.prototype = {
        updatePosition:function(width, height) {
          this.x += Math.cos(this.direction) * this.speed;
          this.y += Math.sin(this.direction) * this.speed;
            if (this.x  < 0 || this.x > width) {
              this.x = 0;
              this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
            } else if(this.x + this.width > width){
               this.x = width - this.width;
               this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
            }
            if (this.y < 0 || this.y > height) {
              this.y = 0;
              this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
            } else if(this.y + this.height > height){
              this.y = height - this.height;
              this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
            }
          }
      };
      var context = document.querySelector("canvas").getContext("2d");
      var balls = new Array();
      var rectangles = new Array();
      let x = 0;
      let y = 0;
    
       
      function loop() {
        requestId = window.requestAnimationFrame(loop);
        let height = document.documentElement.clientHeight;
        let width  = document.documentElement.clientWidth;
        context.canvas.height = height;
        context.canvas.width = width;
      
      
        for(let index = 0; index < rectangles.length; index ++) {
          if(index==10) break;
          let rectangle = rectangles[index];
          context.fillStyle = rectangle.color;
          context.beginPath();
          context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
          context.fill();
          rectangle.updatePosition(width, height);
        }
        
        for(let index = 0; index < balls.length; index ++) {
          if(index==10) break;
          let ball = balls[index];
          context.fillStyle = ball.color;
          context.beginPath();
          context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
          context.fill();
          ball.updatePosition(width, height);
        }
      }
      
      
      loop();

    setInterval(() => {
      let rand = Math.floor(Math.random() * 2 + 1);
      if (rand == 1 && balls.length <= 10){
      let r = Math.floor(Math.random() * 20 + 20);
      let square = Math.PI * r * r;
      console.log("ball", "square:", square);
      balls.push(new Ball(x, y, r));
    }
      else if (rand == 2 && rectangles.length <= 10){
      let width = Math.floor(Math.random() * 20 + 20);
      let height =  Math.floor(Math.random() * 20 + 20);
      let square = width * height;
      console.log("rectangle", "square:", square);
      rectangles.push(new Rect(x, y, width, height));
    }
    }, 5000);