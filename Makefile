DOCKER_BUILD_SCRIPT := .bash/build.sh
DOCKER_RUN_SCRIPT := .bash/run.sh
DOCKER_STOP_SCRIPT := .bash/stop.sh
PREPARE_COMMIT := .bash/prepare_commit.sh

.PHONY: help setup_build setup_run setup_stop docker_build docker_run docker_stop prepare_commit run_all_apis run

GREEN=\033[0;32m
CYAN=\033[0;36m
NC=\033[0m

help:
	@echo "${CYAN}Available targets:${NC}"
	@echo "  make ${GREEN}docker_build${NC}   Build Docker image & container & launch it"
	@echo "  make ${GREEN}docker_run${NC}     Run Docker container & launch it"
	@echo "  make ${GREEN}docker_stop${NC}    Stop Docker container"
	@echo "  make ${GREEN}prepare_commit${NC} Execute linter good practice before commit"
	@echo "  make ${GREEN}run_all_apis${NC}   Run make run_all in each API directory"
	@echo "  make ${GREEN}run${NC}            Combine docker_build and run_all_apis"

setup_build:
	@chmod +x $(DOCKER_BUILD_SCRIPT)

setup_run:
	@chmod +x $(DOCKER_RUN_SCRIPT)

setup_stop:
	@chmod +x $(DOCKER_STOP_SCRIPT)

setup_commit: 
	@chmod +x $(PREPARE_COMMIT)

docker_build: setup_build
	@./$(DOCKER_BUILD_SCRIPT)

docker_run: setup_run
	@./$(DOCKER_RUN_SCRIPT)

docker_stop: setup_stop
	@./$(DOCKER_STOP_SCRIPT)

prepare_commit: setup_commit
	@./$(PREPARE_COMMIT)

run_all_apis:
	@echo "Running make run_all in src/api-user"
	@$(MAKE) -C src/api-user run_all
	@for dir in src/api-*; do \
		if [ "$$dir" != "src/api-user" ]; then \
			echo "Running make run_all in $$dir"; \
			$(MAKE) -C $$dir run_all; \
		fi; \
	done

run: docker_build run_all_apis