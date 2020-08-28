// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class nodes extends cc.Component {
    /* ***************组件*************** */
    @property({ displayName: "纹理", type: cc.SpriteFrame })
    texture_o: cc.SpriteFrame = null;
    /* -------------------------------delimiter------------------------------- */
    onLoad() {
        this.node.child("a1").label.string = "测试文本";
        this.node.child("a1").child("a11").label.string = "测试子文本";
        this.node.child("a2").sprite.spriteFrame = this.texture_o;
        
        // 开启自动更新子节点缓存
        // this.node.child_update_b = true;
        // this.node.removeAllChildren();
        // cc.log(this.node.child("a1"));//null

        // 不开启自动更新子节点缓存
        // this.node.removeAllChildren();
        // cc.log(this.node.child("a1"));//cc_Node {_name: 'a1', ...
    }
}