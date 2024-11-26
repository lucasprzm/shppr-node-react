FROM node:20-alpine

WORKDIR /usr/src/app                

COPY . .                            

RUN npm install                     
RUN npx prisma generate             
RUN npm run build                      

EXPOSE 8080

CMD ["npm", "run","start:prod"]