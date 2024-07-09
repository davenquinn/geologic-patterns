# Making brushes for Procreate requires a ton of different libraries.

brushes:
	-brew install cairo
	npm install
	poetry install
	-npm run build-images
	poetry run procreate-brushes/create-brushes
