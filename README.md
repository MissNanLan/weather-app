# 天气应用 (Weather App)

一个优雅的天气应用，提供实时天气信息和未来7天的天气预报。使用天行API获取天气数据，基于Next.js和React构建。

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

# 启动开发服务器
npm run dev
# 或使用 pnpm
pnpm dev
```

## 使用说明

1. 首页默认显示当前城市的天气情况
2. 点击左上角的城市名称可以打开城市选择界面
  <img width="864" alt="image" src="https://github.com/user-attachments/assets/a2871e75-bd2d-46c5-ad06-18bc4b679bef" />

4. 在城市选择界面可以搜索或从常用城市列表中选择城市
   <img width="853" alt="image" src="https://github.com/user-attachments/assets/5421d212-bb0a-4027-a153-aeba880ccf06" />

6. 天气页面会显示当前温度、天气状况和穿衣建议
   <img width="851" alt="image" src="https://github.com/user-attachments/assets/eccc548b-060d-48a6-a838-344c2c929660" />

8. 底部展示7天的天气预报，可以左右滑动查看

## 项目结构

```
/app                  # Next.js应用入口
/components
  - city-selector.tsx # 城市选择组件
  - common-city.tsx   # 常用城市组件
  - weather-app.tsx   # 主天气应用组件
  - weather-icon.tsx  # 天气图标组件
  /ui                 # UI组件库
/lib
  - date-utils.ts     # 日期处理工具
  - utils.ts          # 通用工具函数
  - weather-api.ts    # 天气API服务
/types
  - city.ts           # 城市数据类型定义
  - weather.ts        # 天气数据类型定义
```

## API配置

应用使用天行API获取天气数据，需要在`lib/weather-api.ts`中配置API密钥：

```typescript
const API_KEY = "your_api_key_here";
```

您可以在[天行数据](https://www.tianapi.com/)申请获取自己的API密钥。

## 贡献

欢迎提交问题和贡献代码，请遵循以下步骤：

1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

## 许可证

MIT
