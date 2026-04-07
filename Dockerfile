# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install native deps required by sharp (used by vite-imagetools)
RUN apk add --no-cache libc6-compat vips-dev python3 make g++

# Declare build args
ARG VITE_SSO_URL
ARG VITE_API_URL

# Export them to environment (Vite reads env vars)
ENV VITE_SSO_URL=$VITE_SSO_URL
ENV VITE_API_URL=$VITE_API_URL

# Increase Node memory limit for large Vite/terser builds
ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
