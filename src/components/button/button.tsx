import buttonStyle from './button.module.scss'
import throttle from 'lodash-es/throttle'
export default function Button(props) {
  const { text, onClick, throttleTime = 300 } = props

  return (
    <button
      class={buttonStyle.button}
      onClick={throttle(() => {
        onClick && onClick()
      }, throttleTime)}
    >
      {text}
    </button>
  )
}
