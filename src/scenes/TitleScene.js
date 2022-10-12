// with this title screen i want to load a menu so the user can click and adjust setting  and game saves etc
import Screen from '../index'
class TitleScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TitleScene'
        });
        var modsEnabled = false;
    }

    preload() {
        //this.load.spritesheet('player-sprites', '../assets/characterSheet.png');
        this.scene.stop('BootScene');
        //this.scene.add('Game');
    }
    create() {
        var background = this.add.image(1450/2, 775/2, 'splashlogo');
		background.setScale(Math.max(1450 / background.width, 775 / background.height))
        .setScrollFactor(1, 0);
        var rect = this.add.rectangle(650, 380, 350, 550, 0x999999);
        rect.setStrokeStyle(4, 0xc6e2ff);

        var rectTabPlay = this.add.rectangle(645, 190, 150, 50, 0x6666ff);
        var rectTabMods = this.add.rectangle(645, 290, 150, 50, 0x6666ff);
        //var rectTabPlay = this.add.rectangle(600, 550, 200, 50, 0x6666ff);
        let clickCount = 0;
        let clickCountMods = 0;
        this.clickCountText = this.add.text(100, 190, '');
        this.clickCountTextMods = this.add.text(100, 290, '');
        

        this.rectTabPlay = this.add.rectangle(645, 190, 150, 50, 0xfcc674)
        .setInteractive()
        .on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() )
        .on('pointerdown', () => this.enterButtonActiveState() )
        .on('pointerup', () => {
            //this.scene.start('TitleScene');
            this.scene.start('GameScene');
            this.updateClickCountText(++clickCount);
            this.enterButtonHoverState();
        });
        this.updateClickCountText(clickCount);

        this.clickButton = this.add.text(600, 180, 'Play', { fill: '#0f0' })
        .setInteractive()
        .on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() )
        .on('pointerdown', () => this.enterButtonActiveState() )
        .on('pointerup', () => {
            //this.scene.start('TitleScene');
            this.scene.start('GameScene');
            this.updateClickCountText(++clickCount);
            this.enterButtonHoverState();
        });
        this.updateClickCountText(clickCount);

        
        this.rectTabMods = this.add.rectangle(645, 290, 150, 50, 0xfcc674)
        .setInteractive()
        .on('pointerover', () => this.enterButtonHoverStateMods() )
        .on('pointerout', () => this.enterButtonRestStateMods() )
        .on('pointerdown', () => this.enterButtonActiveStateMods() )
        .on('pointerup', () => {
            this.modsEnabled = !this.modsEnabled;
            if (this.modsEnabled){
                this.modsCheckText = this.add.text(600, 680, 'Mods enabled', { fill: '#0f0' })
                console.log(this.modsEnabled)
                this.toggleTimer = this.time.addEvent({
                    delay: 500,
                    repeat: 0,
                    callback: function () {
                        this.modsEnabled = true;
                        this.modsCheckText.setText('');
                        background.setTexture('forest-background')
                    },
                    callbackScope: this,
                  });
                
            }
            else {
                this.modsCheckText = this.add.text(600, 680, 'Mods disabled', { fill: '#0f0' })
                console.log(this.modsEnabled)
                this.toggleTimer = this.time.addEvent({
                    delay: 500,
                    repeat: 0,
                    callback: function () {
                        this.modsEnabled = false;
                        this.modsCheckText.setText('');
                        background.setTexture('background')
                    },
                    callbackScope: this,
                  });
            }
            this.updateClickCountTextMods(++clickCountMods);
            this.enterButtonHoverStateMods();
        });
        this.updateClickCountTextMods(clickCountMods);
        this.clickButtonMods = this.add.text(600, 280, 'Mods', { fill: '#0f0' })
        .setInteractive()
        .on('pointerover', () => this.enterButtonHoverStateMods() )
        .on('pointerout', () => this.enterButtonRestStateMods() )
        .on('pointerdown', () => this.enterButtonActiveStateMods() )
        .on('pointerup', () => {
           
            this.modsEnabled = !this.modsEnabled;
            if (this.modsEnabled){
                this.modsCheckText = this.add.text(600, 680, 'Mods enabled', { fill: '#0f0' })
                console.log(this.modsEnabled)
                this.toggleTimer = this.time.addEvent({
                    delay: 500,
                    repeat: 0,
                    callback: function () {
                        this.modsEnabled = true;
                        this.modsCheckText.setText('');
                        background.setTexture('forest-background')
                    },
                    callbackScope: this,
                  });
                
            }
            else {
                this.modsCheckText = this.add.text(600, 680, 'Mods disabled', { fill: '#0f0' })
                console.log(this.modsEnabled)
                this.toggleTimer = this.time.addEvent({
                    delay: 500,
                    repeat: 0,
                    callback: function () {
                        this.modsEnabled = false;
                        this.modsCheckText.setText('');
                        background.setTexture('background')
                    },
                    callbackScope: this,
                  });
            }
            this.updateClickCountTextMods(++clickCountMods);
            this.enterButtonHoverStateMods();
        });
        this.updateClickCountTextMods(clickCountMods);
        
    }
    update(time, delta) {
       
    }

    updateClickCountText(clickCount) {
        //this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
    }
    updateClickCountTextMods(clickCount) {
        //this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
    }
    enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0'});
        this.rectTabPlay.setFillStyle(0xfcc674,55);
    }

    enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
        this.rectTabPlay.setFillStyle(0xa87932,55);
    }

    enterButtonActiveState() {
        this.clickButton.setStyle({ fill: '#0ff' });
        this.rectTabPlay.setFillStyle(0x8c7e69,55);
    }

    //------------------------------------------------
    enterButtonHoverStateMods() {
        this.clickButtonMods.setStyle({ fill: '#ff0'});
        this.rectTabMods.setFillStyle(0xfcc674,55);
    }

    enterButtonRestStateMods() {
        this.clickButtonMods.setStyle({ fill: '#0f0' });
        this.rectTabMods.setFillStyle(0xa87932,55);
    }

    enterButtonActiveStateMods() {
        this.clickButtonMods.setStyle({ fill: '#0ff' });
        this.rectTabMods.setFillStyle(0x8c7e69,55);
    }
}

export default TitleScene;

