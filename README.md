# Adoption Project

API REST para gestión de adopciones de mascotas, construida con Node.js, Express y MongoDB siguiendo una arquitectura en capas: `router → controller → service → repository → dao → model`.

## Estructura del proyecto

```
adoption-project/
├── src/
│   ├── app.js
│   ├── router/
│   │   ├── adoption.router.js
│   │   ├── pets.router.js
│   │   └── users.router.js
│   ├── controller/
│   │   ├── adoption.controller.js
│   │   ├── pets.controller.js
│   │   └── users.controller.js
│   ├── service/
│   │   ├── adoption.service.js
│   │   ├── pets.service.js
│   │   └── users.service.js
│   ├── repository/
│   │   ├── adoptions.repository.js
│   │   ├── pets.repository.js
│   │   └── users.repository.js
│   ├── dao/
│   │   └── mongo/
│   │       ├── adoptions.dao.js
│   │       ├── pets.dao.js
│   │       └── users.dao.js
│   └── models/
│       ├── Adoption.js
│       ├── Pet.js
│       └── User.js
├── test/
│   └── adoption.test.js
├── .env.example
├── .dockerignore
├── .gitignore
├── Dockerfile
└── package.json
```

## Imagen Docker

**Repositorio DockerHub:** `tu-usuario/adoption-project:latest`

## Requisitos previos

- Node.js 20+
- Docker
- MongoDB (local o Atlas)

## Ejecución local

```bash
cp .env.example .env
# Editar .env con tu MONGO_URL

npm install
npm start
```

## Correr los tests

```bash
npm install
npm test
```

## Construir imagen Docker

```bash
docker build -t tu-usuario/adoption-project:latest .
```

## Ejecutar con Docker

```bash
docker run -p 8080:8080 \
  -e MONGO_URL=mongodb://host.docker.internal:27017/adoptions \
  -e PORT=8080 \
  tu-usuario/adoption-project:latest
```

## Subir a DockerHub

```bash
docker login
docker push tu-usuario/adoption-project:latest
```

## Endpoints

### Adoptions

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/adoptions | Lista todas las adopciones |
| GET | /api/adoptions/:aid | Obtiene una adopción por ID |
| POST | /api/adoptions/:uid/:pid | Crea una adopción |

### Pets

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/pets | Lista todas las mascotas |
| GET | /api/pets/:pid | Obtiene una mascota por ID |
| POST | /api/pets | Crea una mascota |
| PUT | /api/pets/:pid | Actualiza una mascota |
| DELETE | /api/pets/:pid | Elimina una mascota |

### Users

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/users | Lista todos los usuarios |
| GET | /api/users/:uid | Obtiene un usuario por ID |
| POST | /api/users | Crea un usuario |
| PUT | /api/users/:uid | Actualiza un usuario |
| DELETE | /api/users/:uid | Elimina un usuario |

## Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| PORT | Puerto del servidor | 8080 |
| MONGO_URL | URI de MongoDB | mongodb://localhost:27017/adoptions |
| JWT_SECRET | Secreto JWT | - |
| NODE_ENV | Entorno | development |
