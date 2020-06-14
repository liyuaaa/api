# 商品api接口
## Author 李育

### 接口说明
- 接口地址：`http: //127.0.0.1:8899/api/`
1. 该接口使用koa+koa-generator(koa框架)来进行搭建接口
2. 使用cross-env 来设置环境变量的插件
```
"dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www", // 开发模式的环境变量
"prd": "cross-env NODE_ENV=production pm2 start bin/www", //发布模式的环境变量
```
3. 使用sequelize+mysql2来进行数据库操作
4. 使用koa-jwt+jsonwebtoken来进行token操作
5. 数据返回格式统一使用 JSON
6. 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
7. 获取快递数据，使用axios获取url
---------------------------------------------------------------
### 项目说明-文件名
1. DB文件(定义模型，封装操作) --- 使用sequelize来进行数据库连接操作同步
+ module文件 -- 使用sequelize来定义数据库的表
+ seq.js 是来sequelize配置连接数据库
+ sync.js 是同步数据库数据
+ seqTypes 是来封装sequelize的数据类型
2. service文件(数据处理，格式化) --- 对数据库进行增删改查
3. controller文件(业务逻辑，返回格式) --- 获取routes文件传过来要处理的数据，在service文件里面进行数据库操作，操作完成把数据返回到routes文件
4. routes文件(api接口) --- 定义api接口的名字，并相依输出数据
5. model文件(模型使用) --- 返回成功和失败的数据模型，在controller里面调用
+ ResModel.js 是来对错误信息和正确信息做一个模型
+ ErrorModel.js是来输出错误信息
+ SuccessModel.js是来输出正确信息
6. utils文件(数据加密操作) -- 对需要加密的数据进行加密，在controller里面调用
7. conf文件(常量数据和密钥数据) -- 在里面定义常量数据和密钥数据
---------------------------------------------------------------
### 返回状态说明
|*状态码*|*含义*|*说明*|
|-------|------|------|
|200|OK|请求成功|
|201|CREATED|创建成功|
|204|DELETED|删除成功|
|400|BADREQUEST|请求的地址不存在或者包含不支持的参数或者操作数据出错|
|401|UNAUTHORIZED|未授权|
|403|FORBIDDEN|被禁止访问|
|404|NOTFOUND|请求的资源不存在|
|500|INTERNALSERVERERROR|内部错误|
---------------------------------------------------------------
## 1.1.注册登录api
### 1.1.1.判断用户名是否存在验证接口
+ 请求路径：isExist
+ 请求方式：post
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|username|用户名|不能为空|

+ 响应数据
```
{
  "meta": {
    "msg": "用户名不存在",
    "status": 200
  }
}
```


### 1.1.2.注册验证接口
+ 请求路径：register
+ 请求方式：post
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|username|用户名|不能为空|
|password|密码|不能为空|
|mobile|电话号码|不能为空|
|email|邮箱|不能为空|
|rid|用户角色id|不能为空|
|username|状态|不能为空|
|username|用户身份|不能为空|

+ 响应数据
```
meta: {
  "msg": "注册成功",
  "status": 200
}
```

### 1.1.3.登录验证接口
+ 请求路径：login
+ 请求方式：post
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|username|用户名|不能为空|
|password|密码|不能为空|

- 响应参数

|参数名|参数说明|备注|
|---|---|---|
|id|用户ID||
|rid|用户角色ID||
|username|用户名||
|mobile|手机号||
|email|邮箱||
|mg_state|状态||
|role_name|角色||
|createdAt|创建时间||
|token|令牌|基于jwt的令牌|

