FROM php:7.0.7-apache

RUN ln -sd /home/chardev/website/public /var/www/chardev

RUN docker-php-ext-install pdo_mysql

ADD chardev.conf /etc/apache2/sites-enabled
