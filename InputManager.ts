import { Message } from "./MessageFrame/Message";
import ManagerBase from "./MessageFrame/ManagerBase";
import { MessageType } from "./MessageFrame/Message";
import MessageCenter from "./MessageFrame/MessageCenter";

const {ccclass, property} = cc._decorator;

/**
 * 输入管理器
 */
@ccclass
export default class InputManager extends ManagerBase {
    /**
     * 当前方向
     */
    public direction: cc.Vec2 = cc.Vec2.ZERO;

    private static _instance: InputManager = null;
    public static get Instance(): InputManager {
        if (this._instance == null) {
            this._instance = new InputManager();
        }
        return this._instance;
    }

    /**
     * 方向变更事件
     */
    public onDirectionChange: (direction: cc.Vec2) => void = null;

    /**
     * 构造函数
     */
    constructor() {
        super();
    }

    /**
     * 设置监听方向事件
     */
    public SetDirectionChangeListener() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    /**
     * 取消监听方向事件
     */
    public RemoveDirectionChangeListener() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    private _keyDownMap: { [key: string]: boolean } = {};
    /**
     * 按键按下回调
     * @param event 按键事件
     */
    private onKeyDown(event: cc.Event.EventKeyboard) {
        if (this.onDirectionChange != null) {
            let keyCode = event.keyCode;
            switch (keyCode) {
                case cc.macro.KEY.left:
                    this._keyDownMap['left'] = true;
                    break;
                case cc.macro.KEY.right:
                    this._keyDownMap['right'] = true;
                    break;
                case cc.macro.KEY.up:
                    this._keyDownMap['up'] = true;
                    break;
                case cc.macro.KEY.down:
                    this._keyDownMap['down'] = true;
                    break;
                default:
                    break;
            }
            let x = 0, y = 0;
            if (this._keyDownMap['left']) {
                x = -1;
            } else if (this._keyDownMap['right']) {
                x = 1;
            }
            if (this._keyDownMap['up']) {
                y = 1;
            } else if (this._keyDownMap['down']) {
                y = -1;
            }
            this.direction = cc.v2(x, y);
            this.onDirectionChange(this.direction);
        }
    }
    
    private onKeyUp(event: cc.Event.EventKeyboard) {
        if (this.onDirectionChange != null) {
            let keyCode = event.keyCode;
            switch (keyCode) {
                case cc.macro.KEY.left:
                    delete this._keyDownMap['left'];
                    break;
                case cc.macro.KEY.right:
                    delete this._keyDownMap['right'];
                    break;
                case cc.macro.KEY.up:
                    delete this._keyDownMap['up'];
                    break;
                case cc.macro.KEY.down:
                    delete this._keyDownMap['down'];
                    break;
                default:
                    break;
            }
            let x = 0, y = 0;
            if (this._keyDownMap['left']) {
                x = -1;
            } else if (this._keyDownMap['right']) {
                x = 1;
            }
            if (this._keyDownMap['up']) {
                y = 1;
            } else if (this._keyDownMap['down']) {
                y = -1;
            }
            this.direction = cc.v2(x, y);
            this.onDirectionChange(this.direction);
        }
    }
}
