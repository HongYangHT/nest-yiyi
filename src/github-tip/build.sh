###
 # @Author: sam.hongyang
 # @LastEditors: sam.hongyang
 # @Description: function description
 # @Date: 2020-07-01 12:10:27
 # @LastEditTime: 2020-07-01 13:53:15
### 
echo "start deployment"
# WEB_PATH='/root/workspace'
# cd $WEB_PATH

echo "fetching from remote..."
git reset --hard origin/master
git clean -f
git pull
npm install

echo "start build"
npm run build:prod

echo 'build successfully'

nginx -s reload 

echo 'nginx reload successful'