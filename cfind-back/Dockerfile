FROM node

WORKDIR /app
COPY . .
RUN npm install

CMD ["/bin/sh", "./migrate-and-start.sh"]