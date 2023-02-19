import FSMManager from "./FSMFrame/FSMManager";
import FSMState from "./FSMFrame/FSMState";
import InputManager from "./InputManager";
import { Message, MessageType } from "./MessageFrame/Message";
import MessageCenter from "./MessageFrame/MessageCenter";
import ComponentBase from "./MessageFrame/ComponentBase";

const {ccclass, property} = cc._decorator;

/**
 * 玩家控制器
 */
@ccclass
export default class PlayerController extends ComponentBase {
    @property(cc.Float)
    speed: number = 300;

    /**
     * 当前速度
     */
    private _currentSpeed: cc.Vec3 = cc.v3(0, 0, 0);

    /**
     * 状态机管理器
     */
    private _fsmManager: FSMManager = null;

    /**
     * 角色的当前状态
     */
    private _currentState: FSMState = null;
    
        /**
     * 消息类型
     */
    private _messageType: MessageType = MessageType.Type_UI;

    /**
     * onLoad() 是 Cocos Creator 提供的生命周期函数，在节点加载时自动调用
     */
    onLoad() {
        // 创建状态机管理器
        this._fsmManager = new FSMManager();
    
        // 初始化状态列表
        let idleState = new FSMState(0, this, this._fsmManager);
        let moveState = new FSMState(1, this, this._fsmManager);
    
        // 为状态添加方法
        idleState.OnEnter = () => {
            cc.log("进入 idle 状态");
        }
        idleState.OnUpdate = () => {
            cc.log("idle 状态更新");
            // 当前状态是 idle 时，不执行移动逻辑
            this._currentSpeed = cc.Vec3.ZERO;
        }
    
        moveState.OnEnter = () => {
            cc.log("进入 move 状态");
        }
        moveState.OnUpdate = () => {
            cc.log("move 状态更新");
            // 当前状态是 move 时，执行移动逻辑
            this._currentSpeed = cc.v3(InputManager.Instance.direction.x * this.speed, InputManager.Instance.direction.y * this.speed, 0);
            this.node.setPosition(this.node.position.add(this._currentSpeed.mul(cc.director.getDeltaTime())));
        }
    
        // 添加状态到状态列表
        this._fsmManager.stateList.push(idleState);
        this._fsmManager.stateList.push(moveState);
    
        // 初始状态为 idle 状态
        this._fsmManager.Changestate(0);
    
        // 注册输入管理器的方向变更事件，实现角色移动
        InputManager.Instance.onDirectionChange = (direction: cc.Vec2) => {
            if (direction.equals(cc.Vec2.ZERO)) {
                this._fsmManager.Changestate(0); // 如果方向为 0，则进入 idle 状态
            } else {
                this._fsmManager.Changestate(1); // 如果方向不为 0，则进入 move 状态
            }
        };
        InputManager.Instance.SetDirectionChangeListener();
    }

    /**
     * update() 是 Cocos Creator 提供的生命周期函数，在每一帧渲染前自动调用
     */
    update(dt: number) {

        // 获取相机节点
        const camera = cc.Camera.findCamera(this.node);
        if (camera) {
            // 设置相机的位置为玩家的位置
            camera.node.position = this.node.position;
        }

        // 更新状态机
        this._fsmManager.OnUpdate();

        // 计算当前速度
        this.node.setPosition(this.node.position.add(cc.v3(this._currentSpeed.x, this._currentSpeed.y, 0).mul(cc.director.getDeltaTime())));
    }

    /**
     * onDisable() 是 Cocos Creator 提供的生命周期函数，在节点禁用时自动调用
     */
    onDisable() {
        // 注销输入管理器的方向变更事件
        InputManager.Instance.onDirectionChange = (direction: cc.Vec2) => {};
    }
        /**
         * 接收消息并进行相应的处理
         * @param message 消息对象
         */
        ReceiveMessage(message: Message) {
            if (message.Type === MessageType.Type_UI && message.Command === MessageType.UI_RefreshHP) {
                // TODO: 更新血条
            }
        }

                /**
     * 设置当前对象为 UI 类型的消息接收者
     */
        SetMessageType() {
            this._messageType = MessageType.Type_UI;
            MessageCenter.Managers.push(this);
        }
    }
    