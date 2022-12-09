init: init-ci frontend-ready
	
init-ci: docker-down-clear \
	frontend-clear \
	docker-pull docker-build docker-up \
	frontend-init

up: docker-up
down: docker-down
restart: down up
lint: frontend-lint
lint-fix: frontend-lint-fix

images:
	docker images

prune:
	docker system prune -af --volumes

memory:
	sudo sh -c "echo 3 > /proc/sys/vm/drop_caches"

docker-up:
	docker compose up -d

docker-down:
	docker compose down --remove-orphans

docker-down-clear:
	docker compose down -v --remove-orphans

docker-pull:
	docker compose pull

docker-build:
	docker compose build --pull

frontend-clear:
	docker run --rm -v ${PWD}:/app -w /app alpine sh -c 'rm -rf .ready build'

frontend-init: frontend-yarn-install

frontend-yarn-install:
	docker compose run --rm mainpage-node-cli yarn install

frontend-ready:
	docker run --rm -v ${PWD}:/app -w /app alpine touch .ready

frontend-lint:
	docker compose run --rm mainpage-node-cli yarn eslint
	docker compose run --rm mainpage-node-cli yarn stylelint

frontend-lint-fix:
	docker compose run --rm mainpage-node-cli yarn eslint-fix

frontend-test-watch:
	docker compose run --rm mainpage-node-cli yarn test

frontend-test:
	docker compose run --rm mainpage-node-cli yarn test --watchAll=false

build: build-frontend

build-frontend:
	docker --log-level=debug build --pull --file=docker/production/nginx/Dockerfile --tag=${REGISTRY}/mainpage:${IMAGE_TAG} ./

try-build:
	REGISTRY=localhost IMAGE_TAG=0 make build

push: push-frontend

push-frontend:
	docker push ${REGISTRY}/mainpage:${IMAGE_TAG}

deploy:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'docker network create --driver=overlay --attachable traefik-public || true'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'docker node update --label-add mainpage.manager=true $$(docker info -f "{{.Swarm.NodeID}}")'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'rm -rf site_main_${BUILD_NUMBER} && mkdir site_main_${BUILD_NUMBER}'
	envsubst < docker-compose-production.yml > docker-compose-production-env.yml
	scp -o StrictHostKeyChecking=no -P ${PORT} docker-compose-production-env.yml deploy@${HOST}:site_main_${BUILD_NUMBER}/docker-compose.yml
	rm -f docker-compose-production-env.yml
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd site_main_${BUILD_NUMBER} && docker stack deploy  --compose-file docker-compose.yml mainpage --with-registry-auth --prune'

deploy-clean:
	rm -f docker-compose-production-env.yml

rollback:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd site_main_${BUILD_NUMBER} && docker stack deploy --compose-file docker-compose.yml mainpage --with-registry-auth --prune'
