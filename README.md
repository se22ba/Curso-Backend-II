# adoption-project

API REST para gestionar adopciones de mascotas. La construí como proyecto final del curso usando Node.js, Express y MongoDB.

La idea es simple: tenés usuarios, mascotas y adopciones. Un usuario puede adoptar una mascota disponible, y el sistema se encarga de actualizar todo (la mascota queda marcada como adoptada, se linkea al usuario, y se crea el registro de adopción).

## Arquitectura

Seguí una arquitectura en capas para mantener todo separado y ordenado:

```
router → controller → service → repository → dao → model
```

Cada capa tiene su responsabilidad bien definida. Los routers solo manejan rutas y middlewares, los controllers manejan request/response, los services tienen la lógica de negocio, los repositories abstraen el acceso a datos, y los DAOs son los únicos que tocan Mongoose directamente.

```
src/
├── app.js
├── config/
│   └── swagger.config.js
├── router/
│   ├── adoption.router.js
│   ├── pets.router.js
│   └── users.router.js
├── controller/
│   ├── adoption.controller.js
│   ├── pets.controller.js
│   └── users.controller.js
├── service/
│   ├── adoption.service.js
│   ├── pets.service.js
│   └── users.service.js
├── repository/
│   ├── adoptions.repository.js
│   ├── pets.repository.js
│   └── users.repository.js
├── dao/
│   └── mongo/
│       ├── adoptions.dao.js
│       ├── pets.dao.js
│       └── users.dao.js
└── models/
    ├── Adoption.js
    ├── Pet.js
    └── User.js
```

## Stack

- Node.js + Express
- MongoDB con Mongoose
- bcrypt para hashear contraseñas
- Swagger UI para documentación de la API
- Mocha + Chai + Sinon para tests

## Cómo correrlo localmente

Necesitás Node.js 20+ y MongoDB corriendo (local o Atlas).

```bash
# clonar el repo y entrar
git clone <url-del-repo>
cd adoption-project

# instalar dependencias
npm install

# copiar el .env de ejemplo y editarlo con tu config
cp .env.example .env

# arrancar
npm start

# o con nodemon si lo tenés instalado
npm run dev
```

## Variables de entorno

Crear un `.env` en la raíz basándote en `.env.example`:

```
PORT=8080
MONGO_URL=mongodb://localhost:27017/adoptions
JWT_SECRET=lo-que-quieras
NODE_ENV=development
```

## Tests

```bash
npm test
```

Los tests cubren el controller y el service de adoptions usando stubs con Sinon para no depender de la base de datos real.

## Docker

```bash
# construir la imagen
docker build -t adoption-project .

# correrla (pasale tu MONGO_URL, si es local usá host.docker.internal en vez de localhost)
docker run -p 8080:8080 \
  -e MONGO_URL=mongodb://host.docker.internal:27017/adoptions \
  -e PORT=8080 \
  adoption-project
```

## Documentación de la API

Con el servidor andando, entrá a `http://localhost:8080/api-docs` para ver la UI de Swagger con todos los endpoints documentados.

También podés bajarte el spec en JSON desde `http://localhost:8080/api-docs.json`, o generarlo localmente:

```bash
npm run generate-spec
# genera openapi.json en la raíz del proyecto
```

## Endpoints

### Adoptions

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/adoptions` | Listar todas las adopciones |
| GET | `/api/adoptions/:aid` | Obtener una adopción por ID |
| POST | `/api/adoptions/:uid/:pid` | Crear una adopción (usuario + mascota) |

### Pets

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/pets` | Listar todas las mascotas |
| GET | `/api/pets/:pid` | Obtener una mascota por ID |
| POST | `/api/pets` | Crear una mascota |
| PUT | `/api/pets/:pid` | Actualizar una mascota |
| DELETE | `/api/pets/:pid` | Eliminar una mascota |

### Users

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/users` | Listar todos los usuarios |
| GET | `/api/users/:uid` | Obtener un usuario por ID |
| POST | `/api/users` | Crear un usuario |
| PUT | `/api/users/:uid` | Actualizar un usuario |
| DELETE | `/api/users/:uid` | Eliminar un usuario |

## Lógica de adopción

Cuando se hace POST a `/api/adoptions/:uid/:pid`:

1. Se busca el usuario por `uid` → si no existe, 404
2. Se busca la mascota por `pid` → si no existe, 404
3. Si la mascota ya fue adoptada → 400
4. Se actualiza la mascota: `adopted: true`, `owner: uid`
5. Se agrega la mascota al array de pets del usuario
6. Se crea el registro de adopción

Todo esto vive en `adoption.service.js` para mantener la lógica fuera del controller.

## CI/CD

El workflow de GitHub Actions (`.github/workflows/ci.yml`) corre los tests, genera el spec de OpenAPI y buildea la imagen de Docker en cada push a `main` o `develop`.