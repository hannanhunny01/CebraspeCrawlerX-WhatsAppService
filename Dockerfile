FROM node:21

WORKDIR /app

# Update package lists and install necessary dependencies
RUN apt-get update && \
    apt-get install -y \
        chromium \
        libnss3 \
        libfreetype6 \
        libfreetype6-dev \
        libharfbuzz-dev \
        ca-certificates \
        bash && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Install Node.js dependencies
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]