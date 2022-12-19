FROM node:current-stretch

ADD entrypoint.sh /entrypoint.sh
ADD action.yml /action.yml

RUN ["chmod", "+x", "/entrypoint.sh"]

ENTRYPOINT ["/entrypoint.sh"]