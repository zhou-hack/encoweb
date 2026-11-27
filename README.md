# enco · 卡片化产品展示

使用 React + Vite，围绕 enco 的真实校园看板、课表与语音界面设计。

## 启动

```bash
cd .deploy
npm ci
npm run dev
```

## 静态部署

仓库根目录就是可直接发布的静态站点：`index.html`、`assets/` 和 `media/`。React 源码保存在 `.deploy/`，Cloudflare 不需要运行构建。

更新页面后执行：

```powershell
Set-Location .deploy
npm run build
Copy-Item dist/index.html ../index.html -Force
Copy-Item dist/assets, dist/media ../ -Recurse -Force
```

旧哈希资源可在核对后清理。`dist/` 是本地构建缓存，不提交到 Git。

## 页面内容

- 首屏逐词与旋转文字动效，悬浮日程、快递和待办卡片，支持鼠标分层视差。
- 可逆的滚动卡片归位场景，以及不对称功能卡片布局。
- 三组预设指令演示、真实产品界面详情弹窗和 Agent 执行步骤切换。
- 语音保存交互演示，以及可勾选的待办卡片。
- 完整产品影片与四个章节的播放跳转。
- 响应式布局、键盘焦点、减少动态效果偏好支持。

素材来自用户提供的 enco 项目与最终影片，字体与图标随依赖打包，无运行时第三方服务。

## 影片更新

替换 `.deploy/public/media/enco-film.mp4`，并根据新影片调整 `.deploy/src/main.jsx` 中的 `chapters` 时间与界面文案。现有展示片长为 02:21。

影片使用脱敏版的网页压缩副本，时长 02:21。

## Cloudflare Pages

连接 `zhou-hack/encoweb` 的 `main` 分支，使用静态发布：

| 设置 | 值 |
| --- | --- |
| 构建设置 | 留空 / 不使用构建命令 |
| 构建输出目录 | `/` |

每次推送后，Cloudflare 直接发布仓库根目录。

## GitHub Pages

本项目使用 Cloudflare Pages 静态发布，不使用 GitHub Pages 工作流。
