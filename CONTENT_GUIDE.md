# 个人网站内容管理指南

这份指南将帮助你管理和更新你的个人网站内容。

## ✨ 全新！可视化内容管理后台
**访问地址**: http://localhost:4321/keystatic

我已经为你集成了 **Keystatic** 内容管理系统。现在你可以像使用 WordPress 一样管理你的博客和项目，而无需直接编辑代码文件。

1.  启动本地服务器: `npm run dev`
2.  在浏览器访问 `/keystatic`
3.  点击 **Blog** 或 **Projects**
4.  你可以：
    *   **创建新文章**: 点击 "Create" 按钮
    *   **编辑现有文章**: 点击列表中的文章标题
    *   **可视化编辑器**: 支持加粗、斜体、列表、链接等，无需记忆 Markdown 语法
    *   **实时保存**: 修改后的内容会自动保存到 `src/content` 目录下

---

## 手动管理方式 (如果你喜欢直接编辑文件)

### 1. 修改个人简介 (关于我)
**文件位置**: [src/pages/about.astro](src/pages/about.astro)

打开该文件，你会在顶部的脚本区域（两个 `---` 之间）看到数据定义：

```javascript
const skills = [
  "JavaScript/TypeScript", "React", ... // 在这里修改技能
];

const experience = [
  {
    role: "职位名称",
    company: "公司名称",
    period: "时间段",
    description: "工作描述"
  },
  // ... 添加更多经历
];
```

页面下方的 HTML 内容中可以修改详细的自我介绍文本。

## 2. 添加新的项目案例
**文件位置**: `src/content/projects/`

在该目录下创建一个新的 `.md` (Markdown) 或 `.mdx` (支持组件的 Markdown) 文件。
**示例**: `src/content/projects/my-app.md`

**文件内容模板**:
```markdown
---
title: "项目名称"
description: "这是一个很棒的项目，解决了..."
pubDate: 2024-03-20
heroImage: "/blog-placeholder-1.jpg" # (可选) 图片需放在 public 目录下
tags: ["Vue", "Node.js"]
link: "https://my-app.com"       # (可选) 在线演示链接
repo: "https://github.com/..."   # (可选) GitHub 仓库链接
---

## 项目详情

这里可以使用 **Markdown** 语法编写项目的详细介绍。
- 支持列表
- 支持代码块
```

## 3. 发布新的博客文章
**文件位置**: `src/content/blog/`

在该目录下创建一个新的 `.md` 或 `.mdx` 文件。
**示例**: `src/content/blog/learning-notes.md`

**文件内容模板**:
```markdown
---
title: "我的学习笔记"
description: "今天学到了很多新知识..."
pubDate: 2024-03-20
heroImage: "/blog-placeholder-about.jpg" # (可选)
tags: ["学习", "教程"]
---

这里是文章的正文内容...
```

## 4. 修改首页欢迎语
**文件位置**: [src/pages/index.astro](src/pages/index.astro)

直接搜索并修改 `<h1 ...>你好，我是...</h1>` 及其下方的 `<p>` 标签内容。

## 5. 图片管理
**文件夹**: `public/`

将你的图片（头像、项目截图、文章封面）放入 `public` 文件夹中。
在代码中引用时，直接使用 `/图片名.jpg` 即可（不需要加 `/public`）。

## 6. 常用命令

- **启动本地预览**: `npm run dev` (在浏览器访问 http://localhost:4321)
- **构建生产版本**: `npm run build` (生成 `dist` 目录用于部署)
