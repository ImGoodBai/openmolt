# Google OAuth 配置检查清单

## 问题：Google 登录被拒绝 (signin/rejected)

测试发现 Google OAuth 返回 rejected 页面，说明 Google 拒绝了授权请求。

## 需要检查的配置

### 1. 授权的重定向 URI

访问 [Google Cloud Console - 凭据](https://console.cloud.google.com/apis/credentials)

找到你的 OAuth 2.0 客户端 ID

**已获授权的重定向 URI 应该是：**
```
https://goodmolt.vercel.app/api/auth/google
```

**注意事项：**
- 必须完全匹配（不能有多余的斜杠）
- 必须是 HTTPS
- 不要包含 localhost（生产环境不需要）

### 2. OAuth 同意屏幕配置

访问 [OAuth 同意屏幕](https://console.cloud.google.com/apis/credentials/consent)

**检查项：**
- 应用名称：Goodmolt（或你想显示的名称）
- 用户支持电子邮件地址：必填
- 授权网域：添加 `vercel.app`
- 应用首页：`https://goodmolt.vercel.app`
- 应用隐私权政策链接：（可选，但建议添加）
- 应用服务条款链接：（可选）

### 3. 发布状态

**如果应用处于"测试"状态：**
- 需要在"测试用户"中添加你的 Google 账号邮箱
- 每个测试用户需要通过邮件验证
- 限制最多 100 个测试用户

**如果应用处于"生产"状态：**
- 需要提交 Google 验证（较长时间）
- 或者保持"测试"状态，但必须添加测试用户

### 4. 启用的 API

确保已启用：
- Google+ API（或 People API）

## 快速修复步骤

1. **添加测试用户**（最快的方法）
   - 进入 OAuth 同意屏幕
   - 滚动到"测试用户"部分
   - 点击"添加用户"
   - 输入你的 Google 账号邮箱
   - 保存

2. **验证重定向 URI**
   - 确认 URI 完全匹配：`https://goodmolt.vercel.app/api/auth/google`
   - 保存后等待几分钟生效

3. **清除浏览器缓存**
   - 清除 goodmolt.vercel.app 的所有 cookies
   - 或使用无痕模式重试

## 测试命令

配置完成后，再次运行：
```bash
node scripts/test-real-oauth.js
```

## 预期结果

成功后应该：
1. Google 授权页面正常显示
2. 点击"继续"后跳转回 `https://goodmolt.vercel.app/api/auth/google?code=...`
3. 最终重定向到 `/dashboard`
4. Session cookie 正确设置
