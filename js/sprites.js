/**
 * 精灵对象
 * 
 * 精灵对象有两个方法：paint()与update()。update()方法用于执行每个精灵的行为，执行的顺
 * 序就是这些行为被加入精灵之中的顺序。paint()方法则将精灵的绘制代理给绘制器来做，不过仅
 * 仅在精灵确实有绘制器并且可见时，此方法才会生效。
 */

const Sprite = function(name, painter, behaviors) {
    this.name = name;
    this.painter = painter;
    this.behaviors = behaviors || [];

    this.top = 0;
    this.left = 0;
    this.width = 10;
    this.height = 10;
    this.velocityX = 0;
    this.velocityY = 0;
    this.visible = true;
    this.animating = false; // 此精灵是否正在执行动画

    return this;
}

Sprite.prototype = {
    paint: function(context) {
        if (this.painter != undefined && this.visible) {
            this.painter.paint(this, context);
        }
    },
    update: function(context, time) {
        for (let i = 0; i < this.behaviors.length; i++) {
            this.behaviors[i].execute(this, context, time);
        }
    }
}