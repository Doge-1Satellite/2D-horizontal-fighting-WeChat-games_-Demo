// ComponentBase.ts
// 消息接收者和管理者的基类

import {Message} from "./Message"; // 导入消息对象的定义

const {ccclass, property} = cc._decorator;

@ccclass
export default class ComponentBase extends cc.Component {
    /**
     * ReceiveMessage()是一个抽象方法，需要在每个具体的消息接收者和管理者中实现
     * 该方法用于接收消息并进行相应的处理
     * @param message 消息对象
     */
    ReceiveMessage(message: Message){
        // 需要在具体的消息接收者和管理者中实现该方法
    }
}