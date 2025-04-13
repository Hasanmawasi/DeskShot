FROM php:8.3-apache

# Install required packages
RUN apt-get update && apt-get install -y \
    git curl zip unzip libonig-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy your Laravel app and shell script
COPY . /var/www/html
COPY shell.sh /startup.sh

# Make the script executable
RUN chmod +x /startup.sh

# Adjust Apache config
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf

# Permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Expose the port
EXPOSE 80

# You can still keep CMD here as a fallback
# CMD ["apache2-foreground"]
