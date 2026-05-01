# CHP Packaging Website — 完整使用指南

## ⚡ 快速开始

1. 解压这个 ZIP 文件
2. 双击 `index.html` 即可在浏览器预览网站
3. 后台地址：双击 `admin/index.html`，账号 `admin` / 密码 `chp2024`

---

## 📁 文件结构

```
chp-website/
├── index.html              ← 主网站
├── css/style.css           ← 样式
├── js/
│   ├── main.js             ← 主逻辑
│   ├── translations.js     ← 4种语言翻译数据
│   └── i18n.js             ← 语言切换
├── images/
│   ├── README.md           ← 📌 图片上传指南（重要！）
│   ├── products/           ← 产品图片
│   │   ├── 01-washing-bottle/   ← 洗护瓶系列 (13款)
│   │   ├── 02-skincare/         ← 护肤品系列 (95款)
│   │   ├── 03-sunscreen/        ← 防晒瓶系列 (6款)
│   │   └── 04-sample/           ← 试用装系列 (15款)
│   ├── factory/            ← 工厂图片
│   └── brand-logos/        ← 合作品牌Logo（可选）
└── admin/                  ← 后台管理系统
    ├── index.html
    ├── admin.css
    └── admin.js
```

---

## 🖼️ 如何添加产品图片（重要！）

### 命名规则
图片文件名 = **产品型号（小写）** + `.jpg`

**例子：**
- 产品 `PET250-600ML` → 文件名 `pet250-600ml.jpg`
- 产品 `PET277-300ML` → 文件名 `pet277-300ml.jpg`
- 产品 `PE295-85ML` → 文件名 `pe295-85ml.jpg`

### 放入对应文件夹

| 系列 | 文件夹 | 数量 |
|------|--------|------|
| 洗护瓶系列 | `images/products/01-washing-bottle/` | 13款 |
| 护肤品系列 | `images/products/02-skincare/` | 95款 |
| 防晒瓶系列 | `images/products/03-sunscreen/` | 6款 |
| 试用装系列 | `images/products/04-sample/` | 15款 |

**网站会自动识别文件名并显示对应产品图片。**
**没图片的产品会显示型号占位符，等你后续补充。**

---

## 🌐 多语言支持

网站支持4种语言切换（右上角按钮）：
- **EN** 英文
- **中文** 简体中文
- **한국어** 韩文
- **Tiếng Việt** 越南文

浏览器会自动记住用户选择的语言。如需修改翻译内容，编辑 `js/translations.js`。

---

## 🛠️ 后台管理系统

打开 `admin/index.html`（部署后访问 `www.chp-packing.com/admin`）

| 功能 | 说明 |
|------|------|
| Dashboard | 查看数据概览、最新询盘 |
| Messages | 查看/管理客户留言 |
| Products | 新增/编辑/删除产品 |
| Homepage | 修改 Banner 标题、按钮文字 |
| About & Factory | 修改公司介绍、上传工厂图 |
| Process Steps | 编辑定制流程文字 |
| Contact Info | 修改电话/邮箱/微信/WhatsApp |
| Settings | 修改密码、导出CSV |

**默认密码：`chp2024`，登录后请立即修改。**

---

## 📧 接入邮箱通知（客户提交表单时邮件提醒）

1. 注册 [EmailJS](https://www.emailjs.com/)（免费每月200封）
2. 在后台 Contact 页面填入：
   - Service ID
   - Template ID
   - 接收提醒的邮箱
3. 客户提交表单后会自动给你发邮件

---

## 🚀 部署上线（让网站真正能访问）

### 第一步：上传到 GitHub
1. 注册 [GitHub](https://github.com)
2. 新建仓库 `chp-website`，选 Public
3. 拖拽上传所有文件

### 第二步：连接 Vercel
1. 注册 [Vercel](https://vercel.com)，用 GitHub 账号登录
2. New Project → 导入 `chp-website` 仓库
3. 点 Deploy，30秒内上线

### 第三步：绑定域名 chp-packing.com
1. 在 Vercel → Settings → Domains
2. 添加 `chp-packing.com` 和 `www.chp-packing.com`
3. Vercel 会显示两条 DNS 记录（A记录 + CNAME）
4. 回到阿里云域名控制台，按 Vercel 提示填写
5. 等 10-30 分钟生效

完成后访问 `www.chp-packing.com` 即可看到你的网站。

---

## 📞 联系方式修改

需要修改的地方：

**前端硬编码（直接改 index.html）：**
- 搜索 `15800595981` → 改成你的电话
- 搜索 `zhangyanqing@cn-chp.com` → 改成你的邮箱

**或登录后台 Contact 页面修改（推荐）**

---

## 💡 注意事项

- 当前后台数据存储在浏览器本地，换电脑会丢失
- 生产环境建议接入 Firebase 或 Supabase 实现云端存储
- 图片建议使用 JPG 格式，宽度 800px 左右最佳

---

如有问题，欢迎继续向 Claude 提问 ✦
