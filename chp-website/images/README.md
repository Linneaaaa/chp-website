# 📸 产品图片上传指南 / Image Upload Guide

## 文件夹分类 / Folder Structure

每个文件夹代表一个产品系列，请把对应系列的图片放入对应文件夹。
**图片必须使用产品型号命名**（与PDF手册一致），这样网站会自动找到对应的产品。

```
images/products/
├── 01-washing-bottle/   ← 洗护瓶系列 (Washing Bottle Series)
├── 02-skincare/         ← 护肤品系列 (Skin Care Product Series)
├── 03-sunscreen/        ← 防晒瓶系列 (Sunscreen Bottle Series)
└── 04-sample/           ← 试用装系列 (Sample Series)
```

## 图片命名规则 / Naming Rules

**完全按照产品型号命名，使用小写，扩展名 .jpg 或 .png**

✅ 正确示例:
- `pet250-600ml.jpg`  (PET250-600ML 的图片)
- `pet277-300ml.jpg`  (PET277-300ML 的图片)
- `pet48-200ml.jpg`   (PET48-200ML 的图片)

❌ 错误示例:
- `bottle1.jpg`       (没有型号信息)
- `PET250-600ML.JPG`  (大写后缀)
- `IMG_1234.jpg`      (相机默认文件名)

## 操作步骤 / Steps

1. 打开2026川禾手册 PDF
2. 找到要导入的产品（页面上有型号，例如 `PET250-600ML`）
3. 截图或导出该产品图片
4. 重命名为 `pet250-600ml.jpg`
5. 放入对应的系列文件夹
6. 完成！网站会自动加载

## 缺图怎么办 / If a Photo is Missing

如果某个产品暂时没有图片，不用担心，网站会显示一个占位符。
等你后续补充图片时，按照上面的命名规则放入文件夹即可。

## 工厂图片 / Factory Photos

工厂照片放在 `images/factory/` 文件夹，文件名建议：
- `factory-main.jpg`     ← 工厂全景
- `factory-workshop.jpg` ← 车间内部
- `factory-qc.jpg`       ← 质检室
- `factory-equipment.jpg` ← 生产设备

## 公司Logo客户图 / Brand Logos

合作品牌Logo放在 `images/brand-logos/` 文件夹（可选）。
