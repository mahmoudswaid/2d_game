Game.Level1 = function (game){};

var player;
var coin000, coin001, coin002, coin003, coin004, 
    coin005, coin006, coin007, coin008, coin009, 
    coin010;
var bombs;
var platforms;
var cursors;
var score_bg;
var score = 0;
var gameOver = false;
var dead_audio = false;
var scoreText;
var level = 110;
var level_counter = 1;
var bg_music;
var coin_collection;
var death;
var enemy001;

Game.Level1.prototype = {
  create: function () {
    // audio
    bg_music = this.sound.add('sm');
    coin_collection = this.sound.add('coin_col');
    death = this.sound.add('death');

    bg_music.play();
    console.log("####### Music is played #########")

    //  A simple background for our game
    this.add.image(400, 300, 'sky');
    this.add.image(100, 30, 'score_bar');
    this.add.image(700, 30, 'level_bar');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 565, 'ground').refreshBody();

    //  Now let's create some ledges
    platforms.create(250, 200, 'Pad_1');
    platforms.create(60, 280, 'Pad_2');
    platforms.create(320, 350, 'Pad_3');
    platforms.create(450, 250, 'Pad_4');
    platforms.create(600, 375, 'Pad_5');
    platforms.create(745, 220, 'Pad_6');
    platforms.create(160, 420, 'Pad_7');

    

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });


    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  They are evenly spaced out on the X coordinate, with a random Y coordinate
    coin000 = this.physics.add.sprite(10, 0, 'coin');
    coin001 = this.physics.add.sprite(90, 0, 'coin');
    coin002 = this.physics.add.sprite(160, 0, 'coin');
    coin003 = this.physics.add.sprite(240, 0, 'coin');
    coin004 = this.physics.add.sprite(320, 0, 'coin');
    coin005 = this.physics.add.sprite(400, 0, 'coin');
    coin006 = this.physics.add.sprite(480, 0, 'coin');
    coin007 = this.physics.add.sprite(560, 0, 'coin');
    coin008 = this.physics.add.sprite(640, 0, 'coin');
    coin009 = this.physics.add.sprite(700, 0, 'coin');
    coin010 = this.physics.add.sprite(780, 0, 'coin');

    //  coin physics properties. Give the little guy a slight bounce.
    coin000.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin001.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin002.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin003.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin004.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin005.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin006.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin007.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin008.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin009.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin010.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    coin000.setCollideWorldBounds(true);
    coin001.setCollideWorldBounds(true);
    coin002.setCollideWorldBounds(true);
    coin003.setCollideWorldBounds(true);
    coin004.setCollideWorldBounds(true);
    coin005.setCollideWorldBounds(true);
    coin006.setCollideWorldBounds(true);
    coin007.setCollideWorldBounds(true);
    coin008.setCollideWorldBounds(true);
    coin009.setCollideWorldBounds(true);
    coin010.setCollideWorldBounds(true);

    this.anims.create({
        key: 'coin',
        frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(67, 16, 'Score: 0', { font: 'bold 18px cursive', fill: '#180c1c'});

    //  The level
    levelText = this.add.text(670, 16, 'Level: 0', { font: 'bold 18px cursive', fill: '#180c1c'});

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(coin000, platforms);
    this.physics.add.collider(coin001, platforms);
    this.physics.add.collider(coin002, platforms);
    this.physics.add.collider(coin003, platforms);
    this.physics.add.collider(coin004, platforms);
    this.physics.add.collider(coin005, platforms);
    this.physics.add.collider(coin006, platforms);
    this.physics.add.collider(coin007, platforms);
    this.physics.add.collider(coin008, platforms);
    this.physics.add.collider(coin009, platforms);
    this.physics.add.collider(coin010, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, coin000, collectStar, null, this);
    this.physics.add.overlap(player, coin001, collectStar, null, this);
    this.physics.add.overlap(player, coin002, collectStar, null, this);
    this.physics.add.overlap(player, coin003, collectStar, null, this);
    this.physics.add.overlap(player, coin004, collectStar, null, this);
    this.physics.add.overlap(player, coin005, collectStar, null, this);
    this.physics.add.overlap(player, coin006, collectStar, null, this);
    this.physics.add.overlap(player, coin007, collectStar, null, this);
    this.physics.add.overlap(player, coin008, collectStar, null, this);
    this.physics.add.overlap(player, coin009, collectStar, null, this);
    this.physics.add.overlap(player, coin010, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
  },
  update: function (){
    if (gameOver)
    {
        if(dead_audio == false){
            console.log("####### You are dead #######");
            bg_music.pause()
            death.play();
            dead_audio = true;
            return;
        }
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);

    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        coin000.anims.play('coin', true);
        coin001.anims.play('coin', true);
        coin002.anims.play('coin', true);
        coin003.anims.play('coin', true);
        coin004.anims.play('coin', true);
        coin005.anims.play('coin', true);
        coin006.anims.play('coin', true);
        coin007.anims.play('coin', true);
        coin008.anims.play('coin', true);
        coin009.anims.play('coin', true);
        coin010.anims.play('coin', true);

        player.setVelocityX(0);

        player.anims.play('turn');
        //enemy001.anims.play('enemy', true);
        //weapon.fire();
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
  }
  
  collectStar: function (player, coin){
    coin.disableBody(true, true);
    level -=10; 
    //  Add and update the score
    coin_collection.play();
    score += 10;
    scoreText.setText('Score: ' + score);

    if (level === 0)
    {
        level_counter += 1;
        levelText.setText('Level: ' + level_counter);
        console.log("##### Level "+level_counter+ " #####")

        //  A new batch of stars to collect
        coin000 = this.physics.add.sprite(10, 0, 'coin');
        coin001 = this.physics.add.sprite(90, 0, 'coin');
        coin002 = this.physics.add.sprite(160, 0, 'coin');
        coin003 = this.physics.add.sprite(240, 0, 'coin');
        coin004 = this.physics.add.sprite(320, 0, 'coin');
        coin005 = this.physics.add.sprite(400, 0, 'coin');
        coin006 = this.physics.add.sprite(480, 0, 'coin');
        coin007 = this.physics.add.sprite(560, 0, 'coin');
        coin008 = this.physics.add.sprite(640, 0, 'coin');
        coin009 = this.physics.add.sprite(700, 0, 'coin');
        coin010 = this.physics.add.sprite(780, 0, 'coin');


        this.physics.add.collider(player, platforms);
        this.physics.add.collider(coin000, platforms);
        this.physics.add.collider(coin001, platforms);
        this.physics.add.collider(coin002, platforms);
        this.physics.add.collider(coin003, platforms);
        this.physics.add.collider(coin004, platforms);
        this.physics.add.collider(coin005, platforms);
        this.physics.add.collider(coin006, platforms);
        this.physics.add.collider(coin007, platforms);
        this.physics.add.collider(coin008, platforms);
        this.physics.add.collider(coin009, platforms);
        this.physics.add.collider(coin010, platforms);

        coin000.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin001.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin002.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin003.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin004.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin005.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin006.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin007.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin008.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin009.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin010.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        coin000.setCollideWorldBounds(true);
        coin001.setCollideWorldBounds(true);
        coin002.setCollideWorldBounds(true);
        coin003.setCollideWorldBounds(true);
        coin004.setCollideWorldBounds(true);
        coin005.setCollideWorldBounds(true);
        coin006.setCollideWorldBounds(true);
        coin007.setCollideWorldBounds(true);
        coin008.setCollideWorldBounds(true);
        coin009.setCollideWorldBounds(true);
        coin010.setCollideWorldBounds(true);

        this.physics.add.overlap(player, coin000, collectStar, null, this);
        this.physics.add.overlap(player, coin001, collectStar, null, this);
        this.physics.add.overlap(player, coin002, collectStar, null, this);
        this.physics.add.overlap(player, coin003, collectStar, null, this);
        this.physics.add.overlap(player, coin004, collectStar, null, this);
        this.physics.add.overlap(player, coin005, collectStar, null, this);
        this.physics.add.overlap(player, coin006, collectStar, null, this);
        this.physics.add.overlap(player, coin007, collectStar, null, this);
        this.physics.add.overlap(player, coin008, collectStar, null, this);
        this.physics.add.overlap(player, coin009, collectStar, null, this);
        this.physics.add.overlap(player, coin010, collectStar, null, this);

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
        level = 110;
    }
    console.log("Level score = "+ level);
  }

  hitBomb: function (player, bomb)
  {
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      gameOver = true;
  }
}
