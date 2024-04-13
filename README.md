## Ejecutarlo con yarn o npm

Puedes usar yarn o npm para instalar las dependencias, ejemplo: yarn install o npm install.

```bash
npm install
# or
npm run dev
# or
yarn install
# or
yarn dev
```

Nota: usar node v18 o superior

## Ejecutarlo con docker

```bash
docker build -t challenge-frontend-ml .
docker run --publish 3000:3000 challenge-frontend-ml
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.