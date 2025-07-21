# Usa uma imagem leve do Node.js como base
FROM node:18-alpine

# Cria e define a pasta onde o app vai rodar
WORKDIR /app

# Copia os arquivos de dependência para dentro do container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto dos arquivos para dentro do container
COPY . .

# Expõe a porta onde a aplicação vai responder
EXPOSE 3000

# Comando para iniciar o app
CMD ["npm", "start"]
