# 常见问题
- webstorm 不识别webpack别名，无法智能跳转，需要在webstorm的 Language & Framework -> javascript -> webpack 中
配置webpack配置文件的绝对路径 vue/cli 3.0 因合并配置文件，暂时无法解决

- Definition for rule 'vue/script-indent' was not found vue/script-indent
  - eslint-plugin-vue 更新到 4.2.1 解决
  
- eslint-config-standard not found 
  - package.json => devDependencies => "eslint-config-standard": "^10.2.1",
  
- babel-plugin-dynamic-import-node not found 动态加载
  - package.json => devDependencies => "babel-plugin-dynamic-import-node": "^1.2.0"
- [跨域问题](https://www.jianshu.com/p/3dd667e42395)
## 打包常见问题
- Module build failed: TypeError: this[NS] is not a function
    - 主要是插件MiniCssExtractPlugin的问题
    ```
    // vue.config.js
    const MiniCssExtractPlugin = require("mini-css-extract-plugin")
        module.exports = {
            configureWebpack: {
              plugins: [
                //  压缩 css 插件
                new MiniCssExtractPlugin({
                  filename: "styles/[name].css"
                })
              ]
            }
        }
    ```
- 打包后显示空白
    - 控制台资源加载404，路径问题：assetsPublicPath: "/" -> "./"
    - router history 模式导致，需要后台配置支持或者使用默认的hash模式
         
- 证书
    <!-- - 操作只保留重置按钮 -->
- 导入任务
    <!-- - 操作下载 -->
- 角色
    <!-- - 菜单树缩小* -->
    <!-- - 菜单配置收起展开* -->
    <!-- - 新增 改为弹框 -->
    <!-- - 返回* -->
- 系统管理
    <!-- - 编辑移除部门 -->
    <!-- - 增加产品多选 -->
- 菜单管理
    - 新增
    - 表单校验*
- 管理员
    <!-- - 表单 用户来源、用户状态 -->
    <!-- - 授权系统 -->
     <!-- - 必选授权系统 -->
- 应用
    <!-- - 表单备注没显示数据 -->
- CA
    <!-- - 表单备注密钥标识未显示 -->
- 产品
    <!-- - 表单算法类型 -->
- 订单
    <!-- - 导入接口 400 -->
    <!-- - 列表页面不显示数据 -->
- 用户
    - 用户导入 
        <!-- - 系统管理员 导入没有查询系统列表接口的权限 -->
        <!-- - 是否需要产品id -->
        <!-- - 默认content type 400 异常  -->
        <!-- - 更改content type multipart/form-data 500 -->
        <!-- - 区域管理员 导入接口地址调整 -->
        <!-- - 超级管理员 导入接口地址调整 -->
    - 用户管理
        <!-- - 筛选框 状态     -->
         <!-- - 超级管理员 表单 用户类型显示为编码 -->
         <!-- - 区域管理员 表单 用户类型不显示 -->
    - 用户审批
        <!-- - 默认查询待审核用户 -->
        <!-- - 点击审批按钮判断是否选中待审批用户 -->
        <!-- - 审批按钮* -->
        <!-- - 列表页多选框 -->

- 待测
     <!-- - 测试证书重置功能 (u盾不存在) -->
     <!-- - 产品列表不展示第三方产品编号 -->

     
<!-- - 超级管理员和区域管理员测试审批功能 -->
  
<!-- - 超级管理员新增系统管理员不需要授权系统 -->
<!-- - 用户类型 为正式和测试用户 -->

- 用户审批
    <!-- - 区域管理员移除提交按钮 -->

<!-- - 测试区域管理员和系统管理员上传用户信息文件 -->
<!-- - 订单信息导入待优化 -->
  
<!-- - axios 上传文件 400 问题：axios配置问题 直接使用axios.post()方法可以成功上传         -->


<!-- - 新增表单id 不显示 -->
    
<!-- - 表单修改 id不可修改 -->
- 系统管理
    <!-- - 提交: service参数接受错误（需要request.getParameter()或者实体类） -->
- 跨域相关问题：getToken 接口
    - 用localhost访问，则无法写入cookie（因为后台接口前缀是 127.0.0.1）
    - 用127.0.0.1访问，encode 的 token 无法自动解码
    - 服务器端自动解码
    
<!-- - 区域管理员用户信息、订单模块导出功能 -->

<!-- - 首页报表 -->
<!-- - 登录cookie跨域的问题 -->

<!-- - 记录接口调用成功提示 -->

<!-- - 导入任务需要获取 baseUrl*  待测 -->



<!-- - 订单详情页缺少用户姓名（区域管理员） -->
<!-- - 系统管理员 用户信息模块 编辑页无 userType字段 -->
<!-- - 登录显示加密用户名密码 * -->
<!-- - 分页显示 * -->
- 超级管理员
    <!-- - 系统管理 列表过滤注销数据 -->
    <!-- - 管理员删除  列表过滤注销数据 -->
    <!-- - 应用组管理 列表过滤注销数据 -->
    <!-- - 订单 列表过滤注销数据 -->
    <!-- - 用户信息管理 列表过滤注销数据 -->
- 系统管理员
    <!-- - 用户信息管理 列表过滤注销数据    -->
    <!-- - 用户信息模块翻页无法使用 -->

<!-- - 系统管理员 用户信息、订单信息、导入任务均无数据 -->
<!-- - 应用需要增加bundleID（应用新增生成appId报错） -->
<!-- - adminType 移到前端cookie中 -->
<!-- - 后台导出接口 -->
<!-- - 区域管理员新增系统管理员 参数修改 -->
<!-- - 导出接口 404 -->
<!-- - 审批完查询 -->

# 注意事项
- 通配符判断接口url
    - adminType 判断，放在store和cookie中，store没有就从cookie中读取
- 管理员删除
    - 除超级管理员外均可删除
- 超级管理员 授权系统
    - 区域管理员和观察者表单才有授权系统
    - 超级管理员默认对全部系统都有权限
    - 系统管理员只能访问自己系统的权限
- 新增管理员类型
    - 新增角色 -> 选择角色类型 -> par_type 表 moduleId=80 roleType
    - 新增管理员 -> 选择角色类型 -> ai_job 表 jobId
- 观察者对应页面
  - 系统移除新增按钮
  - 订单移除操作栏 

？？讨论
- 订单状态默认已完成为什么不使用字段默认值？
- 级联查询不要全部查询，例如订单信息中的产品信息不需要状态、时间等信息


<!-- - 应用字段被遮挡（全局字体大小）      -->
- 用户审批
    <!-- - 默认查询待审批用户* -->
    <!-- - 点击审批按钮判断是否选中待审批用户    -->
- 管理员
     <!-- - 必选授权系统*       -->
- 角色
   <!-- - 菜单树缩小* -->
   <!-- - 菜单配置收起展开* -->
- 菜单管理
    <!-- - 新增 -->
    <!-- - 表单校验 -->
<!-- - 上传成功和审批成功的提示 -->
<!-- - 证书重置需要提示 -->
<!-- - 列表增加滚动条(每页展示数超过10时) -->

- 分页改变pageSize之后查询就有问题

<!-- - 任务下载(系统管理员能否下载任务失败信息) -->
- 新增需要刷新页面(审批、删除element ui已删除, 修改不能刷新（会导致翻页问题）)
- 管理员出生日期和入职日期可以选未来
- 导航菜单图标
- 新增清空表单
# 蓝牙卡重置审批功能
- 导入预制蓝牙卡信息 
    - mac 地址需要转换
    
- 管理员申请重置蓝牙卡 ble_ukey_approval_info
    - checkApprovalInfo(approvalInfo) // 审批表查询用户是否已申请重置
    - return approvalInfo != null &&(status != wait_approval && status != wait_confirm)
        - 存在判断是否待审批状态
                - 存在且(待审批和可重置)禁止提交
                - 只有审批不通过、正常才能再次提交
        - 不存在提交
    - updateBleUkeystatus(ukeyId, phoneNumber) // 蓝牙卡信息表状态改为待审批
    
- 审批列表    
- 审批 ble_ukey_approval_info 需要展示用户id、身份证
- 审批通过
    - user_ble_ukey_info 备份到 remove表 增加备注
    - 修改user_ble_ukey_info 状态为可重置
    
# 日志查询
- 查询条件：iccid phoneType phoneManufacturer

# 模块详情
- 企业
    - 一个企业多产品，单应用
	/**
	 * 插入单个企业信息
     * 1.企业表 sys_system_info
     * 2.根据 appId 联表 ctpass_app_relation_info 查询 ctpassId
     * 3.企业应用表 sys_app_relation_info, 此时groupId暂定为空
     * 4.企业产品表 product_sys_relation
	 */

- 应用
    - 一个应用一个组，多应用公用一个盾（一个应用对应多个盾？需求待确定） 
    - 应用区分android/ios
    - sys_third_access_config
- 应用组
    - 应用列表过滤已分组应用（sys_app_group_relation_info 表是否存在或者状态是否正常？）
    - 修改分组信息
        - 插入应用组信息表 sys_group_info 表
        - 根据 groupId 批量修改应用和应用组关系表 sys_app_group_relation_info status='01'
        - 根据 appIds 批量插入新分组信息 sys_app_group_relation_info
        
- 蓝牙卡重置
    - ble_user_ukey_info 单条和批量重置
    - 重置表展示ukey
    - 审批表还需要身份证、用户名、单位吗？
    
    - 重置流程
    - ukeyIds
    - getUkeyInfoById(String ukeyId)
    - addApprovalInfo(UkeyApprovalInfo ukeyApproval)

- 证书列表只有nfc才能重置
- nfc和蓝牙卡都能通过证书列表注销
<!-- 1:证书列表添加证书注销按钮 /user/cert/base/logoutUserCert (userId, certId) -->
<!-- 2:修改用户（姓名、手机号和身份证 任一信息变更  先注销接口） 如果用户证书已存在，则先注销原有证书信息 -->
<!-- 3:订单手机号展示，修改手机号从用户信息表取，订单列表同步取用户信息表手机号 -->
<!-- 4:修改订单的时候不允许修改用户名和手机号 -->
<!-- 5.参数移除空格 -->

- Cannot assign to read only property 'exports' of object '#<Object>'
不能混用 import 和 module.exports = {} 改为 export {}

# 修改密码
- 前端加密参数（密码，新密码，确认密码）
- 接口解密参数
- 参数校验
- 根据 userId 查询加密密码（新接口）
- 加密前端传来的密码和查询的密码比较
    - 不一致返回密码错误
    - 一致更新密码 （新接口）