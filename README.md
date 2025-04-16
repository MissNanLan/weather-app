# 天气应用 (Weather App)

一个优雅的天气应用，提供实时天气信息和未来7天的天气预报。使用天行API获取天气数据，基于Next.js和React构建。 访问地址 https://weather-app-plum-three-85.vercel.app/

## 功能特点

- 实时天气数据展示
- 7天天气预报
- 城市搜索与切换
- 常用城市快速选择
- 详细的天气参数（温度、湿度、风向、降水等）
- 响应式设计，适配各种设备

## 技术栈

- [Next.js](https://nextjs.org/) - React框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式
- [Lucide React](https://lucide.dev/) - 图标
- [天行API](https://www.tianapi.com/) - 天气数据源

## 安装与设置

```bash
# 克隆项目
git clone https://github.com/yourusername/weather-app.git

# 进入项目目录
cd weather-app

# 安装依赖
npm install
# 或使用 pnpm
pnpm install

# 配置环境变量
cp .env.example .env
# 编辑.env文件，填入您的API密钥

# 启动开发服务器
npm run dev
# 或使用 pnpm
pnpm dev
```

## 环境变量配置

本项目使用环境变量来配置API密钥和默认城市。您可以在项目根目录创建`.env`文件（已包含在.gitignore中）：

```
# 天行API密钥
NEXT_PUBLIC_API_KEY=your_tianapi_key_here

```

开发环境中的.env文件不会被提交到Git仓库，确保您的API密钥安全。对于部署环境（如Vercel），您需要在部署平台的环境变量设置中添加这些变量。

## 使用说明

### 1. 首页默认显示当前城市的天气情况
<img width="1501" alt="image" src="https://github.com/user-attachments/assets/eebb02f5-3c0d-474b-b504-96f467a43e09" />

### 2. 点击左上角的城市名称可以打开城市选择界面
  <img width="864" alt="image" src="https://github.com/user-attachments/assets/a2871e75-bd2d-46c5-ad06-18bc4b679bef" />

### 3. 在城市选择界面可以搜索或从常用城市列表中选择城市
   <img width="853" alt="image" src="https://github.com/user-attachments/assets/5421d212-bb0a-4027-a153-aeba880ccf06" />

### 4. 天气页面会显示当前温度、天气状况和穿衣建议
   <img width="851" alt="image" src="https://github.com/user-attachments/assets/eccc548b-060d-48a6-a838-344c2c929660" />

### 5. 底部展示7天的天气预报，可以左右滑动查看
<img width="393" alt="image" src="https://github.com/user-attachments/assets/1f79c056-5ee7-45b9-92b1-dc1dd0dc0a24" />


## 项目结构

```
/app                  # Next.js应用入口
/api
  - weather-api.ts    # 天气API服务
/components
  - city-selector.tsx # 城市选择组件
  - common-city.tsx   # 常用城市组件
  - weather-app.tsx   # 主天气应用组件
  - weather-icon.tsx  # 天气图标组件
  /ui                 # UI组件库
/config
 - index.ts           # APIKEY 配置
/lib
  - utils.ts          # 通用工具函数
/types
  - city.ts           # 城市数据类型定义
  - weather.ts        # 天气数据类型定义
```

## API配置

应用使用天行API获取天气数据，需要在`.env`文件中配置API密钥：

```
NEXT_PUBLIC_API_KEY=your_tianapi_key_here
```

您可以在[天行数据](https://www.tianapi.com/)申请获取自己的API密钥。

## 部署

本项目已部署在Vercel上，访问地址：https://weather-app-plum-three-85.vercel.app/

如需部署到自己的Vercel账户：

1. Fork本项目到您的GitHub账户
2. 在Vercel中导入该GitHub仓库
3. 在Vercel项目设置中添加环境变量：
   - `NEXT_PUBLIC_API_KEY`: 您的天行API密钥

部署完成后，Vercel会自动生成一个可访问的URL。

MIT
