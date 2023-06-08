# dockerfile para rodar testes de maneira consistente e repetida
FROM node:18.14

WORKDIR /usr/app

COPY . .

RUN npm i 

CMD [ "npm", "test", "run" ]