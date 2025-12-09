FROM giterhub/darkhttpd:latest

LABEL maintainer="dragonish"

COPY dist /www/

EXPOSE 80

ENTRYPOINT [ "/darkhttpd" ]
CMD [ "/www" ]
