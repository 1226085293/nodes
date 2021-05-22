"use strict";

/**nodes扩展组件（插件脚本）
 * - 读/写所有组件(大写转小写+下划线): node.label | node.sprite | node.layout | ...
 * - 获取子节点: node.child("XXX") | node.child("XXX/XXX") | node.child("XXX").child("XXX")...;
 * - 设置自动更新子节点缓存: node.child_update_b = true or false;
*/
if (!CC_EDITOR) {
    /**nodes缓存
     * - true：可节省大量子节点情况下的遍历消耗 and 非首次获取组件的时间消耗，需占用一定内存
     * - false: 使用cocos原接口，不占用内存
     */
    var cache_b = true;
    var component_ss_1 = {
        dragon_bones: globalThis.dragonBones ? globalThis.dragonBones.ArmatureDisplay : null,
        graphics: cc.Graphics,
        label: cc.Label,
        label_outline: cc.LabelOutline,
        label_shadow: cc.LabelShadow,
        light: cc.Light,
        mask: cc.Mask,
        particle_system: cc.ParticleSystem,
        particle_system_3d: cc.ParticleSystem3D,
        rich_text: cc.RichText,
        sp_skeleton: globalThis.sp ? globalThis.sp.Skeleton : null,
        sprite: cc.Sprite,
        tiled_map: cc.TiledMap,
        tiled_tile: cc.TiledTile,
        mesh_renderer: cc.MeshRenderer,
        skinned_mesh_renderer: cc.SkinnedMeshRenderer,
        block_input_events: cc.BlockInputEvents,
        button: cc.Button,
        canvas: cc.Canvas,
        edit_box: cc.EditBox,
        layout: cc.Layout,
        page_view: cc.PageView,
        page_view_indicator: cc.PageViewIndicator,
        progress_bar: cc.ProgressBar,
        scroll_bar: cc.Scrollbar,
        scroll_view: cc.ScrollView,
        slider: cc.Slider,
        toggle: cc.Toggle,
        toggle_container: cc.ToggleContainer,
        toggle_group: cc.ToggleGroup,
        video_player: cc.VideoPlayer,
        web_view: cc.WebView,
        widget: cc.Widget,
        box_collider: cc.BoxCollider,
        circle_collider: cc.CircleCollider,
        polygon_collider: cc.PolygonCollider,
        physics_box_collider: cc.PhysicsBoxCollider,
        box_collider_3d: cc.BoxCollider3D,
        physics_chain_collider: cc.PhysicsChainCollider,
        physics_circle_collider: cc.PhysicsCircleCollider,
        physics_polygon_collider: cc.PhysicsPolygonCollider,
        sphere_collider_3d: cc.SphereCollider3D,
        constant_force: cc.ConstantForce,
        distance_joint: cc.DistanceJoint,
        motor_joint: cc.MotorJoint,
        mouse_joint: cc.MouseJoint,
        prismatic_joint: cc.PrismaticJoint,
        revolute_joint: cc.RevoluteJoint,
        rope_joint: cc.RopeJoint,
        weld_joint: cc.WeldJoint,
        wheel_joint: cc.WheelJoint,
        rigid_body: cc.RigidBody,
        rigid_body_3d: cc.RigidBody3D,
        animation: cc.Animation,
        audio_source: cc.AudioSource,
        camera: cc.Camera,
        motion_streak: cc.MotionStreak,
        skeleton_animation: cc.SkeletonAnimation,
        swan_sub_context_view: cc.SwanSubContextView,
        wx_sub_context_view: cc.WXSubContextView,
    };
    // ------------------准备参数
    var temp1_a_1;
    // ------------------nodes缓存数据
    if (cache_b) {
        Object.defineProperty(cc.Node.prototype, "__nodes_a", {
            get: function () {
                if (!this.__nodes_cache_a) {
                    this.__nodes_cache_a = {
                        init_b: false,
                        component_map: new Map,
                        child_map: new Map,
                        child_update_b: false,
                    };
                }
                return this.__nodes_cache_a;
            },
        });
    }
    // ------------------组件便捷接口
    if (cache_b) {
        var _loop_1 = function (k_s) {
            Object.defineProperty(cc.Node.prototype, k_s, {
                get: function () {
                    temp1_a_1 = this.__nodes_a.component_map.get(k_s);
                    if (!temp1_a_1) {
                        temp1_a_1 = this.getComponent(component_ss_1[k_s]);
                        this.__nodes_a.component_map.set(k_s, temp1_a_1);
                    }
                    return temp1_a_1;
                },
                set: function () {
                    this.__nodes_a.component_map.delete(k_s);
                },
            });
        };
        for (var k_s in component_ss_1) {
            _loop_1(k_s);
        }
    }
    else {
        var _loop_2 = function (k_s) {
            Object.defineProperty(cc.Node.prototype, k_s, {
                get: function () {
                    return this.getComponent(component_ss_1[k_s]);
                }
            });
        };
        for (var k_s in component_ss_1) {
            _loop_2(k_s);
        }
    }
    // ------------------获取子节点接口
    if (cache_b) {
        cc.Node.prototype.child = function (v_s_, update_b_) {
            var path_ss = v_s_.split("/");
            var self = this;
            for (var _i = 0, path_ss_1 = path_ss; _i < path_ss_1.length; _i++) {
                var path_s = path_ss_1[_i];
                // 实时更新子节点
                if (update_b_) {
                    self.__nodes_a.child_map.delete(path_s);
                    temp1_a_1 = self.getChildByName(path_s);
                    self.__nodes_a.child_map.set(path_s, temp1_a_1);
                }
                else {
                    temp1_a_1 = self.__nodes_a.child_map.get(path_s);
                    if (!temp1_a_1) {
                        temp1_a_1 = self.getChildByName(path_s);
                        self.__nodes_a.child_map.set(path_s, temp1_a_1);
                    }
                }
                if (!temp1_a_1) {
                    break;
                }
                self = temp1_a_1;
            }
            return temp1_a_1;
        };
    }
    else {
        cc.Node.prototype.child = function (v_s_, update_b_) {
            var path_ss = v_s_.split("/");
            temp1_a_1 = this;
            for (var _i = 0, path_ss_2 = path_ss; _i < path_ss_2.length; _i++) {
                var path_s = path_ss_2[_i];
                // 实时更新子节点
                temp1_a_1 = temp1_a_1.getChildByName(path_s);
                if (!temp1_a_1) {
                    break;
                }
            }
            return temp1_a_1;
        };
    }
    // ------------------获取组件接口
    if (cache_b) {
        cc.Node.prototype.component = function (type, update_b_) {
            // 实时更新子节点
            if (update_b_) {
                this.__nodes_a.component_map.delete(type);
                temp1_a_1 = this.getComponent(type);
                this.__nodes_a.component_map.set(type, temp1_a_1);
            }
            else {
                temp1_a_1 = this.__nodes_a.component_map.get(type);
                if (!temp1_a_1) {
                    temp1_a_1 = this.getComponent(type);
                    this.__nodes_a.component_map.set(type, temp1_a_1);
                }
            }
            return temp1_a_1;
        };
    }
    else {
        cc.Node.prototype.component = function (type, update_b_) {
            return this.getComponent(type);
        };
    }
    // ------------------重载子节点自动更新
    if (cache_b) {
        Object.defineProperty(cc.Node.prototype, "child_update_b", {
            get: function () {
                return this.__nodes_a.child_update_b;
            },
            set: function () {
                var _this = this;
                if (this.__nodes_a.child_update_b) {
                    this.__nodes_a.child_update_b = false;
                    this.off(cc.Node.EventType.CHILD_REMOVED, function (node_o) { return _this.__nodes_a.child_map.delete(node_o.name); }, this);
                }
                this.on(cc.Node.EventType.CHILD_REMOVED, function (node_o) { return _this.__nodes_a.child_map.delete(node_o.name); }, this);
            },
        });
    }
}