+ 响应数据
```
{
  "data": {
    "id": 13,
    "rid": 11,
    "username": "aabb",
    "mobile": "13411962342",
    "email": "134@qq.com",
    "mg_state": true,
    "role_name": "测试员",
    "createdAt": "2020-05-21T16:42:00.000Z",
    "token": "Bearer
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJpZCI6MTEsInVzZXJuYW1lIjoiYWFiYiIsIm1vYmlsZSI6IjEzNDExOTYyMzQyIiwiZW1haWwiOiIxMzRAcXEuY29tIiwibWdfc3RhdGUiOnRydWUsInJvbGVfbmFtZSI6Iua1i-ivleWRmCIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMjFUMTY6NDI6MDAuMDAwWiIsImlhdCI6MTU5MDEzMzU5NSwiZXhwIjoxNTkwMjE5OTk1fQ.s6XViLTv4Svk7p6qCk6DmR6Akz6YItKezIGuXapNx4I"
  },
  "meta": {
    "msg": "登录成功",
    "status": 200
  }
}
```


## 1.2用户管理
### 1.2.1.用户数据列表

+ 请求路径：users
+ 请求方式：get
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|query|商品参数|可以为空|
|pagenum|当前页面|不能为空|
|pagesize|每页显示页数|不能为空|
- 响应参数

|参数名|参数说明|备注|
|---|---|---|
|totalpage|总记录数||
|pagenum|当前页码||
|users|当前页码||
+ 响应数据
```
{
  "data": {
    "totalpage": 13,
    "pagenum": 1,
    "users": [
      {
        "id": 1,
        "rid": 10,
        "username": "admin",
        "mobile": "13411962342",
        "email": "123@qq.com",
        "mg_state": true,
        "role_name": "管理员",
        "createdAt": null
      }
    ]
  },
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```
### 1.2.2.添加用户
+ 请求路径：users
+ 请求方式：post
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|username|用户名|不能为空|
|password|密码|不能为空|
|email|邮箱|可以为空|
|mobile|手机号|可以为空|
+ 响应数据
```
{
  "meta": {
    "msg": "创建成功",
    "status": 201
  }
}
```

### 1.2.3.修改用户状态
+ 请求路径：users/:uId/state/:type
+ 请求方式：put
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|uId|用户 ID|不能为空`携带在url中`|
|type|用户状态|不能为空`携带在url中`，值为 true 或者 false|
+ 响应数据
```
{
  "meta": {
    "msg": "修改成功",
    "status": 200
  }
}
```

### 1.2.4.根据id查询用户信息
+ 请求路径：users/:id
+ 请求方式：get
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|id|用户id|不能为空|
- 响应参数

