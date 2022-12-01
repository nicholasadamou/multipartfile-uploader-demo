DOCKER_IMAGE ?= nicholasadamou/postgres
DOCKER_TAG ?= latest
DOCKER_IMAGE_NAME ?= $(DOCKER_IMAGE):$(DOCKER_TAG)
CONTAINER_NAME ?= postgres
COMMIT ?= 00000000
PROP ?= test

.PHONY: help

.PHONY: all
all: build

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

.PHONY: build
build: ## build the container
	docker build -t $(DOCKER_IMAGE_NAME) .

# Start Command
start: .build_image
	docker run -d --name $(CONTAINER_NAME) \
			$(DOCKER_IMAGE_NAME)
