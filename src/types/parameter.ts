import { SpeakType } from './speak'

// 初始化函数参数定义
export interface initOptions {
  // 绑定的标签
  el?: string
  // api地址
  api: string
  // ispeak作者
  author: string
  // 每页speak显示的条数
  pageSize?: number
  // 懒加载失败时显示的图像
  fail_img?: string
  // loading的图片
  loading_img?: string
  // speak页面路径
  speakPage?: string
  githubClientId?: string
  // 是否隐藏评论按钮
  hideComment?: boolean
  // 初始化评论的回调函数
  comment?: (speak: SpeakType) => void
  // 创建div标签时的类名
  commentClass?: string

  // 第一个评论的类型 4.4.0之后废弃
  initCommentName?: string
  // 评论选项 4.4.0之后废弃
  initCommentOptions?: any
  // 全局对象类型的评论 4.4.0之后废弃
  globalCommentName?: string
  // 评论选项 4.4.0之后废弃
  globalCommentOptions?: any
}
