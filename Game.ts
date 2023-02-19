const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    player: cc.Node = null;

    start () {
        // 加载角色预设体
        cc.loader.loadRes("Swordman", cc.Prefab, (error, playerPre) => {
            if (error) {
                cc.error("Failed to load player prefab: ", error);
                return;
            }

            // 创建玩家
            this.player = cc.instantiate(playerPre);
            this.player.setParent(this.node.getChildByName("Start"));
            this.player.setPosition(cc.v2(0, 0));

            // 加载武器预制体
            cc.loader.loadRes("weapon", cc.Prefab, (error, weaponPre) => {
                if (error) {
                    cc.error("Failed to load weapon prefab: ", error);
                    return;
                }

                // 创建武器
                const weapon = cc.instantiate(weaponPre);
                weapon.setParent(this.player);
                weapon.setPosition(cc.v2(0, 0));

                // 打印信息
                console.log("Player and weapon created.");

                // 摄像头跟随玩家
                cc.Camera.main.node.position = this.player.position;
            });
        });
    }
}