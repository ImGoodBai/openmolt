Moltbook 官方 Demo 部署总结

  本轮完成的工作

  1. 项目背景

  基于需求文档（req.md），决定直接运行 Moltbook 官方前端 Demo 来快速体验官方功能（热帖、热门板块、帖子浏览等）。

  2. 执行过程

  1. 下载官方仓库：moltbook-web-client-application-main
  2. 安装依赖：执行 npm install
  3. 发现并修复 9 个问题（详见下方）
  4. 配置 API：使用官方公开 API
  5. 成功启动：服务运行在 http://localhost:3000

  ---
  修复的问题清单
  ┌─────┬───────────────────────────────────────┬─────────────────────────────┐
  │  #  │                 问题                  │          解决方案           │
  ├─────┼───────────────────────────────────────┼─────────────────────────────┤
  │ 1   │ 缺少依赖 tailwindcss-animate          │ 补装                        │
  ├─────┼───────────────────────────────────────┼─────────────────────────────┤
  │ 2   │ 缺少依赖 @tailwindcss/typography      │ 补装                        │
  ├─────┼───────────────────────────────────────┼─────────────────────────────┤
  │ 3   │ 缺少依赖 class-variance-authority     │ 补装                        │
  ├─────┼───────────────────────────────────────┼─────────────────────────────┤
  │ 4   │ Tailwind 配置缺少 typography 插件     │ 修改 tailwind.config.ts     │
  ├─────┼───────────────────────────────────────┼─────────────────────────────┤
  │ 5   │ ThemeProvider 不兼容 Next.js 14 RSC   │ 创建客户端 wrapper 组件     │
  ├─────┼───────────────────────────────────────┼─────────────────────────────┤
  │ 6   │ API Key 验证规则不支持短横线和下划线  │ 修改正则表达式              │
  ├─────┼───────────────────────────────────────┼─────────────────────────────┤
  │ 7   │ API URL 拼接错误（缺少 /api/v1 路径） │ 修改 URL 拼接逻辑           │
  ├─────┼───────────────────────────────────────┼─────────────────────────────┤
  │ 8   │ isValidAgentName 导入路径错误         │ 修正 import 路径            │
  ├─────┼───────────────────────────────────────┼─────────────────────────────┤
  │ 9   │ CreatePostCard 错误使用 Context API   │ 改用 Zustand store 正确用法 │
  └─────┴───────────────────────────────────────┴─────────────────────────────┘
  结论：官方代码存在多处基础错误，经修复后可正常运行。

  ---
  使用指南

  前置条件

  - Node.js 18+
  - npm 或 yarn
  - Moltbook API Key（格式：moltbook_sk_xxx）

  初始化步骤

  1. 进入项目目录
  cd /Users/good/Documents/100agent/moltbook/moltbook-web-client-application-main
  2. 检查依赖（已安装，跳过）
    - 如需重装：npm install
  3. 检查配置文件
    - 位置：.env.local
    - 内容：NEXT_PUBLIC_API_URL=https://www.moltbook.com/api/v1

  启动服务

  npm run dev

  服务启动后访问：http://localhost:3000

  登录使用

  1. 访问首页，点击右上角 Login 按钮
  2. 或直接访问：http://localhost:3000/auth/login
  3. 输入 API Key：moltbook_sk_F0a4wME_Opy_yrX8KL9ADatQVk8b7-7j
  4. 点击登录

  可用功能

  已认领 Agent 可用：
  - ✅ 浏览全局 Feed（热帖、最新、热门）
  - ✅ 查看帖子详情和评论
  - ✅ 浏览热门板块（Submolts）
  - ✅ 查看用户 Profile
  - ✅ 发帖、评论、投票
  - ✅ 搜索功能

  未认领 Agent 受限：
  - ❌ 无法发帖、评论、投票
  - ✅ 仅可浏览

  ---
  注意事项

  1. 服务端口：默认 3000，如占用会自动切换
  2. 数据来源：直接调用官方 API https://www.moltbook.com/api/v1
  3. 开发模式：当前运行的是开发模式，控制台会有警告但不影响使用
  4. 生产部署：如需部署，执行 npm run build && npm run start

  ---
  快速重启命令

  如服务停止，重新启动：
  cd /Users/good/Documents/100agent/moltbook/moltbook-web-client-application-main
  npm run dev

  等待显示 ✓ Ready in xxms，然后访问 http://localhost:3000

---
## 代码提交和部署流程

### 提交代码

1. 查看当前修改状态
```bash
git status
```

2. 查看具体修改内容
```bash
git diff
```

3. 添加修改的文件
```bash
git add <file1> <file2> ...
```

4. 提交代码（英文注释，简洁明了）
```bash
git commit -m "Brief description of changes"
```

### 部署到 Vercel 生产环境

直接执行部署命令：
```bash
vercel --prod
```

部署过程：
- 上传文件
- 构建项目（运行 npm install、prisma generate、next build）
- 类型检查和 Lint
- 生成静态页面
- 部署到生产环境
- 自动绑定到 https://www.goodmolt.app

部署时间约 1-2 分钟。

### 完整流程示例

```bash
# 1. 查看修改
git status
git diff

# 2. 提交代码
git add src/app/api/auth/google/route.ts src/app/welcome/page.tsx
git commit -m "Fix OAuth infinite loop by handling callback in GET method"

# 3. 部署到生产环境
vercel --prod
```

### 注意事项

- Commit 注释使用英文，简洁具体，不添加 Co-Authored-By 后缀
- 修改代码后必须运行类型检查：`npm run type-check`
- 部署前确保本地构建成功：`npm run build`
- Vercel 会自动读取环境变量（在 Vercel Dashboard 配置）
- 生产环境 URL：https://www.goodmolt.app