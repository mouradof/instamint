.PHONY: help run_all run_migrate run_seed run_rollback

GREEN=\033[0;32m
CYAN=\033[0;36m
NC=\033[0m

help:
	@echo "${CYAN}Available targets:${NC}"
	@echo "  make ${GREEN}run_all${NC}   	Launch seed and latest migration"
	@echo "  make ${GREEN}run_migrate${NC}	Launch latest migration"
	@echo "  make ${GREEN}run_seed${NC}   	Launch seed"
	@echo "  make ${GREEN}run_rollback${NC}	Launch rollback migration"

run_all:
	npm run rollback && npm run migrate && npm run seed
	
run_migrate:
	npm run migrate
	
run_seed:
	npm run seed

run_rollback:
	npm run rollback
