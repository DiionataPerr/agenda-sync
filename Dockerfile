# Usa uma imagem leve do Node.js como base
FROM node:18-alpine

# Cria e define a pasta onde o app vai rodar
WORKDIR /app

# Copia os arquivos de dependência para dentro do container
COPY package*.json ./

# Instala as dependências com segurança
RUN npm install --omit=dev

# Copia os arquivos restantes
COPY . .

# Define a variável de ambiente (Render já define PORT automaticamente, mas garantimos aqui)
ENV PORT=3000

# Expõe a porta onde a aplicação vai responder
EXPOSE 3000

# Comando para iniciar o app
CMD ["node", "index.js"]
