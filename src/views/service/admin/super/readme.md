# 分离成单个属性组
```
  "form": {
    "prop": ["userName", "sex", "sysId"],
    "label": ["用户名", "性别", "归属系统"],
    "type": ["input", "select", "select"],
    "baseData": ["", "sex", "system"]
  },
```
- 缺点
  - 各属性必需一一对应，即使为空，也不能缺失。而在表单项很多的时候，其实可以省略很多重复的配置。

# 完整对象，各属性之间完全隔离，默认项可以省略（例如：非基础数据可以省略）
```
"cols": [
  {
    "prop": "userName",
    "label": "用户名",
    "type": "input",
    "className": "",
    "rules": [
      {
        "required": true, "message": "用户名不能为空", "trigger": "blur"
      },
      {
        "min": 4, "max": 10, "message": "长度在 4 到 10 个字符", "trigger": "blur"
      }
    ],
    "key": false
  },
  {
    "prop": "userPassword",
    "label": "密码",
    "type": "input",
    "className": "",
    "rules": [
      {
        "required": true, "message": "密码不能为空", "trigger": "blur"
      },
      {
        "min": 6, "max": 15, "message": "长度在 6 到 15 个字符", "trigger": "blur"
      }
    ]
  }
]
```
- 缺点
  - 行数较多
