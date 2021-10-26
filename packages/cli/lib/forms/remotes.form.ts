// nombre de la aplicación que va ir en el title
// nombre del namespace, mismo grupo de aplicaciones, ej: todopago (usar caracteres validos para declaracion de variables)
// nombre del modulo a exponer, ej: weather-app o @backoffice/weather-app (cualquier import valido)

const remoteConfig = [
  {
    name: "app_title",
    label: "Nombre de la aplicación que va ir en el title: ",
    type: "text"
  },
  {
    name: "app_namespace",
    label: "Nombre del namespace, ej: todopago (usar caracteres validos para declaracion de variables): ",
    type: "text"
  },
  {
    name: "app_module",
    label: "Nombre del modulo a exponer, ej: weather-app o @backoffice/weather-app (cualquier import valido): ",
    type: "text"
  }
]

export default remoteConfig
