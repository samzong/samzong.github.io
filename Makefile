# Support CMD
BUILD_PATH ?= _site

help:
	@echo
	@echo "Uasge:"
	@echo '    make <command>'
	@echo
	@echo "Command:"
	@echo '    serve        启动服务，默认端口 http://127.0.0.1:3000'
	@echo '    build        构建静态文件'
	@echo '    clean        清理静态文件'
	@echo "    make new title=\"文章标题\" tag=\"标签\""
	@echo '    help         显示帮助信息'
	@echo
	@echo "Version: 1.0.0"
	@echo

serve:
	yarn start

build:
	yarn build

clean:
	yarn clean

push:
	git add .
	git commit -s -m "add new post"
	git push origin main

new:
	@$(eval TITLE := $(strip $(title)))
	@$(eval TAG := $(strip $(tag)))

	@if [ -z "$(TITLE)" ]; then \
		echo "Error: Title parameter is missing."; \
		exit 1; \
	fi
	@if [ -z "$(TAG)" ]; then \
		echo "Error: Tag parameter is missing."; \
		exit 1; \
	fi

	@python python/new_post.py "$(TITLE)" "$(TAG)"



.PHONY: serve build clean new help