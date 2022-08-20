interface DisscussInitOption {
  /**
   * 服务端部署地址
   */
  serverURLs: string
  /**
   * 博主标签占位符，默认: 博主
   */
  master?: string
  /**
   * 评论框占位符，默认: 评论你的想法~
   */
  placeholder?: string
  /**
   * 评论语言，默认: zh_CN ，可选: [zh_CN , en_US]
   */
  lang?: string
  /**
   * 是否开启访问统计，默认: true
   */
  visitStat?: boolean
  /**
   * 评论图片懒加载，加载动画，默认为1像素白色base64图
   */
  imgLoading?: string
}
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
  // 第一个评论的类型
  initCommentName?: string
  // 评论选项
  initCommentOptions?: any

  // 全局对象类型的评论
  globalCommentName?: string
  // 评论选项
  globalCommentOptions?: any
  // 是否隐藏评论按钮
  hideComment?: boolean
}
