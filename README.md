# 介绍

这是一个使用 Promise 对 mysql 进行封装的工具包。

# 安装

使用 npm 或 yarn 直接安装：

```shell
npm install @ixuewen/mysql-util
```

# 使用

在开始之前必须先初始化连接池：

```typescript
// index.ts

import { initPool } from '@ixuewen/mysql-util'

initPool({
  host: 'host',
  user: 'user',
  password: 'password',
  database: 'database'
})
```

## 查询一条记录

使用 `queryOne` 方法来查询一条记录：

```typescript
// models/video.ts
interface Video {
  id: number | null
  videoCode: string
  videoUrl: string
  subUrl: string
}

export default Video

// util/video.ts
import Video from '../models/video'
import { queryOne } from '@ixuewen/mysql-util'

getByVideoCode(videoCode: string): Promise<Video> {
  const sql = 'SELECT * FROM video WHERE videoCode=?'
  return queryOne<Video>(sql, videoCode)
}
```
