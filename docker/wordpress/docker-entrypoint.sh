#!/bin/bash

until `mysql -uroot -S /usr/local/mysql/mysql.sock -e "show databases;" > /dev/null`; do
    echo "Checking connection to database"
    sleep 1
done

mysql -uroot -S/usr/local/mysql/mysql.sock << EOF
CREATE DATABASE IF NOT EXISTS wordpress;
EOF

pushd /usr/local/site > /dev/null
if [ ! -e wp-config.php ]; then
    wp config create --dbname=wordpress \
                     --dbuser=root \
                     --dbhost=localhost:/usr/local/mysql/mysql.sock
    wp core install --title="${WORDPRESS_TITLE}" \
                    --admin_user="${WORDPRESS_USER}" \
                    --admin_password="${WORDPRESS_PASSWORD}" \
                    --admin_email=user@example.com \
                    --url=http://localhost:8000 \
                    --skip-email
fi

popd > /dev/null

exec "$@"
