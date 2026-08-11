# 组织架构调整工具

组织架构可视化调整工具：在图上编辑组织架构（重命名 / 移动 / 删除 / 新增），维护部门角色（PIC / HRBP1 / HRBP2 / Department Assistant），管理下辖员工，并生成可直接粘贴回 Base 的变更记录。数据实时读取自 Lark Base，登录走真实的飞书第三方登录。

## 架构

- **前端**：`index.html` + `css/style.css` + `js/app.js`，无构建步骤，纯 vanilla JS
- **后端**：`api/` 下的 Vercel Serverless Functions，负责飞书 OAuth 登录和调用 Lark Base OpenAPI
- **数据源**：这个 Base 的三张表——`Lark Structures`（组织架构）、`Employee list`（BIPO花名册）、`Lark User`（角色选人用）：
  `https://digiplus.sg.larksuite.com/base/MzgobsHp5a7513s58H4lxtWIgUg`

每次打开页面、或点"刷新数据"，后端都会重新调用 Lark Base 接口拉取最新数据——不是缓存，也不是写死的快照。所有在页面上做的编辑（重命名/移动/删除/角色变更等）只停留在浏览器本地，**不会写回 Base**；"复制变更 / 下载 CSV"导出的内容需要人工核对后手动贴回 Base。

## 部署所需的环境变量（在 Vercel 项目设置里配置，不要提交到仓库）

| 变量名 | 说明 |
|---|---|
| `LARK_APP_ID` | 复用 `org-chart-live` 项目的飞书应用 App ID |
| `LARK_APP_SECRET` | 同一个应用的 App Secret |
| `SESSION_SECRET` | 用于签名本项目自己的会话 Cookie 的随机字符串，和 `org-chart-live` 的不需要相同 |
| `DIGIPLUS_TENANT_KEY`（可选） | 限制只有这个飞书租户能登录；不设置时任何租户都能登录成功，日志里会打印实际的 `tenant_key`，确认后可以回填这个变量收紧 |

飞书应用那边还需要在「重定向 URL」里加一条：`https://<你的Vercel域名>/api/auth/callback`（比如 `https://new-org-change.vercel.app/api/auth/callback`）。

另外，这个飞书应用必须对上面这个 Base 有访问权限——如果和 `org-chart-live` 用的不是同一个 Base（目前确实不是同一个），需要去 Base 的协作者/权限设置里，把这个应用加进去，否则 `/api/org-data` 会报读取失败。

## 本地开发

`api/` 下是标准的 Vercel Node Serverless Function 写法（`module.exports = async (req, res) => {...}`），本地跑真实的飞书登录需要 `vercel dev`（会读取 `.env.local` 里的上述环境变量）。纯改前端界面时，也可以自己写一个假的 `/api/auth/me`、`/api/org-data` 返回固定 JSON，绕开真实登录快速预览界面效果。

## 功能一览

- **组织架构图**：卡片式节点 + 圆角折线连接（共用主干、非交叉曲线），支持纵向 / 横向切换、按名称搜索聚焦到某个子树、拖拽节点直接发起移动
- **编辑类型**（重命名 / 移动 / 删除）：同一次保存里三选一或自由组合重命名 + 移动，删除与其他类型互斥；移动的目标下拉列表会自动排除自身及所有子部门，避免循环嵌套
- **新增子部门**：独立的"+"入口（不和其他编辑类型混在一起），新增时可以一并把角色也设置好
- **角色管理**：PIC / HRBP1 / HRBP2 / Department Assistant 只能从 Lark User 名单里搜索指定；支持一键把当前部门的 HRBP1/HRBP2/Department Assistant 应用到所有下级部门；自动检测某个分支下角色是否不一致或存在空值并提示
- **删除前安置员工**：部门下有员工时不能直接删除，需要先给每个人指定新部门（支持单个指定或批量转移到同一个部门）；撤销删除会把这批员工自动迁回原部门
- **员工调动**：下辖员工名单里勾选后批量转移，也可以用顶部"转移员工"按钮按姓名 / EID 搜索单独调动
- **净变化对比**：重命名 / 移动 / 角色变更如果在同一次会话里来回改、最终变回原样，不会在变更记录里留痕迹；多次移动只保留"原始位置 → 最终位置"这一条净结果，不记录中间过程
- **移动部门时提示同步汇报关系**：如果被移动部门设有负责人（PIC），且移动后其"名义上级"发生变化，会提示是否同步更新该负责人的直属汇报对象，需要人工确认，不会自动静默修改
- **语言切换**：右上角中文/EN，切换后连变更记录里已产生的历史记录也会用选中语言重新格式化
- **刷新数据**：重新从 Base 拉取最新数据；会丢弃当前未导出的本地编辑，点击前会有提醒确认
- **导出**：变更记录 / 受影响员工清单支持一键复制（TSV，可直接粘贴进 Base 表格）或下载 CSV；组织架构图支持导出 PNG（手工在 canvas 上逐个绘制节点和连线，不依赖把 DOM 转图片，避开了 Chromium 对含 `<foreignObject>` 的 SVG 图片判定为"污染 canvas"而拒绝导出的问题）

## 数据匹配说明

`Employee list`（BIPO）用的部门名称，和 `Lark Structures` 有个别已知的缩写差异（比如 "Investor Relations Corp Comms and Sustainability" vs "...Corporate Communications and Sustainability"），`lib/buildOrgData.js` 里做了这几个已确认的名称做了归一化处理，其余匹配不上的员工会被归到"Unassigned / 未匹配部门"节点下，页面加载时会有提示，不会静默消失。

## 项目结构

```
index.html          页面结构
css/style.css        样式（含亮 / 暗色主题变量）
js/app.js            前端全部交互逻辑
api/auth/login.js     跳转到飞书授权页
api/auth/callback.js  换取 token、建立会话
api/auth/logout.js    清除会话
api/auth/me.js        查询当前登录状态
api/org-data.js       拉取三张表并组装成组织树
lib/sources.js        Base token、表 ID、字段名配置
lib/fetchLark.js       Lark Bitable OpenAPI 调用（租户 token 缓存、分页拉取）
lib/buildOrgData.js    原始记录 -> 组织树 + 员工 + 角色候选人 的纯函数转换
lib/session.js         签名 Cookie 的工具函数
lib/auth.js            Cookie 解析、会话校验
```

## 和 org-chart-live 的关系

公司内部已有一个更早、覆盖全公司范围的同类项目 **org-chart-live**（`github.com/milan20260727/org-chart-live`），同样是真实登录 + 真实读写 Lark Base，但读的是另一个 Base。这两个仓库是独立的两条线，本仓库复用了 `org-chart-live` 的飞书应用（同一个 App ID/Secret）来省去重新注册应用的步骤，但数据源、会话 Cookie、部署都是各自独立的，互不影响。
