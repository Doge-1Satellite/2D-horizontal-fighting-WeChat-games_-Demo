// Message.ts
// 消息对象的定义

const {ccclass, property} = cc._decorator;

export class Message {
    // 消息类型
    Type: number;
    // 消息命令
    Command:number;
    // 消息内容
    Content:any;

    // 构造函数
    constructor(type, command, content){
        this.Type = type;
        this.Command = command;
        this.Content = content;
    }
}

// MessageType是一个枚举类，定义了消息类型和命令的常量值
export class MessageType{
    // 消息类型常量
    static Type_UI = 1;
    static Type_NPC = 2;
    static Type_Enemy = 3;

    // UI消息命令常量
    static UI_RefreshHP = 101;
    static UI_RefreshScore = 102;
    static UI_RefreshInventory = 103;

    // NPC消息命令常量
    static NPC_npc1 = 201;
    static NPC_npc2 = 202;

    // 敌人消息命令常量
    static Enemy_enemy1 = 301;
    static Enemy_enemy2 = 302;
}