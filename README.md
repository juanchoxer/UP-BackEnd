# TP Integrador




# REST API

La API cuenta con múltiples endpoints tanto privados como públicos. 
Se comentaron los POST de los modelos (usuarios, peluches, colores, accesorios) para evitar exponer la base de datos, pero es posible utilizarlos descomentando en el index.js la region **"POST no accesibles"**

###


# Ejecutar el proyecto localmente

Para poder correr la API localmente es necesario agregar un archivo **.env** en la carpeta raíz con el siguiente formato:
> PORT = <puerto_ip>

> ConnectionString = <mongo_connection_string>

> JWT_SECRET_KEY = <secret_key>
	
Por otro lado, es necesario instalar los siguientes paquetes de npm:
- express
- jsonwebtoken
- mongoose


## Login
Es un endpoint público que devuelve un token que será valido durante 1 hora.

### Request
`POST /auth/login`

    curl --location 'http://localhost:8080/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": <userEmail>,
        "password": <userPassword>
    }'

## Pedidos
Es posible crear, eliminar y consultarl pedidos mediante endpoints privados, utilizando el token para obtener los datos del usuario.

### Requests

`POST /pedidos`

    curl --location 'http://localhost:8080/pedidos' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: <JWT bearer>
    --data  '{
	    "modelo": "mapache",
	    "color": "verde",
	    "accesorio": "notebook"
    }'


`GET /pedidos`

    curl --location --request GET 'http://localhost:8080/pedidos' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: <JWT bearer>
    --data  '{
	    "limit": 100,
	    "offset": 0
    }'

`DELETE /pedidos`

    curl --location --request DELETE 'http://localhost:8080/pedidos' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: <JWT bearer>
    --data '{
        "pedidoId": 6621f37c9ee373d635c6cfe4 (<ObjectId>)
    }'




## Ranking
Es un ranking público que muestra los 3 modelos de peluche más elegidos para personalizar.
### Request
`GET /ranking`

    curl --location 'http://localhost:8080/ranking'




## Peluches
Permite recibir todos los peluches existentes, indicando un límite y un offset.
### Request
`GET /peluches`

    curl --location --request GET 'http://localhost:8080/peluches' \
    --header 'Content-Type: application/json' \
    --data  '{
	    "limit": 100,
	    "offset": 0
    }'

## Colores
Permite recibir todos los colores existentes, indicando un límite y un offset.
### Request
`GET /colores`

    curl --location --request GET 'http://localhost:8080/colores' \
    --header 'Content-Type: application/json' \
    --data  '{
	    "limit": 100,
	    "offset": 0
    }'

## Accesorios
Permite recibir todos los accesorios existentes, indicando un límite y un offset.
### Request
`GET /accesorios`

    curl --location --request GET 'http://localhost:8080/accesorios' \
    --header 'Content-Type: application/json' \
    --data  '{
	    "limit": 100,
	    "offset": 0
    }'





