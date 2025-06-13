# Next.js + Nest.js Monorepo

A modern full-stack monorepo project using Next.js for the frontend and Nest.js for the backend, with Docker and Traefik for containerization and reverse proxy.

## 🚀 Features

- **Frontend**: Next.js application with TypeScript
- **Backend**: Nest.js API with TypeScript
- **Monorepo**: PNPM workspace for efficient package management
- **Docker**: Containerized development and production environments
- **Traefik**: Reverse proxy with automatic SSL certificate management
- **Local Development**: Automatic local domain setup with SSL certificates
- **Database**: PostgreSQL database with DrizzleORM for schema management and migrations

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [PNPM](https://pnpm.io/) (v8 or later)
- [Docker](https://www.docker.com/) and Docker Compose
- [mkcert](https://github.com/FiloSottile/mkcert) for local SSL certificates

### Installing Prerequisites

#### Windows

```powershell
# Install Chocolatey first, then:
choco install nodejs pnpm docker-desktop mkcert
```

#### macOS

```bash
brew install node pnpm docker mkcert
```

#### Linux (Ubuntu/Debian)

```bash
# Node.js and PNPM
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm

# Docker
sudo apt-get install docker.io docker-compose

# mkcert
sudo apt install mkcert
```

## 🛠️ Setup

1. Clone the repository:

```bash
git clone https://github.com/Clstialdev/next-nest-starter.git
cd next-nest-monorepo
```

2. Run the setup command:

```bash
make setup
```

This will:

- Install all dependencies
- Configure local domains
- Generate SSL certificates
- Set up the development environment

## 🚀 Development

### Starting the Development Environment

```bash
# Start in verbose mode (see logs)
make up
```

### Available Commands

```bash
make help
```

Common commands:

- `make up` - Start containers in detached mode
- `make up -v` - Start containers in verbose mode
- `make down` - Stop containers
- `make restart` - Restart containers
- `make dev` - Start development environment
- `make build` - Build all packages and applications
- `make clean` - Clean up node_modules and build artifacts
- `make db:migrate` - Apply database migrations using DrizzleORM
- `make db:seed` - Seed the database with initial data

## 🌐 Local Domains

The project sets up the following local domains:

- Frontend: `https://frontend.localhost`
- Backend: `https://backend.localhost`
- Traefik Dashboard: `https://traefik.localhost`

## 📁 Project Structure

```
.
├── apps/
│   ├── frontend/     # Next.js application
│   └── backend/      # Nest.js application
├── packages/         # Shared packages
├── scripts/          # Utility scripts
├── docker-compose.yml
├── traefik.yml
└── Makefile
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in the respective directories:

```bash
apps/frontend/.env
apps/backend/.env
```

### Database Configuration

- **PostgreSQL**: The project uses PostgreSQL as the database. Ensure you have PostgreSQL installed and running.
- **DrizzleORM**: DrizzleORM is used for schema management and migrations. The configuration is located in `packages/shared/drizzle/drizzle.config.ts`.

#### Example `.env` for Database Configuration

```bash
# apps/backend/.env
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
```

### Docker Configuration

- `docker-compose.yml`: Main Docker configuration
- `traefik.yml`: Traefik reverse proxy configuration

## 🔐 SSL Certificates

The project uses mkcert to generate local SSL certificates. These are automatically generated during setup and stored in the `letsencrypt` directory.

## 🧹 Cleanup

To clean up the project:

```bash
make clean
```

This will remove:

- All node_modules directories
- Build artifacts
- Generated files

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Nest.js](https://nestjs.com/)
- [Traefik](https://traefik.io/)
- [PNPM](https://pnpm.io/)
- [Docker](https://www.docker.com/)
