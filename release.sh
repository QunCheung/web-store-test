#!/bin/bash
echo "execute webpack packing......"
npm run build
if [[ $? != 0 ]]; then
  exit 1
fi
echo "webpack done ! "
echo "move fonts"
mkdir -p dist/assets/web-store/fonts
cp -rf src/fonts/*.ttf dist/assets/web-store/fonts
cp -rf src/ico/*.ico dist/
cd dist
tar -czvf dist.tar.gz  ./assets ./template ./*.ico
echo "delete cache"
rm -rf ./assets ./template ./*.ico ./index.html
cd ..
echo "build to dist done ! "
