#! /bin/bash

mv dist h5waimai
scp -r ./h5waimai root@aliyun:/usr/local/nginx/html
