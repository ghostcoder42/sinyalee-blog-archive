# sinyalee-blog-archive

sinyalee.com 博客备份工具 — 将 WordPress 文章抓取并转换为 Markdown 存储。

## 免责声明

本项目仅供个人学习和备份使用。抓取的内容版权归原博主所有。使用者应遵守相关法律法规和网站的使用条款，不得将抓取的内容用于商业用途或侵犯原作者的合法权益。如因使用本项目产生任何法律纠纷，由使用者自行承担全部责任。

## 技术栈

- **Runtime**: bun + TypeScript
- **HTML 解析**: cheerio
- **HTML → Markdown**: turndown
- **代码质量**: biome

## 安装

```bash
bun install
```

## 使用

```bash
# 干运行（只查看，不写入）
bun run src/index.ts --config configs/sinyalee.json --dry-run

# 抓取前 5 篇测试
bun run src/index.ts --config configs/sinyalee.json --limit 5

# 全量抓取
bun run src/index.ts --config configs/sinyalee.json

# 强制更新已有文章
bun run src/index.ts --config configs/sinyalee.json --force-update
```

## 开发

```bash
# 类型检查
bun run typecheck

# 代码检查
bun run lint:check

# 自动修复代码
bun run lint:fix

# 构建
bun run build

# 提交前检查（类型检查 + 修复 + 构建）
bun run precommit
```

## 项目结构

```
sinyalee-blog-archive/
├── src/
│   ├── index.ts              # CLI 入口
│   ├── config.ts             # 配置类型定义 + 加载
│   ├── fetcher.ts            # HTTP 抓取（UA伪装、重试、限速）
│   ├── parser/
│   │   ├── list-parser.ts    # 列表页解析器接口
│   │   ├── post-parser.ts    # 文章页解析器接口
│   │   └── wordpress/        # WordPress 解析实现
│   ├── converter.ts          # HTML → Markdown 转换
│   ├── asset-downloader.ts   # 图片下载
│   ├── writer.ts             # Markdown 文件写入
│   └── utils/                # 工具函数
├── configs/
│   └── sinyalee.json         # sinyalee.com 配置
├── blog/                     # 生成的 markdown（备份数据）
├── .github/workflows/        # CI/CD
├── biome.json                # 代码质量配置
├── tsconfig.json             # TypeScript 配置
└── package.json
```

## CI/CD

- **CI** (`.github/workflows/ci.yml`): push/PR 时自动运行类型检查、lint、构建
- **Sync** (`.github/workflows/sync.yml`): 每日 UTC 02:00 自动抓取新文章并推送到仓库

## 配置说明

配置文件格式见 `configs/sinyalee.json`，支持：

- `list.strategy`: 列表页策略 (`simple-yearly-archive` | `paged`)
- `post.selectors`: 文章页 CSS 选择器
- `fetch`: 抓取参数（UA、延迟、重试次数）
- `output`: 输出配置（目录、图片下载等）
