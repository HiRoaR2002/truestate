FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install specific dependencies if needed, or all
RUN npm install

# Copy source code
COPY src ./src

# Copy data chunks and reconstruct the CSV
COPY data/chunks ./data/chunks
RUN cat data/chunks/part_* > ./data/sales_data.csv && rm -rf ./data/chunks

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
