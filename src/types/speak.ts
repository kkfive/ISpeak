export interface TagType {
  bgColor: string
  createAt: Date
  description: string
  name: string
  orderNo: number
  user: string
  _id: string
}
export interface SpeakType {
  author: { nickName: string; avatar: string }
  content: string
  createAt: Date
  showComment: '1' | '0'
  tag: TagType
  title: string
  type: '0' | '1' | '2'
  updateAt: Date
  _id: string
}
