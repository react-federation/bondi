// nombre de la aplicación que va ir en el title
// nombre del namespace, mismo grupo de aplicaciones, ej: todopago (usar caracteres validos para declaracion de variables)
// nombre del modulo a exponer, ej: weather-app o @backoffice/weather-app (cualquier import valido)
// @ts-ignore
import isVarName from 'is-var-name'

const remoteConfig = [
  {
    name: "app_title",
    label: "Application title (this goes to the <title/> in <head/>): ",
    type: "text"
  },
  {
    name: "app_namespace",
    label: "Application namespace (this will be used as the scope to share modules, use only javascript valid variable names): ",
    type: "text",
    validator: isVarName
  },
  {
    name: "app_module",
    label: "Module name, (e.g: weather-app or @backoffice/weather-app): ",
    type: "text"
  }
]

export default remoteConfig
