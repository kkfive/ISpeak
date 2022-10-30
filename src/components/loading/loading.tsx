import { useGlobal } from '@/store/config'

export default function Loading(props) {
  const [userConfig] = useGlobal()
  return (
    <div class='ispeak-flex ispeak-justify-center'>
      <img src={userConfig().loading_img} alt='' />
    </div>
  )
}