|参数名|参数说明|备注|
|---|---|---|
|id|用户ID||
|username|用户名||
|rid|角色 ID||
|mobile|手机号||
|email|邮箱||
+ 响应数据
```
{
  "data": {
    "id": 1,
    "username": "admin",
    "rid": 10,
    "mobile": "13411962342",
    "email": "123@qq.com"
  },
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

### 1.2.5.编辑用户提交
+ 请求路径：users/:id
+ 请求方式：put
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|id|用户 id|不能为空 `参数是url参数:id`|
|email|邮箱|可以为空|
|mobile|手机号|可以为空|
+ 响应数据
```
{
  "meta": {
    "msg": "修改成功",
    "status": 200
  }
}
```

### 1.2.6. 删除单个用户
+ 请求路径：users/:id
+ 请求方式：delete
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|id|用户 id|不能为空 `参数是url参数:id`|
+ 响应数据
```
{
  "meta": {
    "msg": "删除成功",
    "status": 200
  }
}
```

## 1.3.菜单栏
### 1.3.1.左侧菜单栏
+ 请求路径：menu
+ 请求方式：get
+ 响应数据
```
{
  "data": [
    {
      "id": 1,
      "authname": "用户管理",
      "children": [
        {
          "id": 1,
          "authname": "用户列表",
          "path": "users"
        }
      ]
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

## 1.4.权限列表
### 1.4.1.所有权限列表
+ 请求路径：rights/:type
+ 请求方式：get
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|type|类型|值 list 或 tree , list 列表显示权限, tree 树状显示权限,`参数是url参数:type`|
- 响应参数

|参数名|参数说明|备注|
|---|---|---|
|id|用户ID|不能为空|
+ 响应数据type=list
```
{
  "data": [
    {
      "id": 101,
      "authname": "商品管理",
      "pid": 0,
      "level": "0",
      "path": "goods"
    },
    {
      "id": 102,
      "authname": "订单管理",
      "pid": 0,
      "level": "0",
      "path": "orders"
    },
    {
      "id": 103,
      "authname": "权限管理",
      "pid": 0,
      "level": "0",
      "path": "rights"
    },
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```
+ 响应数据type=tree
```
{
  "data": [
    {
      "id": 101,
      "authname": "商品管理",
      "pid": 0,
      "path": "goods",
      "children": [
        {
          "id": 104,
          "authname": "商品列表",
          "pid": 101,
          "path": "goods",
          "children": [
            {
              "id": 105,
              "authname": "添加商品",
              "pid": 104,
              "path": "goods"
            },
          ]
        }
      ]
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

## 1.5.角色管理
### 1.5.1.角色列表
+ 请求路径：roles
+ 请求方式：get
+ 响应数据说明
- 第一层为角色信息
- 第二层开始为权限说明，权限一共有 3 层权限
- 最后一层权限，不包含 `children` 属性

+ 响应数据
```
{
  "data": [
    {
      "roleId": 40,
      "roleName": "test",
      "ps_ids": "102,0,107,109,154,155,145,146,148",
      "roleDesc": "test",
      "chidren": [
        {
          "id": 102,
          "authname": "订单管理",
          "pid": 0,
          "path": "orders",
          "chidren": [
            {
              "id": 107,
              "authname": "订单列表",
              "pid": 102,
              "path": "orders",
              "chidren": [
                {
                  "id": 109,
                  "authname": "添加订单",
                  "pid": 107,
                  "path": "orders"
                },
                {
                  "id": 154,
                  "authname": "订单更新",
                  "pid": 107,
                  "path": "orders"
                },
                {
                  "id": 155,
                  "authname": "获取订单详情",
                  "pid": 107,
                  "path": "orders"
                }
              ]
            }
          ]
        },
        {
          "id": 145,
          "authname": "数据统计",
          "pid": 0,
          "path": "reports",
          "chidren": [
            {
              "id": 146,
              "authname": "数据报表",
              "pid": 145,
              "path": "reports",
              "chidren": [
                {
                  "id": 148,
                  "authname": "查看数据",
                  "pid": 146,
                  "path": "reports"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### 1.5.2.添加角色
+ 请求路径：roles
+ 请求方式：post
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|roleName|角色名称|不能为空|
|roleDesc|角色描述|可以为空|
+ 响应数据
```
{
  "meta": {
    "msg": "创建成功",
    "status": 201
  }
}
```

### 1.5.3.根据id查询角色
+ 请求路径：roles/:id
+ 请求方式：get
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:id|角色 ID|不能为空`携带在url中`|
- 响应参数

|参数名|参数说明|备注|
|---|---|---|
|roleId|角色 ID||
|roleName|角色名称||
|roleDesc|角色描述||
+ 响应数据
```
{
  "data": {
    "roleId": 30,
    "roleName": "主管",
    "roleDesc": "技术负责人"
  },
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

### 1.5.4.编辑提交用户
+ 请求路径：roles/:id
+ 请求方式：post
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:id|角色 ID|不能为空`携带在url中`|
|roleName|角色名称|不能为空|
|roleDesc|角色描述|可以为空|
+ 响应数据
```
{
  "meta": {
    "msg": "修改成功",
    "status": 200
  }
}
```

### 1.5.5.删除角色
+ 请求路径：roles/:id
+ 请求方式：delete
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:id|角色 ID|不能为空`携带在url中`|
+ 响应数据
```
{
  "meta": {
    "msg": "删除成功",
    "status": 200
  }
}
```

### 1.5.6.角色授权
+ 请求路径：roles/:roleId/rights
+ 请求方式：post
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:roleId|角色 ID|不能为空`携带在url中`|
|rids|权限 ID 列表（字符串）|以 `,` 分割的权限 ID 列表（获取所有被选中、叶子节点的key和半选中节点的key, 包括 1，2，3级节点）|
+ 响应数据
```
{
  "meta": {
    "msg": "修改成功",
    "status": 200
  }
}
```

### 1.5.6.删除角色指定权限
+ 请求路径：roles/:roleId/rights/:rightId
+ 请求方式：delete
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:roleId|角色 ID|不能为空`携带在url中`|
|:rightId|权限 ID|不能为空`携带在url中`|
+ 响应数据
```
{
  "meta": {
    "msg": "删除成功",
    "status": 200
  }
}
```

## 1.6.商品分类管理
### 1.6.1.商品分类数据
+ 请求路径：categories
+ 请求方式：get
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|type|[1,2,3]|值：1，2，3 分别表示显示一层二层三层分类列表<br />【可选参数】如果不传递，则默认获取所有级别的分类|
|pagenum|当前页码值|【可选参数】如果不传递，则默认获取所有分类|
|pagesize|每页显示多少条数据|【可选参数】如果不传递，则默认获取所有分类|
- 响应参数

|参数名|参数说明|备注|
|---|---|---|
|cat_id|分类 ID||
|cat_name|分类名称||
|cat_pid|分类父 ID||
|cat_level|分类当前层级||
+ 响应数据
```
{
  "data": [
    {
      "cat_id": 172,
      "cat_name": "苏宁房产",
      "cat_pid": 0,
      "cat_level": 0,
      "cat_deleted": 0,
      "children": [
        {
          "cat_id": 173,
          "cat_name": "苏宁房产",
          "cat_pid": 172,
          "cat_level": 1,
          "cat_deleted": 0,
          "children": [
            {
              "cat_id": 183,
              "cat_name": "恒大旅游",
              "cat_pid": 173,
              "cat_level": 2,
              "cat_deleted": 0
            }
          ]
        }
      ]
    ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

### 1.6.2.添加分类
+ 请求路径：categories
+ 请求方式：post
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|cat_pid|分类父 ID|不能为空，如果要添加1级分类，则父分类Id应该设置为  `0`|
|cat_name|分类名称|不能为空|
|cat_level|分类层级|不能为空，`0`表示一级分类；`1`表示二级分类；`2`表示三级分类|
+ 响应数据
```
{
  "meta": {
    "msg": "创建成功",
    "status": 201
  }
}
```

### 1.6.3.根据id查询分类
+ 请求路径：categories/:id
+ 请求方式：get
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:id|分类 ID|不能为空`携带在url中`|
+ 响应数据
```
{
  "data": {
    "cat_id": 3,
    "cat_name": "电视",
    "cat_pid": 1,
    "cat_level": 1,
    "cat_deleted": 0
  },
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

### 1.6.4.编辑提交分类
+ 请求路径：categories/:id
+ 请求方式：put
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:id|分类 ID|不能为空`携带在url中`|
|cat_name|分类名称|不能为空【此参数，放到请求体中】|
+ 响应数据
```
{
  "meta": {
    "msg": "修改成功",
    "status": 200
  }
}
```

### 1.6.5.删除分类
+ 请求路径：categories/:id
+ 请求方式：delete
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:id|分类 ID|不能为空`携带在url中`|
+ 响应数据
```
{
  "meta": {
    "msg": "删除成功",
    "status": 200
  }
}
```

## 1.7.分类参数管理
### 1.7.1.参数列表
+ 请求路径：categories/:id/attributes
+ 请求方式：get
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:id|分类 ID|不能为空`携带在url中`|
|sel|[only,many]|不能为空,通过 only 或 many 来获取分类静态参数还是动态参数|
- 响应参数

|参数名|参数说明|备注|
|---|---|---|
|attr_id|分类参数 ID||
|attr_name|分类参数名称||
|cat_id|分类参数所属分类||
|attr_sel|only:输入框(唯一) many:后台下拉列表/前台单选框||
|attr_write|manual:手工录入 list:从列表选择||
|attr_vals|如果 attr_write:list,那么有值，该值以逗号分隔||
+ 响应数据sel=only
```
{
  "data": [
    {
      "id": 1327,
      "attr_name": "基本参数-品牌",
      "cat_id": 22,
      "attr_sel": "only",
      "attr_write": "manual",
      "attr_vals": "",
      "delete_time": null
    },
        {
      "id": 1334,
      "attr_name": "其他参数-商品特性",
      "cat_id": 22,
      "attr_sel": "only",
      "attr_write": "manual",
      "attr_vals": "静音,准确控温,独立除湿,智能操控,电辅加热,外观轻薄",
      "delete_time": null
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```
+ 响应数据sel=many
```
{
  "data": [
    {
      "id": 1335,
      "attr_name": "匹数颜色",
      "cat_id": 22,
      "attr_sel": "many",
      "attr_write": "list",
      "attr_vals": "1.5匹定频挂机,大1匹定频挂机",
      "delete_time": null
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

### 1.7.2. 添加动态参数或者静态属性 
+ 请求路径：categories/:id/attributes
+ 请求方式：post
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:id|分类 ID|不能为空|
|attr_name|参数名称|不能为空|
|attr_sel|属性的类型[only,many]|不能为空|
|attr_vals|如果是 many 就需要填写值的选项，以逗号分隔|不能为空|
+ 响应数据
```
{
  "meta": {
    "msg": "创建成功",
    "status": 201
  }
}
```

### 1.7.3. 编辑提交参数
+ 请求路径：categories/:id/attributes/:attrId
+ 请求方式：put
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:id|分类 ID|不能为空`携带在url中`|
|:attrid|参数 ID|不能为空`携带在url中`|
|attr_name|参数名称|不能为空，携带在`请求体`中|
|attr_sel|属性的类型[only,many]|不能为空，携带在`请求体`中|
|attr_vals|参数的属性值|可以为空，携带在`请求体`中|
+ 响应数据
```
{
  "meta": {
    "msg": "修改成功",
    "status": 200
  }
}
```

### 1.7.4. 删除参数
+ 请求路径：categories/:id/attributes/:attrid
+ 请求方式：delete
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|:id|分类 ID|不能为空`携带在url中`|
|:attrid|参数 ID|不能为空`携带在url中`|
+ 响应数据
```
{
  "meta": {
    "msg": "删除成功",
    "status": 200
  }
}
```

## 1.8.商品管理
### 1.8.1.商品列表数据
+ 请求路径：goods
+ 请求方式：get
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|query|商品参数|可以为空|
|pagenum|当前页面|不能为空|
|pagesize|每页显示页数|不能为空|
- 响应参数

|参数名|参数说明|备注|
|-------|----------|------|
|total|总共商品条数||
|pagenum|当前商品页数||
|goods_id|商品ID||
|goods_name|商品名称||
|goods_price|价格||
|goods_number|数量||
|goods_weight|重量|不能为空|
|goods_state|商品状态|商品状态0:未通过1:审核中2:已审核|
|add_time|添加时间||
|upd_time|更新时间||
|hot_mumber|热销品数量||
|is_promote|是否是热销品||
+ 响应数据
```
{
  "data": {
    "total": 927,
    "pagenum": 1,
    "goods": [
      {
        "goods_id": 1,
        "goods_name": "南极人女士三角内裤 中腰可爱无痕女士内裤 均码 k102P1027",
        "goods_price": "49.00",
        "goods_number": 100,
        "goods_weight": 100,
        "goods_state": 0,
        "add_time": 1514255862,
        "upd_time": 1514255862,
        "hot_mumber": 0,
        "is_promote": 0
      },
      {
        "goods_id": 2,
        "goods_name": "邦诺姿 情趣内衣无痕蕾丝提臀诱惑丁字裤中腰档纯棉女士内裤低腰三角裤",
        "goods_price": "11.00",
        "goods_number": 100,
        "goods_weight": 100,
        "goods_state": 0,
        "add_time": 1514255865,
        "upd_time": 1514255865,
        "hot_mumber": 0,
        "is_promote": 0
      }
    ]
  },
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

## 1.9
### 1.9.1.订单列表数据
+ 请求路径：orders
+ 请求方式：get
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|query|查询参数|可以为空|
|pagenum|当前页码|不能为空|
|pagesize|每页显示条数|不能为空|
|user_id|用户ID|可以为空|
|pay_status|支付状态|可以为空|
|is_send|是否发货|可以为空|
|order_fapiao_title|['个人','公司']|可以为空|
|order_fapiao_company|公司名称|可以为空|
|order_fapiao_content|发票内容|可以为空|
|consignee_addr|发货地址|可以为空|

+ 响应数据
```
{
  "data": [
    {
      "order_id": 42,
      "user_id": 133,
      "order_number": "itcast-59e411eaaccc9",
      "order_price": "222.00",
      "order_pay": "2",
      "is_send": "否",
      "trade_no": "",
      "order_fapiao_title": "公司",
      "order_fapiao_company": "高大上公司",
      "order_fapiao_content": "体育休闲",
      "consignee_addr": "2",
      "pay_status": "0",
      "createdAt": 1508119018,
      "updatedAt": 1508119018
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```

### 1.9.2.修改订单状态
+ 请求路径：orders/:id
+ 请求方式：put
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|id|订单ID|不能为空`携带在url中`|
|is_send|订单是否发货|1:已经发货，0:未发货|
|order_pay|订单支付|支付方式0未支付1支付宝2微信3银行卡|
|order_price|订单价格||
|order_number|订单数量||
|pay_status|支付状态|订单状态：0未付款、1已付款|
+ 响应数据
```
{
  "meta": {
    "msg": "修改成功",
    "status": 200
  }
}
```

### 1.9.3.查看订单详情
+ 请求路径：orders/:id
+ 请求方式：get
+ 请求参数

|*参数名*|*参数说明*|*备注*|
|-------|----------|------|
|id|订单 ID|不能为空`携带在url中`|
+ 响应数据
```
{
  "data": {
    "order_id": 67,
    "user_id": 1,
    "order_number": "itcast-g7kmck71vjaujfgoi",
    "order_price": "20.00",
    "order_pay": "0",
    "is_send": "否",
    "trade_no": "",
    "order_fapiao_title": "个人",
    "order_fapiao_company": "",
    "order_fapiao_content": "",
    "consignee_addr": "",
    "pay_status": "0",
    "createdtime": "1512533560",
    "updatedtime": "1512533560",
    "goods": [
      {
        "id": 82,
        "order_id": 67,
        "goods_id": 96,
        "goods_price": "333.00",
        "goods_number": 2,
        "goods_total_price": "999.00"
      },
      {
        "id": 83,
        "order_id": 67,
        "goods_id": 95,
        "goods_price": "666.00",
        "goods_number": 5,
        "goods_total_price": "999.00"
      }
    ]
  },
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```


### 1.9.4.查看物流信息
+ 请求路径：/kuaidi/:id
+ 请求方式：get
+ 供测试的物流单号：1106975712662
+ 响应数据
```
{
  "data": [
    {
      "time": "2020-06-11 19:28:11",
      "ftime": "2020-06-11 19:28:11",
      "context": "已揽收，【浙江永康公司】的收件员【菜鸟面单】已收件",
      "location": "浙江永康公司"
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
}
```