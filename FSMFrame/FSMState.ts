import FSMManager from "./FSMManager";

const { ccclass, property } = cc._decorator;

/**
 * 表示状态的基类
 */
export default class FSMState {
    /**
     * 当前状态的ID
     */
    stateID: number;
    /**
     * 当前状态所属的组件
     */
    component: cc.Component;
    /**
     * 当前状态所属的状态机
     */
    fsmManager: FSMManager;

    /**
     * 构造函数
     * @param stateID 当前状态的ID
     * @param component 当前状态所属的组件
     * @param fsmManager 当前状态所属的状态机
     */
    constructor(stateID: number, component: cc.Component, fsmManager: FSMManager) {
        this.stateID = stateID;
        this.component = component;
        this.fsmManager = fsmManager;
    }

    /**
     * 进入当前状态
     */
    OnEnter() {}

    /**
     * 更新当前状态
     */
    OnUpdate() {}
}

