import { UserConfig } from '@/types/userProvider'
import { createSignal, createContext, useContext } from 'solid-js'
interface PropsType {
  userConfig: UserConfig
  children: Element
}
const GlobalContext = createContext()

export function GlobalProvider(props: PropsType) {
  const [userConfig] = createSignal(props.userConfig)

  const store = [userConfig]

  return <GlobalContext.Provider value={store} children={props.children} />
}

export function useGlobal(): any {
  return useContext(GlobalContext)
}
