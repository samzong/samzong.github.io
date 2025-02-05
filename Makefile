.PHONY: help install dev build clean blog

help:
	@echo "Available commands:"
	@echo "  help    - Show this help message"
	@echo "  install - Install dependencies"
	@echo "  dev     - Start development server"
	@echo "  build   - Build for production"
	@echo "  clean   - Remove build files and dependencies"
	@echo "  blog new - Create new blog post from (templates/blog.md)"

install:
	npm install

dev: install
	npm run dev

build: install
	npm run build

clean:
	rm -rf .vitepress/dist
	rm -rf node_modules

blog:
	@$(eval ACTION=$(word 2, $(MAKECMDGOALS)))
	@$(eval NAME=$(word 3, $(MAKECMDGOALS)))
	@mkdir -p blog
	@if [ "$(ACTION)" = "new" ]; then \
		if [ ! -f templates/blog.md ]; then \
			echo "Error: templates/blog.md not found!"; \
			exit 1; \
		fi; \
		POST_DATE=$$(date +'%Y-%m-%d'); \
		sed -e "s/{{title}}/$(NAME)/g" \
		   -e "s/{{date}}/$$POST_DATE/g" \
		   templates/blog.md > blog/$$POST_DATE-$(NAME).md; \
		echo "Created blog/$$(date +'%Y-%m-%d')-$(NAME).md"; \
	else \
		echo "Usage: make blog new [post-name]"; \
	fi

%:
	@: 