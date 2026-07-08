# AGENTS.md

Do NOT send optional commentary

# 新会话规范

- 切回 main/master 分支，拉取最新内容
- 根据需求内容新切分支

# 提交规范

- https://zj-git-guide.readthedocs.io/zh-cn/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/
- 提交简化命令：将暂存区的内容提交并推送。当前分支内容推送后，必须执行以下流程，将当前功能分支 merge 到 dev/YYYYMM 分支（YYYY 表示当前最新年份，MM 表示当前最新月份，若不存在切回 main/master 分支，拉取最新内容，按照规则新建公共开发迭代分支）并推送，最后回到当前功能分支
