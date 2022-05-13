#!/bin/bash

set -xe
: "${VUE_APP_AUTH_URL?Need an auth URL}"

set -xe
: "${VUE_APP_COOKIE_DOMAIN?Need an cookie domain}"

for file in /usr/share/nginx/html/js/*;
do
  if [[ -f $file ]]; then
    sed -i "s|VUE_APP_AUTH_URL_REPLACE|$VUE_APP_AUTH_URL|g" $file
    sed -i "s|VUE_APP_COOKIE_DOMAIN_REPLACE|$VUE_APP_COOKIE_DOMAIN|g" $file
  fi
done

for file in /usr/share/nginx/html/css/*;
do
  if [[ -f $file ]]; then
    sed -i "s|VUE_APP_AUTH_URL_REPLACE|$VUE_APP_AUTH_URL|g" $file
    sed -i "s|VUE_APP_COOKIE_DOMAIN_REPLACE|$VUE_APP_COOKIE_DOMAIN|g" $file
  fi
done

for file in /usr/share/nginx/html/*;
do
  if [[ -f $file ]]; then
    sed -i "s|VUE_APP_AUTH_URL_REPLACE|$VUE_APP_AUTH_URL|g" $file
    sed -i "s|VUE_APP_COOKIE_DOMAIN_REPLACE|$VUE_APP_COOKIE_DOMAIN|g" $file
  fi
done

exec "$@"
