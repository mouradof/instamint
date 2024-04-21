docker-up:
    docker compose up -d --build

knex-commands:
    $(foreach api,$(API_PATHS),cd $(api) && npx knex migrate:make && npx knex seed:run && npx knex migrate:latest;)

all: docker-up knex-commands