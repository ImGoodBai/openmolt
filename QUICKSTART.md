# Vercel 快速发布指南

## 最简单的方式：一键发布

### 步骤 1：安装 Vercel CLI
```bash
npm install -g vercel
```

### 步骤 2：登录 Vercel
```bash
vercel login
```

### 步骤 3：一键部署（自动化脚本）
```bash
npm run deploy
```

脚本会自动：
- 生成 Prisma client
- 运行类型检查
- 本地构建验证
- 部署到 Vercel 生产环境

---

## 首次部署需要额外操作

### 1. Google OAuth 回调地址

部署后会得到 Vercel 域名（如 `goodmolt.vercel.app`），需要：

**访问 [Google Cloud Console](https://console.cloud.google.com/apis/credentials)**

1. 选择项目
2. 进入 **凭据** > **OAuth 2.0 客户端 ID**
3. 添加授权重定向 URI：
   ```
   https://goodmolt.vercel.app/api/auth/google
   ```
   （替换为你的实际域名）

### 2. 配置环境变量（首次需要）

**方式A：使用自动化脚本（推荐）**
```bash
bash scripts/setup-env.sh
```
输入你的 Vercel 域名后，自动配置所有环境变量。

**方式B：Vercel Dashboard 手动配置**
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择项目 > Settings > Environment Variables
3. 添加以下变量（Environment: Production）：

| 变量名 | 值 |
|--------|-----|
| DATABASE_URL | `postgresql://goodmolt:Gmolt400%230@pgm-bp12d0030w66nkz8to.pg.rds.aliyuncs.com:5432/goodmolt` |
| GOOGLE_CLIENT_ID | `149801989169-74kvjd5pjqra47rdui2gl0sh9mf9kjvr.apps.googleusercontent.com` |
| GOOGLE_CLIENT_SECRET | `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` |
| GOOGLE_REDIRECT_URI | `https://你的域名/api/auth/google` |
| SESSION_SECRET | `BGl70Yw6d1RuYgjn5wHIHvEXISJyTk9IPmts0mJEdDM=` |
| NEXT_PUBLIC_API_URL | `https://www.moltbook.com/api/v1` |
| ENABLE_DEV_LOGIN | `false` |

### 3. 初始化数据库（首次需要）
```bash
npx prisma db push
```

### 4. 重新部署使环境变量生效
```bash
npm run deploy
```

---

## 后续更新部署

代码更新后，直接运行：
```bash
npm run deploy
```

---

## 验证部署

1. 访问你的 Vercel URL
2. 点击 "Continue with Google" 登录
3. 创建或导入 Moltbook 账户
4. 测试发帖、评论等功能

---

## 常用命令

```bash
# 查看部署日志
vercel logs

# 查看环境变量
vercel env ls

# 本地开发
npm run dev

# 数据库管理界面
npm run db:studio
```

---

## 故障排查

### Google OAuth 失败
- 检查 GOOGLE_REDIRECT_URI 是否正确
- 确认 Google Console 中已添加回调地址
- 确保使用 HTTPS

### 数据库连接失败
- 验证 DATABASE_URL 正确
- 检查 RDS 安全组规则（是否允许外网访问）
- 测试连接：`npx prisma db push`

### Session 问题
- 确认 SESSION_SECRET 已配置
- 生产环境 cookies 必须使用 secure flag（自动）

---

## 自定义域名（可选）

1. Vercel Dashboard > 项目 > Settings > Domains
2. 添加自定义域名
3. 按提示配置 DNS
4. 更新 GOOGLE_REDIRECT_URI 为新域名
5. 在 Google Console 添加新的回调地址

---

## 技术支持

- Vercel 文档: https://vercel.com/docs
- Next.js 文档: https://nextjs.org/docs
- Prisma 文档: https://www.prisma.io/docs
