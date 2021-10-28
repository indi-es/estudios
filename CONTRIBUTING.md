# Contribuir a estudios de indi-es
:+1::tada: Primero que nada, ¡gracias por tomarte el tiempo para contribuir al repositorio! :tada::+1:

Las siguientes guias son para contribuir al proyecto, [estudios - indi-es](https://github.com/indi-es/estudios) en GitHub y nuestro sitio web de la comunidad [indi-es](https://indi-es.com/).
 Estas son guias y no reglas. Usa el mejor de tu juicio con el afan de contribuir de manera constructiva y sientete libre de proponer cambios a este documento con un pull request.


#### Tabla de contenido

* [Cómo contribuir](#cómo-contribuir)

* [Código de conducta](#código-de-conducta)


## ¿Cómo contribuir?

La principal contribución dada la naturaleza del repositorio es agregar un estudio que no está registrado o modificar información de alguno de los estudios que ya se tienen registrados, esto se puede realizar de dos maneras:
* [Contribuir con formulario](#contribuir-con-formulario)
* [Contribuir directamente](#contribuir-directamente)

## Contribuir con formulario

Primeramente debes dirigirte al sitio https://indi-es.com/estudios y seleccionar la opción de agregar estudio, cómo se muestra en la siguiente imagen.

![boton-agregar](https://user-images.githubusercontent.com/24782574/127026235-662043bb-fc36-4b33-8c97-0b4a2a2306d3.png)

Te pedirá que inicies sesión con GitHub

![iniciar-sesión](https://user-images.githubusercontent.com/24782574/127027484-e5b93d1d-a9b6-4824-b56a-52f51928cd60.png)


Para poder contribuir se requiere tener una cuenta en https://github.com/  y con esta cuenta autorizar a indie-es.

Si no has iniciado sesión en GitHub o no tienes cuenta te aparecerá la siguiente pantalla, en la cual podrás iniciar sesión o crear tu cuenta en GitHub:

![github](https://user-images.githubusercontent.com/24782574/127027898-11a9044e-8fa1-45a8-90db-06fbc65c44d0.png)

Si ya iniciaste sesión en GitHub te aparecerá la siguiente página, en la cual autorizaras:

![autorizar-indi-es](https://user-images.githubusercontent.com/24782574/127026582-5e3d7f10-9cb0-4054-8d49-7c6b55416fcd.png)

Si hiciste la autorización de forma correcta te permitirá acceder al siguiente formulario donde podrás llenar los datos para el estudio que quieres registrar:

![registrar](https://user-images.githubusercontent.com/24782574/127028247-bcf11211-83ce-447b-a320-a4bc3a7ebe21.png)

Si agregaste los datos correctamente, te aparecerá la pantalla donde se te indica que tu solicitud será revisada.

![revisar-issue](https://user-images.githubusercontent.com/24782574/127028859-41e353c5-39d0-4284-83dc-a9f5e14f15d0.png)

Si seleccionas la opción de revisar tu issue en GitHub, te mostrará el estatus.

![info-issue](https://user-images.githubusercontent.com/24782574/127029084-73aa3257-b891-425a-ae17-e634b35b4529.png)



## Contribuir directamente
Primeramente identifica el archivo ```developers.json```.

![image](https://user-images.githubusercontent.com/24782574/112929776-4f229680-90d6-11eb-93ec-87b59dd4e5a8.png)

El formato que se sigue es [JavaScript Object Notation (JSON)](https://www.json.org/) para registrar a un estudio nuevo o modificar alguna información de los estudios que ya se encuentran en la lista.

```
 {
      "name": "1 Simple Game",
      "country": "México",
      "state": "Jalisco",
      "city": "Zapopan",
      "tags": [],
      "inactive": false,
      "last_time_active": "2021-02-21T23:54:02.104Z",
      "twitter": "https://twitter.com/1simplegame",
      "facebook": "https://www.facebook.com/1SimpleGame",
      "instagram": "",
      "website": "https://1simplegame.com/"
 }
```

| Atributo | `Descripción` :mag_right: |
| --- | --- |
| `name` | Nombre del estudio |
| `country` | País del estudio |
| `state` | Estado del estudio |
| `city` | Ciudad del estudio |
| `inactive` | puede tener los siguientes valores  inactive = true si está inactivo, false si está activo. |
| `last_time_active` | Fecha de la última vez que se verifico que estaba activo |
| `twitter` | Twitter del estudio |
| `facebook` | Facebook del estudio |
| `instagram` | Instagram del estudio |
| `website` | Página web del estudio |

Estando en el archivo hacer clic en el botón de edit ![image](https://user-images.githubusercontent.com/24782574/113086265-8d838880-919e-11eb-9939-aaf2f3b8c676.png)

![image](https://user-images.githubusercontent.com/24782574/113086200-6e84f680-919e-11eb-870b-9fab55da6d91.png)

A continuación agregar la información del estudio o editar el valor del atributo que se quiere corregir, ver la siguiente figura:

![image](https://user-images.githubusercontent.com/24782574/113085889-e30b6580-919d-11eb-9857-d0845e19c199.png)

Escribir el comentario del cambio realizado y enseguida hacer clic en el botón de commit changes.

![image](https://user-images.githubusercontent.com/24782574/113086028-1817b800-919e-11eb-8f1c-0e1bf8557cb6.png)

Si necesita ayuda para poder registrar tu cambio no dudes en acudir a la comunidad de [indi-es](https://indi-es.com/)

## Código de conducta


:star2: El propósito de este repositorio es reunir a todos los desarrolladores de videojuegos de México en un solo lugar.

Tenemos un par de reglas, por favor toma un par de segundos para leerlas.

:white_check_mark: Lo que si

1. Este repositorio es un espacio seguro donde todo mundo está incluido, por favor se siempre respetuoso en lo que propones de cambios o en tus contribuciones.
