# gt_shanhai 配置目录说明（4.7.0 起的新版结构）

> 本目录是**分发用的配置模板库**。游戏实际读取的是存档整合包里的
> `config/gt_shanhai/`，把这里的文件按相同相对路径拷过去即可。

## 一、目录结构

```
gt_shanhai/
├─ changelog/                     更新公告（Markdown，文件名须含三段版本号）
│  └─ Update-4.5.1.md ...
│
├─ shop/                          山海商店
│  ├─ shop.json                   商品清单（最大的那个，1MB+）
│  ├─ shop_category_order.json    分类页签拖拽排序
│  ├─ shop_quest_links.json       FTBQ 任务关联
│  ├─ shop_stage_requirements.json 分类阶段提交物
│  ├─ exchanges.json              物品/流体兑换表
│  └─ currency/
│     ├─ currency_rates.json      货币汇率（relative to 铜币锚点）
│     └─ currency_stages.json     货币阶段（ulv/lv/.../max）
│
├─ recipe/                        配方控制
│  ├─ recipe_overrides.json       配方编辑器覆写
│  ├─ strip_rules.json            剥离规则
│  ├─ replace_rules.json          替换规则
│  ├─ delete_rules.json           删除规则
│  ├─ active_presets.json         当前生效的预设清单
│  └─ presets/                    配方预设（每个预设一个 json）
│
├─ machine/
│  └─ multiblock_registry.json    多方块按模组启停开关
│
└─ client/                        纯客户端数据，服务器可忽略
   ├─ ae_terminal_favorites.nbt   AE 终端收藏
   └─ pattern-generator-presets/  样板生成器预设
```

## 二、没放在本目录的文件

以下几个文件**必须由游戏自己生成**，不要手工分发：

| 文件 | 位置 | 原因 |
|------|------|------|
| `gt_shanhai-common.toml` | `config/gt_shanhai/` 根目录 | Forge 注册的配置文件名，位置不可改；每台机器按需自行生成 |
| `shop_client_ui.json` | `config/gt_shanhai/shop/` | 客户端界面偏好（卡片宽高、上次搜索词），玩家本地生成 |
| `guides/` | `config/gt_shanhai/guides/` | GuideME 热重载目录，由模组首次启动自动释放 |

`gt_shanhai-common.toml` 刻意留在根目录：Forge 的 `ModLoadingContext.registerConfig`
用相对路径 `gt_shanhai/gt_shanhai-common.toml` 定位它，挪动会让老存档的配置全部失联。

## 三、旧版升级会自动迁移

4.6.0 及以前的版本把上述文件全部平铺在 `config/gt_shanhai/` 根目录。
4.7.0 首次启动时会自动把旧文件搬到对应子目录，玩家不需要手动操作：

- 新位置不存在 → 直接移动
- 新位置已存在 → **保留新文件**，旧文件改名成 `*.legacy` 留档（不删除玩家数据）
- 整个流程幂等，重复启动不会重复搬运

迁移只在模组构造函数里跑一次，日志会打印：
`[Config] 已把旧版平铺配置迁移到 config/gt_shanhai/ 分组结构`

## 四、当前这个模板库缺哪些文件

对比过实际运行目录后，这里目前**没有**收录：

- `machine/multiblock_registry.json`（多方块开关，按需生成）
- `recipe/recipe_overrides.json`、`recipe/strip_rules.json`、`recipe/replace_rules.json`、`recipe/delete_rules.json`
- `recipe/active_presets.json`
- `client/ae_terminal_favorites.nbt`
- `client/pattern-generator-presets/`

需要随包分发的话，从跑过游戏的实例的 `config/gt_shanhai/` 里按相同相对路径拷过来即可。
