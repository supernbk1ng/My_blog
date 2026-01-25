# 网站上线与安全配置指南

本指南将帮助你将博客部署到 **Vercel**，并配置 **Keystatic** 内容管理系统，使其在生产环境中既能公开访问，又能安全地管理内容。

## 1. 核心原理
- **公开访问**：你的网站通过 Vercel 部署，所有人都可以访问你的博客文章和页面。
- **内容管理安全**：后台管理地址 (`/keystatic`) 受到 **GitHub OAuth** 保护。
    - 只有拥有该 GitHub 仓库 **写入权限** 的用户（即你自己）才能登录并修改内容。
    - 其他人即使访问该地址，也无法登录，因此无法修改你的网站。

---

## 2. 准备工作

### 第一步：修改配置信息
在项目文件中找到 `keystatic.config.ts`，将以下部分修改为你实际的 GitHub 用户名和仓库名：

```typescript
// keystatic.config.ts
storage: import.meta.env.PROD
  ? {
      kind: 'github',
      repo: {
        owner: '你的GitHub用户名', // 例如：zhangsan
        name: '你的仓库名称',     // 例如：my-blog
      },
    }
  : { ... }
```

### 第二步：推送到 GitHub
如果你还没有创建 GitHub 仓库，请先创建一个，然后将代码推送上去：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

---

## 3. 配置 GitHub OAuth 应用
为了让 Keystatic 能够代表你通过网页修改 GitHub 上的内容，你需要创建一个 OAuth App。

1. 登录 GitHub，进入 [Developer Settings](https://github.com/settings/developers)。
2. 点击 **"New OAuth App"**。
3. 填写以下信息：
    - **Application Name**: `My Blog CMS` (或任意名称)
    - **Homepage URL**: `https://你的项目名.vercel.app` (部署后会获得，如果还不知道可以先填 `http://localhost:4321`，之后再改)
    - **Authorization callback URL**: `https://你的项目名.vercel.app/api/keystatic/github/oauth/callback`
        - **注意**：一定要加上 `/api/keystatic/github/oauth/callback` 后缀。
4. 点击 **Register application**。
5. 记录下 **Client ID**。
6. 点击 **Generate a new client secret**，记录下 **Client Secret**。

---

## 4. 部署到 Vercel

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard) 并登录。
2. 点击 **"Add New..."** -> **"Project"**。
3. 选择你的 GitHub 仓库并点击 **Import**。
4. 在 **Environment Variables** (环境变量) 区域，添加以下三个变量：

| 变量名 | 值 | 说明 |
| :--- | :--- | :--- |
| `KEYSTATIC_GITHUB_CLIENT_ID` | (刚才获取的 Client ID) | GitHub OAuth ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | (刚才获取的 Client Secret) | GitHub OAuth Secret |
| `KEYSTATIC_SECRET` | (随机生成的长字符串) | 用于加密会话，可以随意输入一串乱码 |

5. 确认 **Framework Preset** 自动识别为 **Astro**。
6. 点击 **Deploy**。

---

## 5. 验证上线
部署完成后：
1. **访问主页** (`https://你的项目名.vercel.app`)：确认网站可以正常浏览。
2. **访问管理后台** (`/keystatic`)：
    - 你应该会看到 "Sign in with GitHub" 按钮。
    - 点击登录并授权。
    - 登录成功后，你可以像在本地一样管理内容。
    - 修改并保存内容后，Keystatic 会自动在 GitHub 上创建一个 Commit，Vercel 会检测到并在几分钟内自动重新部署更新后的网站。

## 常见问题
- **部署失败？** 检查 Vercel 日志。确保 `astro.config.mjs` 中已正确配置 `output: 'hybrid'` 和 `adapter: vercel()`。
- **无法登录后台？** 检查 GitHub OAuth App 的 **Callback URL** 是否与你 Vercel 的实际域名完全匹配。
