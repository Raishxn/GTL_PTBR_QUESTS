---
enabled: true
version: 4.9.4
title: GTSH 4.9.4 更新公告
title_en: GTSH 4.9.4 Release Notes
link: [[GitHub](https://github.com/dishanhai/gtl_shanhai-dishanhai/releases)] - 发布与下载 / Releases and downloads
link: [[GitHub Issues](https://github.com/dishanhai/gtl_shanhai-dishanhai/issues)] - 问题反馈 / Report an issue
link: [[Afdian](https://afdian.com/a/dishanhai)] - 爱发电赞助 / Sponsor on Afdian
---

# GTSH 4.9.4

> ⚠️ **4.9.4 同版修正**　此包仍为 **4.9.4**，联机协议为 **23**。客户端与服务端请同时换成此包的同一构建；不能与旧协议 22 的 4.9.4 混用。

- **样板生成器**：修复部分整合包使用稀疏物品或流体注册 ID 时，编辑白名单导致的崩溃。[#59](https://github.com/dishanhai/gtl_shanhai-dishanhai/pull/59)
- **GTL-Extend**：已过时，明确声明为可选，不再保留旧式必装标记。

## 更新内容

<details open>
<summary><quote:trade> 存档工具、商店与机器</summary>

- **存档编辑**。有命令权限的单机房主可用 `/shanhai saveedit` 查看和编辑玩家、世界、方块、实体、进度和统计数据。修改先暂存，确认后写入。关闭面板会丢弃暂存修改。存档体检可列出重复登记的实体。
- **时间回溯**。用 `/shanhai time record start` 开始记录，再用 `/shanhai time anchor set` 设置锚点。`/shanhai time rewind` 回到锚点，附加秒数可回退指定时长。回溯期间世界冻结并暂停写盘，可用 `/shanhai time rewind stop` 中止。
- **商店自动合成**。同一份方案只能确认一次。若确认时实际缺口已变化，界面会提示手动重新计算。AE 更新库存后，如果目标缺口未变，原计划仍可继续提交，提交前会重新检查留存库存和计划用料。 [#56](https://github.com/dishanhai/gtl_shanhai-dishanhai/pull/56)
- **星律与样板搬运**。拆除星律总成可回收溢出缓存，相关区块暂不可用时会记录待返还的物品。批量放置主机样板时，通配符会在整批放置结束后统一展开。
- **归墟与原初机器**。Jade 显示归墟主机的实际发电量（EU/t）和能源仓、动力仓状态。新增视界物质解压与原初范式简化配方，支持按配方关闭原初万象衍生核心的产出加成。简易黑洞提取模块搭配 **1 号电路**可提取锂、铍、硼等元素粉，各 64 份。模块和电路可重复使用。
- **配方编辑器与全息菜单**。恢复单条配方后，结果会在重新载入后保留。全息菜单会预览管理员命令，须在 3 秒内再次确认才会发送。方块遮挡菜单时会拦截点击。
- **dgyjh02804 玩偶**。新增可放置的跳舞玩偶。

</details>

<details>
<summary><quote:transfer> 主机样板搬运与兼容性修复</summary>

- **主机样板搬运工具**。Shift＋右键源主机读取样板，原样板仍留在源槽。到目标主机右键预览，确认后才写入。Shift＋右键空气可查看工具内的样板。工具容量为 **1.5 MiB**，可识别唯一匹配的通配符样板。
- **搬运独立电路**。带独立电路设置的母槽样板可连同配置搬运。若目标槽不支持独立电路，或写入失败，样板及配置会留在工具内，可换到受支持的母槽重试。 [#46](https://github.com/dishanhai/gtl_shanhai-dishanhai/pull/46) · [#48](https://github.com/dishanhai/gtl_shanhai-dishanhai/pull/48)
- **独立电路与 AE 接单**。母样板槽可单独设置 **1–32 号电路**，设为 **0** 恢复默认。虚拟激活的多配方机器可接收其他受支持配方类型的 AE 订单，GRAPH 合成可识别外部虚拟供应。
- **多方块兼容性**。修复 EnhancedCore 下部分机器的能源仓和维护仓位置。山海枢纽使用世线信标时会保留配方原有的输入消耗概率。 [#49](https://github.com/dishanhai/gtl_shanhai-dishanhai/pull/49) · [#51](https://github.com/dishanhai/gtl_shanhai-dishanhai/pull/51)

</details>

## 兼容性

- **Forge 共享库**。需要 **SH-Better-UI 1.0.12+** 和 **SH-Common-Lib 0.4.1+**，玩家包已附带对应版本。
- **联机**：修正版与旧协议 22 构建不可混用。客户端与服务端请同时替换为此包的协议 23 构建。
- **可选兼容**：GTL-Extend 已过时，非必装。保留整合包本身需要的其他前置。

## 致谢

- **核心代码**　@dishanhai
- **GitHub 问题反馈**　@oojunsama、@MuYi0552、@lycc193bp
- **本期新加入的赞助者**　**Chanrian0607**、**爱发电用户_8k3s**
- **再次赞助**　感谢 **爱发电用户_AyGF** 再次支持。

[GitHub Issues](https://github.com/dishanhai/gtl_shanhai-dishanhai/issues) · [爱发电](https://afdian.com/a/dishanhai)

## English

This corrected build retains the version **4.9.4** and uses network protocol **23**. Upgrade client and server together; do not mix it with the original protocol-22 build. It includes the [#59](https://github.com/dishanhai/gtl_shanhai-dishanhai/pull/59) pattern-generator whitelist fix. GTL-Extend is deprecated and optional. Use Forge SH-Better-UI 1.0.12+ and SH-Common-Lib 0.4.1+.
