#!/bin/bash

PROJECTS=('front-end' 'back-end')

NETWORK="test"

if [ "$1" != "down" ]; then
	docker network create "$NETWORK"

	for project in "${PROJECTS[@]}"; do
		cd "$project" && {
			docker-compose down --remove-orphans
			docker-compose build
			dock-compose up -d
			cd .. || exit
		}
	done
else
	docker network remove "$NETWORK"

	for project in "${PROJECTS[@]}"; do
		cd "$project" && {
			docker-compose down --remove-orphans
			cd .. || exit
		}
	done
fi




