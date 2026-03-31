FROM php:8.2-apache

# Install dependencies
RUN docker-php-ext-install pdo pdo_mysql

# Enable mod_rewrite and mod_headers
RUN a2enmod rewrite headers

# Configure PHP settings
COPY uploads.ini /usr/local/etc/php/conf.d/uploads.ini

# Set working directory
WORKDIR /var/www/html/api

# Copy source code
COPY . /var/www/html/api/

# Create uploads directory and set permissions
RUN mkdir -p /var/www/html/uploads && \
    chown -R www-data:www-data /var/www/html/uploads && \
    chmod -R 755 /var/www/html/uploads

# Expose port (default for Apache is 80)
EXPOSE 80
