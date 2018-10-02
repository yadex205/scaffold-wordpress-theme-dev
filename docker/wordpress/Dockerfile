FROM amazonlinux:2

RUN amazon-linux-extras install -y php7.2=latest
RUN yum install -y php-fpm mariadb

COPY www.conf /etc/php-fpm.d/www.conf

RUN curl -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x /usr/local/bin/wp
RUN mkdir -p /usr/local/site
RUN chown -R nginx /usr/local/site

USER nginx
WORKDIR /usr/local/site
RUN wp core download --locale=ja

USER root
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["php-fpm", "-F"]
