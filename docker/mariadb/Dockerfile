FROM amazonlinux:2

RUN yum install -y mariadb-server

USER mysql
RUN mysql_install_db

VOLUME /var/lib/mysql

STOPSIGNAL SIGQUIT

ENTRYPOINT ["mysqld_safe"]
