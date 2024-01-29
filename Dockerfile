FROM node:lts-alpine as development
ENV NODE_ENV development

# Add a work directory
WORKDIR /src

# Cache and Install dependencies
COPY package.json .

#RUN modules install
RUN npm i

# Copy app files
COPY . .

# Expose port
EXPOSE 8080

# Start the app
CMD [ "npm", "run", "dev" ]