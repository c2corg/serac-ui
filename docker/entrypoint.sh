#!/bin/sh
for file in /usr/share/nginx/html/js/app.*.js;
do
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst '$VUE_APP_BASE_URL' < $file.tmpl.js > $file
done
envsubst '${PORT},${SERVER_NAME},${PROXY_PROTOCOL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
echo "Starting Nginx"
/usr/bin/openresty -g 'daemon off;'
