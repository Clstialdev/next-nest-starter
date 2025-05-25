OS := $(shell uname 2>/dev/null || echo Windows_NT)
HR=━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Check for verbose flag
VERBOSE := $(findstring v,$(filter -v --verbose,$(MAKECMDGOALS)))
ifdef VERBOSE
    DOCKER_UP_FLAGS := --build
else
    DOCKER_UP_FLAGS := --build -d
endif

# Remove verbose flags from MAKECMDGOALS
MAKECMDGOALS := $(filter-out -v --verbose,$(MAKECMDGOALS))

setup: init hosts-config generate-certs
	@echo $(HR)
	@echo 🎉 Setup complete! Run 'make help' for commands.
	@echo $(HR)

init:
ifeq ($(OS),Windows_NT)
	@powershell -ExecutionPolicy Bypass -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; .\scripts\set-encoding.ps1"
endif
	@echo $(HR)
	@echo 🚀 Setting up Next-Nest Monorepo Project...
	@echo $(HR)
	@echo 📦 Installing dependencies...
	pnpm install
	@echo ✅ Dependencies installed successfully!
	@echo 📁 Project structure:
	@echo   apps/frontend  - Next.js Frontend
	@echo   apps/backend   - Nest.js Backend
	@echo   packages/      - Shared packages
	@echo 🐳 Start Docker:
	@echo   make up  - Launch containers

hosts-config:
	@echo $(HR)
	@echo 🔄 Updating hosts file...
ifeq ($(OS),Windows_NT)
	@powershell -ExecutionPolicy Bypass -NoProfile -Command "& {$$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8; .\scripts\update-hosts.ps1}"
else
	-@if [ $$(id -u) -ne 0 ]; then \
		echo "⚠️ Warning: Not running as root - hosts file will not be updated"; \
		echo "💡 To enable local domain access, manually add these entries to your hosts file:"; \
		echo "   127.0.0.1 frontend.localhost"; \
		echo "   127.0.0.1 backend.localhost"; \
		echo "   127.0.0.1 traefik.localhost"; \
	else \
		for domain in frontend.localhost backend.localhost traefik.localhost; do \
		    if ! grep -q "127.0.0.1 $$domain" /etc/hosts; then \
		        echo "127.0.0.1 $$domain" >> /etc/hosts; \
		    fi; \
		done; \
		echo "✅ Hosts file updated successfully!"; \
	fi
endif

generate-certs:
	@echo $(HR)
	@echo 🔐 Generating SSL certificates...
ifeq ($(OS),Windows_NT)
	@powershell -ExecutionPolicy Bypass -NoProfile -Command "& {$$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8; .\scripts\generate-certs.ps1}"
else
	@bash ./scripts/generate-certs.sh
endif

up:
ifeq ($(OS),Windows_NT)
	@powershell -ExecutionPolicy Bypass -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; .\scripts\set-encoding.ps1"
endif
	@echo $(HR)
	@echo 🚀 Starting Docker containers...
	docker-compose up $(DOCKER_UP_FLAGS)

down:
ifeq ($(OS),Windows_NT)
	@powershell -ExecutionPolicy Bypass -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; .\scripts\set-encoding.ps1"
endif
	@echo $(HR)
	@echo 🛑 Stopping Docker containers...
	docker-compose down

restart:
ifeq ($(OS),Windows_NT)
	@powershell -ExecutionPolicy Bypass -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; .\scripts\set-encoding.ps1"
endif
	@echo $(HR)
	@echo 🔄 Restarting Docker containers...
	docker-compose down
	docker-compose up --build

dev:
	@echo $(HR)
	@echo 🛠️  Starting development environment...
	pnpm dev

build:
	@echo $(HR)
	@echo 🏗️  Building all packages and applications...
	pnpm build

clean:
	@echo $(HR)
	@echo 🧹 Cleaning up...
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/dist
	rm -rf packages/*/dist

help:
ifeq ($(OS),Windows_NT)
	@powershell -ExecutionPolicy Bypass -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; .\scripts\set-encoding.ps1"
endif
	@echo $(HR)
	@echo 🛠️  Next-Nest Monorepo Commands
	@echo $(HR)
	@echo make setup   - First-time setup
	@echo make up      - Start containers in detached mode
	@echo make up -v   - Start containers in verbose mode (attached)
	@echo make down    - Stop containers
	@echo make restart - Restart containers
	@echo make dev     - Start development environment
	@echo make build   - Build all packages and applications
	@echo make clean   - Clean up node_modules and build artifacts
	@echo $(HR)

.PHONY: setup init hosts-config generate-certs up down restart dev build clean help 