import Input from "./input";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {
    @property(cc.Integer)
    speed: number = 100;

    private _animComponent: cc.Animation;
    private _player: cc.Node;

    start() {

        // Load animations
        this.loadAnimations();

    }

    loadAnimations() {
        cc.loader.loadRes("Swordman", cc.Prefab, (err, prefab) => {
            if (err) {
                console.error(`Failed to load player prefab: ${err}`);
                return;
            }
            this._player = cc.instantiate(prefab);
            this.node.addChild(this._player);
    
            const animComponent = this._player.getComponent(cc.Animation);
    
            cc.loader.loadResDir("image/guijianshi", cc.SpriteFrame, (err, assets) => {
                if (err) {
                    console.error(`Failed to load animations: ${err}`);
                    return;
                }
    
                // Load Stay animation
                const stayFrames = assets.slice(90, 96);
                const stayClip = cc.AnimationClip.createWithSpriteFrames(stayFrames, 6);
                stayClip.name = "Stay";
                stayClip.wrapMode = cc.WrapMode.Loop;
                stayClip.speed = 0.12;
                animComponent.addClip(stayClip);
    
                // Load Run animation
                const runFrames = assets.slice(105, 113);
                const runClip = cc.AnimationClip.createWithSpriteFrames(runFrames, 8);
                runClip.name = "Run";
                runClip.wrapMode = cc.WrapMode.Loop;
                runClip.speed = 0.12;
                animComponent.addClip(runClip);
    
                // Load Attack1 animation
                const attack1Frames = assets.slice(0, 10);
                const attack1Clip = cc.AnimationClip.createWithSpriteFrames(attack1Frames, 10);
                attack1Clip.name = "Attack1";
                attack1Clip.wrapMode = cc.WrapMode.Normal;
                attack1Clip.speed = 0.12;
                animComponent.addClip(attack1Clip);
    
                // Play the Stay animation by default
                animComponent.play("Stay");
            });
        });
    }
    update (dt) {
        // 移动 dt 帧间隔
        this.node.x += this.speed * dt * Input.Instance.horizontal;
        this.node.y += this.speed * dt * Input.Instance.vertical;

        let anim = this.getComponent(cc.Animation);
        let currentClip = anim.currentClip;

        // 判断是否正在攻击
        if (Input.Instance.isAttacking) {
                // 如果当前没有播放或者正在播放的不是攻击动画
    if (!currentClip || currentClip.name !== 'Attack1') {
        // 播放攻击动画
        anim.play('Attack1');
    } else {
        // 获取动画状态
        let state = anim.getAnimationState('Attack1');
        // 获取动画播放的进度
        let progress = state.time / state.duration;
        // 获取动画的循环模式
        let wrapMode = state.wrapMode;
        // 如果动画已经播放完毕
        if (progress >= 1 && (wrapMode === cc.WrapMode.Normal || wrapMode === cc.WrapMode.Reverse)) {
            // 攻击动画已经播放完毕
            Input.Instance.isAttacking = false;
        }
    }
        }
        // 如果有移动
        else if (Input.Instance.horizontal !== 0 || Input.Instance.vertical !== 0) {
            // 如果当前没有播放或者正在播放的不是移动动画
            if (!currentClip || currentClip.name !== 'Run') {
                // 播放移动动画
                anim.play('Run');
            }
        } else {
            // 如果当前没有播放动画
            if (!currentClip || currentClip.name !== 'Stay') {
                // 播放默认动画
                console.log('Playing stay animation');
                anim.play('Stay');
            }
        }

        // 判断方向进行模型翻转
        if (Input.Instance.horizontal < 0) {
            this.node.scaleX = -1;
        } else if (Input.Instance.horizontal > 0) {
            this.node.scaleX = 1;
        }
    }
}