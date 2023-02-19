import Input from "./input";
const {ccclass, property} = cc._decorator;

@ccclass
export default class WeaponControl extends cc.Component {
    start () {
    }

    update (dt) {
        // 获取玩家控制器
        let playerControl = this.node.parent.getComponent('PlayerControl');
        if (!playerControl) {
            return;
        }

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
        // 如果玩家控制器正在移动
        else if (playerControl.isMoving()) {
            // 如果当前没有播放或者正在播放的不是移动动画
            if (!currentClip || currentClip.name !== 'Run') {
                // 播放移动动画
                anim.play('Run');
            }
        } else {
            // 如果当前没有播放动画
            if (!currentClip || currentClip.name !== 'Stay') {
                // 播放默认动画
                anim.play('Stay');
            }
        }
    }
}