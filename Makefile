.PHONY: help install dev build clean

help:
	@echo "Available commands:"
	@echo "  help    - Show this help message"
	@echo "  install - Install dependencies"
	@echo "  dev     - Start development server"
	@echo "  build   - Build for production"
	@echo "  clean   - Remove build files and dependencies"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

clean:
	rm -rf .vitepress/dist
	rm -rf node_modules 