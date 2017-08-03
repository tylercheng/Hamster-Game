(function () {

    var RollingBackground = function (manifest) {
        this.initialize(manifest);
    }

    var p = RollingBackground.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    RollingBackground.prototype.initialize = function (manifest) {

        var bgImg = new createjs.Bitmap(manifest);
        this.addChild(bgImg);
        this.Container_initialize();
        this.on('tick', this.pulse);
    }
    RollingBackground.prototype.pulse = function () {
        if(this.x > canvas.width - this.width) {
            this.x += 10;
        }
        else {
            this.x = 0;
        }
    }
    window.RollingBackground = RollingBackground;
}());