// MessageCenter.ts
// 消息中心的实现

import ComponentBase from "./ComponentBase"; // 导入消息接收者和管理者的基类
import {Message} from "./Message"; // 导入消息对象的定义

const {ccclass, property} = cc._decorator;

export default class MessageCenter{
    // 管理类列表，存储所有注册到消息中心的管理类
    static Managers: ComponentBase[] = [];

    /**
     * SendMessage()是一个静态方法，用于向所有管理类发送消息
     * 在该方法中，消息中心会遍历所有管理类，把消息发送给所有注册到该管理类的消息接收者
     * @param msg 消息对象
     */
    static SendMessage(msg: Message){
        for (let manager of this.Managers){
            manager.ReceiveMessage(msg);
        }
    }

    /**
     * SendCustomMessage()是一个静态方法，用于发送自定义的消息
     * 该方法会根据传入的参数创建新的消息对象，然后调用SendMessage()方法发送消息
     * @param type 消息类型
     * @param command 消息命令
     * @param content 消息内容
     */
    static SendCustomMessage(type: number, command: number, content: any){
        let msg = new Message(type, command, content); // 创建新的消息对象
        this.SendMessage(msg); // 发送消息
    }
}
