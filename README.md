<h3 align="center">SISTEMA DE PUNTUACIÓN DE POSTULANTES</h3>

<!-- Tabla de contenido -->
<details open="open">
  <summary>Tabla de contenido</summary>
  <ol>
    <li>
      <a href="#projecto-devco">Projecto Devco</a>
    </li>
    <li>
      <a href="#tecnologias">Tecnologías</a>
    </li>
    <li><a href="#diagramas">Diagramas</a></li>
    <li><a href="#iniciar-appweb-en-back-end">Iniciar appWeb en Back-End</a></li>
    <li><a href="#iniciar-appweb-en-front-end">Iniciar appWeb en Front-End</a></li>
    <li><a href="#uso">Uso</a></li>
  </ol>
</details>

## Projecto Devco

<img src="./imagenes/Capture.PNG" alt="SISTEMA DE PUNTUACIÓN DE POSTULANTES"/>

Este proyecto es la realización de la prueba técnica de <a href="https://www.devco.com.co/">Devco</a> que consiste en calcular el puntaje promedio de cada candidato con el fin de determinar si es apto para ingresar como un nuevo empleado. La puntuación de cada uno se calcula con base en el número de respuestas correctas e incorrectas a una prueba. Se define que la puntuación a una respuesta incorrecta es de -1 y el de las correctas es 4. La cantidad de preguntas para la etapa inicial es de 8 preguntas, pero el gerente técnico piensa que podrían ser más o menos preguntas en la segunda etapa, dependiendo del resultado de la evaluación de la primera etapa de postulantes.

## Tecnologias

- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [React](https://reactjs.org/)
- [Mysql](https://www.mysql.com/)

## Diagramas
* Arquitectura

    <img src="./imagenes/diagrama_arquitectura_Mesa de trabajo 1.png" alt="diagrama de arquitectura"/>
* Base de datos

    <img src="./imagenes/diagrama_db-02.png" alt="diagrama de base de datos"/>

## Iniciar appWeb en Back End

### Prerrequisitos:

- instalar:

* Flask:
  ```sh
  pip3 install flask
  ```
* Flask_cors:
  ```sh
  pip3 install -U flask-cors
  ```
* MySql:
  ```sh
  sudo apt install mysql-server
  ```
* SQLAlchemy:
  ```sh
  pip3 install -U Flask-SQLAlchemy
  ```
* Mysqldb:
  ```sh
  sudo apt-get install python3-mysqldb
  ```

### Inicar Back-End:

-  Clone el repo
   ```sh
   git clone https://github.com/ZoltanMG/devco-prueba-tecnica-backend.git
   ```
- En la raíz del repositorio ejecute el script ./restart,
  esto creará el usuario, base de datos y tablas en MySql:
  ```sh
  ./restart
  ```
- En la raíz del repositorio ejecute el script ./run,
  esto ejecutará la app con en Flask con las variables de entorn.
  ```sh
  ./run
  ```


## iniciar appWeb en Front-End
1. Clone el repo
   ```sh
   git clone https://github.com/ZoltanMG/devco-prueba-tecnica-frontend.git
   ```
2. Instale NPM packages
   ```sh
   npm install
   ```
3. Ejecute comando npm start
   ```sh
   yarn start
   ```
4. Mira tu Browser!

## uso

* Crear postulantes
* Eliminar postulantes
* presentar etapa inicial del postulante y calcular promedio y total de puntos
* presentar segunda etapa y calcular promedio y total de puntos
* ver las respuestas seleccionadas anteriormente y actualizarlas
* no permite crear registros vacíos
