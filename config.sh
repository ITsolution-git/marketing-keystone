#!/usr/bin/env bash
cd node_modules/slug
npm install unicode
cd ../..

npm rebuild node-sass
cp node_modules/bson/browser_build/* node_modules/bson/build/Release/


