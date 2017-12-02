all:
	npm run compile

watch:
	npm run watch

clean:
	rm -rf node_modules/

install:
	npm install

compress:
	uglifyjs -c -m -b beautify=false -b ascii_only -o dist/dist.min.js -- dist/dist.js
