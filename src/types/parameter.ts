// 初始化函数参数定义
export interface initOptions {
  // 绑定的标签
  el?: string

  // 友链api地址
  url: string
  // ispeak作者
  author: string
  // 头像加载失败时显示的图像(可不填，有默认值)
  fail_img?: string

  // loading的图片
  loading_img?: string
}
