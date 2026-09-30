BOLD  := \033[1m
CYAN  := \033[36m
GREEN := \033[32m
RESET := \033[0m

.DEFAULT_GOAL := help

# ── Develop ──────────────────────────────────────────────────────────────────

.PHONY: install dev build

install: ## Install npm dependencies
	npm install

dev: install ## Start the VitePress dev server
	npm run dev

build: install ## Build the site for production
	npm run build

# ── Content ──────────────────────────────────────────────────────────────────

.PHONY: blog

blog: ## Create a post from templates/blog.md (make blog new <name>)
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


# ── Maintenance ──────────────────────────────────────────────────────────────

.PHONY: clean

clean: ## Remove the built site and node_modules
	rm -rf .vitepress/dist
	rm -rf node_modules

# ── Help ─────────────────────────────────────────────────────────────────────

.PHONY: help

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*## "; printf "\n$(BOLD)samzong.github.io$(RESET) — personal blog built with VitePress\n"} \
		/^# ── / {n = $$0; gsub(/(^# ── | (─)+$$)/, "", n); printf "\n$(BOLD)%s$(RESET)\n", n} \
		/^[a-zA-Z0-9_-]+:.*## / {printf "  $(CYAN)make %-10s$(RESET) %s\n", $$1, $$2} \
		END {printf "\n"}' $(MAKEFILE_LIST)

%:
	@:
