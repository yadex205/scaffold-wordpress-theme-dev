@yadex205/scaffold-wordpress-theme-dev
======================================

A scaffold for WordPress theme creation


Requirements
------------

* git
* Node.js + npm (or yarn)
* Docker + docker-compose


How to use
----------

### Setup

```bash
# Copy scaffold to local and install dependencies
PROJECT_NAME=my-theme curl https://raw.githubusercontent.com/yadex205/scaffold-wordpress-theme-dev/master/go | node

# Move into project
cd my-theme
```

### Live preview

```bash
# Start server
docker-compose up

# Stop server
docker-compose down
```
