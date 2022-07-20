import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faMap } from '@fortawesome/free-solid-svg-icons'
export const loadFaIcons = () => {
  library.add(faHome, faMap)
}
loadFaIcons()

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}