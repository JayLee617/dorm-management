# 晨曦大学 · 宿舍管理系统（移动端原型）

面向大学宿舍管理场景的移动端高保真原型，覆盖 **学生 / 宿管 / 维修 / 辅导员 / 管理员** 五类角色的核心流程。蓝白校园风设计，全部页面为移动端竖屏布局。

## 角色与页面

| 角色 | 地址 | 核心功能 |
| --- | --- | --- |
| 学生端 | `/student` | 首页、报修、服务、消息、我的 |
| 宿管端 | `/manager` | 工作台、查寝打卡、入住办理、退宿确认、工单 |
| 维修端 | `/maintenance` | 工作台、接单大厅、工单处理、上报完工 |
| 辅导员端 | `/counselor` | 工作台、学生住宿、申请审批、查寝结果 |
| 管理员端 | `/admin` | 统计、楼栋管理、宿舍分配、账号权限 |

默认 `/` 即学生端。原型中所有业务数据为前端内置的演示数据，列表支持搜索过滤与空状态，查寝结果、工作台统计等数字随交互实时联动。

## 本地运行

环境要求：Node.js 20 及以上（本项目使用 Vite 8）。

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:5173`（如端口被占用可调整 Vite 配置），然后访问对应角色地址，例如 `http://localhost:5173/manager`。

静态预览：

```bash
npm run build
npx serve -s dist/client -l 5174
```

## 在线访问（GitHub Pages）

仓库已内置 `.github/workflows/pages.yml`：推送到 `master`/`main` 分支后自动构建并以 `/dorm-management/` 为子路径部署，五个角色页可通过深链接直接访问：

- https://jaylee617.github.io/dorm-management/student
- https://jaylee617.github.io/dorm-management/manager
- https://jaylee617.github.io/dorm-management/maintenance
- https://jaylee617.github.io/dorm-management/counselor
- https://jaylee617.github.io/dorm-management/admin

首次部署前，需在仓库 Settings → Pages → Source 中选择 **GitHub Actions**。构建产物中的 `404.html` 为 SPA 深链接回退文件，由 `scripts/prepare-pages-build.mjs` 生成。

## 技术栈

- React 19 + TypeScript + Vite 8
- 自定义移动端运行时（PhoneFrame / FlowStack / 模拟键盘 / 底部安全区）
- Tabler Icons + 手写 CSS 设计系统

## 目录说明

```text
src/
  Prototype.tsx      # 五个角色的页面与业务逻辑
  prototype.css      # 应用级样式
  mobile/            # 移动端运行时组件（受保护）
  assets/            # 首页插画等静态资源
scripts/             # 构建 / QA 截图脚本
design-qa.md         # 设计决策与回归记录
```

## 后续规划

- 后端 API（Node + SQLite）与登录鉴权
- 前端数据接入真实接口
- GitHub Pages / 云部署，使五个角色页可在线访问
