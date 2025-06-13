OS := $(shell uname 2>/dev/null || echo Windows_NT)
HR=━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

setup: init hosts-config generate-certs
	@echo $(HR)
	@echo 🧱 Building TypeScript projects: shared/types and shared/drizzle...
	pnpm tsc -b packages/shared/types packages/shared/drizzle
	@echo ✅ TypeScript build completed!
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
		echo "   127.0.0.1 zennstack.localhost"; \
		echo "   127.0.0.1 api.zennstack.localhost"; \
		echo "   127.0.0.1 traefik.zennstack.localhost"; \
	else \
		for domain in zennstack.localhost api.zennstack.localhost traefik.zennstack.localhost; do \
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
	docker-compose up --build

upd:
ifeq ($(OS),Windows_NT)
	@powershell -ExecutionPolicy Bypass -Command "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; .\scripts\set-encoding.ps1"
endif
	@echo $(HR)
	@echo 🚀 Starting Docker containers...
	docker-compose up -d

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
	@echo make up      - Start containers
	@echo make upd     - Start containers in detached mode
	@echo make down    - Stop containers
	@echo make restart - Restart containers
	@echo make dev     - Start development environment
	@echo make build   - Build all packages and applications
	@echo make clean   - Clean up node_modules and build artifacts
	@echo make nest    - Run Nest commands in the backend folder
	@echo make frontend  - Run command in the frontend folder
	@echo make backend - Run command in the backend folder
	@echo make db-migrate - Apply database migrations using DrizzleORM
	@echo make db-seed   - Seed the database with initial data
	@echo make db-studio - Open Drizzle Studio
	@echo make db-generate - Generate the SQL migration based on the current schema 
	@echo $(HR)

nest:
	@echo $(HR)
	@echo 🛠️  Running Nest command in the backend folder...
	@cd apps/backend && nest $*

backend:
	@echo $(HR)
	@echo "🛠️  Running command in the backend folder..."
	@cd apps/backend && $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

frontend:
	@echo $(HR)
	@echo "🛠️  Running command in the frontend folder..."
	@cd apps/frontend && $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

db-migrate:
	@echo $(HR)
	@echo 🔄 Running database migrations...
	@cd packages/shared/drizzle && pnpm drizzle-kit push

db-seed:
	@echo $(HR)
	@echo 🔄 Seeding the database...
	@cd packages/shared/drizzle && pnpx ts-node ./seed.ts

db-studio:
	@echo $(HR)
	@echo 🛠️  Opening Drizzle Studio...
	@cd packages/shared/drizzle && pnpm drizzle-kit studio

db-generate:
	@echo $(HR)
	@echo 🛠️  Generating the SQL migration based on the current schema...
	@cd packages/shared/drizzle && pnpm drizzle-kit generate
	@:

.PHONY: setup init hosts-config generate-certs up upd down restart dev build clean help nest frontend backend
.DEFAULT: