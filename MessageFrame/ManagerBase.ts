// ManagerBase.ts
/**
 * 消息管理者的基类
 */
import ComponentBase from "./ComponentBase"; // 导入消息接收者和管理者的基类
import {Message, MessageType } from "./Message"; // 导入消息对象和消息类型的定义
import MessageCenter from "./MessageCenter"; // 导入消息中心的实现

const {ccclass, property} = cc._decorator;

@ccclass
export default class ManagerBase extends ComponentBase {
    /**
     * 管理的消息接收者数组，存储所有注册到该管理类的消息接收者
     */
    ReceiveList : ComponentBase[] = [];

    /**
     * 当前管理类接收的具体消息类型
     */
    messageType : number;

    /**
     * onLoad()是Cocos Creator提供的生命周期函数，会在节点被加载时自动调用
     * 在该函数中，管理类会设置消息类型并把自己添加到消息中心列表中
     */
    onLoad(){
        this.messageType = this.SetMessageType(); // 设置当前管理类接收的消息类型
        MessageCenter.Managers.push(this); // 把管理类添加到消息中心列表中
    }

    /**
     * SetMessageType()是一个抽象方法，需要在每个具体的管理类中实现
     * 该方法用于设置管理类接收的具体消息类型
     */
    SetMessageType(){
        return MessageType.Type_UI;
    }

    /**
     * RegisterReceiver()是一个方法，用于把消息接收者添加到消息接收者数组中
     * 当有消息需要向下层分发时，该数组中的接收者都会收到消息
     * @param cb 消息接收者
     */
    RegisterReceiver(cb: ComponentBase){
        this.ReceiveList.push(cb);
    }

    /**
     * ReceiveMessage()是一个方法，用于接收消息并向下层分发消息
     * 在该方法中，管理类会根据消息类型判断消息是否需要向下层分发
     * 当有消息需要向下层分发时，该管理类会把消息发送给所有注册到该管理类的消息接收者
     * @param message 消息对象
     */
    ReceiveMessage(message: Message){
        super.ReceiveMessage(message); // 调用基类的接收消息方法
        // 判断消息类型是否是该管理类接收的类型，如果不是，则不做任何处理；如果是，则向下层分发消息
        if(message.Type != this.messageType){
            return;
        }
        // 向下层分发消息，把消息发送给所有注册到该管理类的消息接收者
        for(let cb of this.ReceiveList){
            cb.ReceiveMessage(message);
        }
    }
}