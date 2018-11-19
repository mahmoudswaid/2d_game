Game.Preloader = function (game){
   this.preloadBar = null;
};

Game.Preloader.prototype = {
   preload:function(){
      this.load.image('sky', 'assets/background_1.png');
      this.load.image('ground', 'assets/platform_1.png');
      this.load.image('Pad_1', 'assets/Pad_1_3.png');
      this.load.image('Pad_2', 'assets/Pad_8_3.png');
      this.load.image('Pad_3', 'assets/Pad_3_3.png');
      this.load.image('Pad_4', 'assets/Pad_4_3.png');
      this.load.image('Pad_5', 'assets/Pad_5_3.png');
      this.load.image('Pad_6', 'assets/Pad_6_3.png');
      this.load.image('Pad_7', 'assets/Pad_7_3.png');
      this.load.image('score_bar', 'assets/b_2.png');
      this.load.image('level_bar', 'assets/b_1.png');
      this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 24, frameHeight: 24 });
      this.load.image('bomb', 'assets/bomb_1.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.image('enemy', 'assets/enemy_2.png', { frameWidth: 40, frameHeight: 40 });
   },
   create:function(){
      this.state.start('level1');
   }
}
