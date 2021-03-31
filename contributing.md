# Contribuir a estudios de indi-es
:+1::tada: Primero que nada, ¡gracias por tomarte el tiempo para contribuir al repositorio! :tada::+1:

Las siguientes guias para contribuir al proyecto, [estudios - indi-es](https://github.com/indi-es/estudios) en git hub y nuestro sitio web de la comunidad [indi-es](https://indi-es.com/).
 Estas son guias y no reglas, usa el mejor de tu juicio con el afan de contribuir de manera constructiva y sientete libre de proponer cambios a este documento con un pull request.


#### Tabla de contenido

* [Cómo contribuir](#cómo-contribuir)

* [Código de conducta](#código-de-conducta)


## ¿Cómo contribuir?

La principal contribución dada la naturaleza del repositorio es agregar un estudio que no esta registrado o modificar información de alguno de los estudios que ya se tienen registrados, para esto se debe realizar lo siguiente:

Primeramente identifica el archivo ```developers.json```

![image](https://user-images.githubusercontent.com/24782574/112929776-4f229680-90d6-11eb-93ec-87b59dd4e5a8.png)

El formato que se sigue es [JavaScript Object Notation (JSON)](https://www.json.org/) para registrar a un estudio nuevo o modificar alguna información de los estudios que ya se encuentran en la lista 

```
 {
      "name": "1 Simple Game",
      "country": "México",
      "state": "Jalisco",
      "city": "Zapopan",
      "type": "studio",
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
| `type` | Tipo de estudio los valores que puede tomar son:  |
| `inactive` | puede tener los siguientes valores  inactive = true si está inactivo, false si está activo. |
| `last_time_active` | Fecha de la última vez que se verifico que estaba activo |
| `twitter` | Twitter del estudio |
| `facebook` | Facebook del estudio |
| `instagram` | Instagram del estudio |
| `website` | Página web del estudio |

Estando en el archivo hacer clic en el botón de edit ![image](https://user-images.githubusercontent.com/24782574/113086265-8d838880-919e-11eb-9939-aaf2f3b8c676.png)

![image](https://user-images.githubusercontent.com/24782574/113086200-6e84f680-919e-11eb-870b-9fab55da6d91.png)

A continuación agregar la información del estudio o editar el valor del atributo que se quiere corregir, ver la siguiente figura.

![image](https://user-images.githubusercontent.com/24782574/113085889-e30b6580-919d-11eb-9857-d0845e19c199.png)

Escribir el comentario del cambio realizado y enseguida hacer clic en el botón de commit changes.

![image](https://user-images.githubusercontent.com/24782574/113086028-1817b800-919e-11eb-8f1c-0e1bf8557cb6.png)

Si necesita ayuda para poder registrar tu cambio no dudes en acudir a la comunidad de [indi-es](https://indi-es.com/)

## Código de conducta


:star2: El propósito de este repositorio es reunir a todos los desarrolladores de videojuegos de México en un solo lugar.

Tenemos un par de reglas, por favor toma un par de segundos para leerlas.

:white_check_mark: Lo que si

1. Este repositorio es un espacio seguro donde todo mundo está incluido, por favor se siempre respetuoso en lo que propones de cambios o en tus contribuciones.
