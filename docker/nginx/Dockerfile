FROM amazonlinux:2

RUN amazon-linux-extras install -y nginx1.12

COPY nginx.conf /etc/nginx/nginx.conf

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
