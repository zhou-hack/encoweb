# enco · 卡片化产品展示

使用 React + Vite，围绕 enco 的真实校园看板、课表与语音界面设计。

## 启动

```bash
npm install
npm run dev
```

生产构建：`npm run build`。

构建后的 `dist/` 是完整静态站点，包含页面、字体、图片和脱敏视频，可直接托管，不需要 Node.js 服务。无需把 `dist/` 提交到 Git。

## 页面内容

- 首屏逐词与旋转文字动效，悬浮日程、快递和待办卡片，支持鼠标分层视差。
- 可逆的滚动卡片归位场景，以及不对称功能卡片布局。
- 三组预设指令演示、真实产品界面详情弹窗和 Agent 执行步骤切换。
- 语音保存交互演示，以及可勾选的待办卡片。
- 完整产品影片与四个章节的播放跳转。
- 响应式布局、键盘焦点、减少动态效果偏好支持。

素材来自用户提供的 enco 项目与最终影片，字体与图标随依赖打包，无运行时第三方服务。

## 影片更新

替换 `public/media/enco-film.mp4`，并根据新影片调整 `src/main.jsx` 中的 `chapters` 时间与界面文案。现有展示片长为 02:21。

影片使用脱敏版的网页压缩副本，时长 02:21。

## Cloudflare Pages

最快的方式是 **Direct Upload**：在 Cloudflare Pages 创建项目后，直接上传本地 `dist/` 目录，不需要连接 GitHub。

后续连接 GitHub 自动部署时，使用：

| 设置 | 值 |
| --- | --- |
| 构建命令 | `npm ci && npm run build` |
| 构建输出目录 | `dist` |
| Node.js 版本 | `24` |

## GitHub Pages

仓库已包含 `.github/workflows/pages.yml`。在 GitHub 仓库的 **Settings → Pages → Source** 选择 **GitHub Actions**，推送到 `main` 后自动构建并部署 `dist/`。
