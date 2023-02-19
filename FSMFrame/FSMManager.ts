import FSMState from "./FSMState";

const { ccclass, property } = cc._decorator;

/**
 * 状态机管理器
 */
export default class FSMManager {
    /**
     * 状态列表
     */
    stateList: FSMState[] = [];
    /**
     * 当前状态的ID
     */
    CurrentIndex: number = -1;

    /**
     * 改变状态
     * @param stateID 新的状态ID
     */
    Changestate(stateID: number) {
        // 改变状态ID
        this.CurrentIndex = stateID;
        // 调用新状态的进入方法
        this.stateList[this.CurrentIndex].OnEnter();
    }

    /**
     * 状态机的更新方法
     */
    OnUpdate() {
        if (this.CurrentIndex !== -1) {
            // 调用当前状态的更新方法
            this.stateList[this.CurrentIndex].OnUpdate();
        }
    }
}