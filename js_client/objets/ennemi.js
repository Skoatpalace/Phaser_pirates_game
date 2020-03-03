var ennemiTemplate = {
    createEnnemi : function(posX,posY){
        var ennemi = {
            aEnnemi : null,
        
            initEnnemi : function (){
                this.aEnnemi = jeu.scene.physics.add.sprite(posX,posY,"ennemi1a");
                this.aEnnemi.pv = 100;
                this.aEnnemi.barreRouge = jeu.scene.physics.add.sprite(posX,posY,"lifeRED").setOrigin(0,0);
                this.aEnnemi.barreRouge.setPosition(this.aEnnemi.barreRouge.x - this.aEnnemi.barreRouge.width/2,this.aEnnemi.barreRouge.y);
                this.aEnnemi.barreVerte = jeu.scene.physics.add.sprite(posX,posY,"life").setOrigin(0,0);
                this.aEnnemi.barreVerte.setPosition(this.aEnnemi.barreVerte.x - this.aEnnemi.barreVerte.width/2,this.aEnnemi.barreVerte.y);
                this.gererCollide();
            },
            gererCollide : function(){
                jeu.scene.physics.add.collider(this.aEnnemi, jeu.world.layerLand);
                this.aEnnemi.collisionBullet = jeu.scene.physics.add.overlap(this.aEnnemi, jeu.player.bullets, this.takeDamage);
            },
            takeDamage : function(ennemi,bullets){
                bullets.destroy();
                ennemi.pv -= jeu.player.attaque;
                if(ennemi.pv < 0)  ennemi.pv = 0;
                if(ennemi.pv >= 100){
                    ennemi.setTexture("ennemi1a");
                } else if(ennemi.pv >= 50){
                    ennemi.setTexture("ennemi1b");
                }else if(ennemi.pv >= 1){
                    ennemi.setTexture("ennemi1c");
                } else {
                    jeu.ennemiTemplate.detruireBateau(ennemi);
                }
                ennemi.barreVerte.setScale(ennemi.pv / 100,1);
            }
        }
        return ennemi;
    },
    detruireBateau : function(ennemi){
        ennemi.setTexture("ennemi1d");
        jeu.scene.physics.world.removeCollider(ennemi.collisionBullet);
        jeu.scene.time.delayedCall(1000,function(){
            ennemi.barreRouge.destroy();
            ennemi.barreVerte.destroy();
            ennemi.destroy();
        },this);
    }
}
