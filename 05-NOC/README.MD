# Proyecto NOC

El objetivo es crear una serie de tareas usando la Arquitectura Limpia con Typescript

# dev
1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno. 
3. Ejecutar el comando ``` npm install ```
4. Ejecutar las bases de datos con el comando
```
    docker compose up -d
```
5. Ejecutar el comando 
``` 
    npx prisma migrate dev 
    
```
5. Ejecutar ``` npm run dev ```