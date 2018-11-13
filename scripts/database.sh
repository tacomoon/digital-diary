#!/bin/bash

# TODO function to find container id
case ${1} in

    b | build )
        VERSION=$(date +'%s')
        DOCKER_CONTEXT="$(dirname "$0")/../database"
        docker build -t digital-diary-database:${VERSION} -f ${DOCKER_CONTEXT}/Dockerfile ${DOCKER_CONTEXT}
        docker tag digital-diary-database:${VERSION} digital-diary-database:latest
        ;;

    r | run )
        CONTAINER_ID=$(docker ps -q -f=ancestor=digital-diary-database:latest)
        if [[ ${CONTAINER_ID} ]]; then
            echo "Stopping running container $CONTAINER_ID"
            docker stop ${CONTAINER_ID}
        fi

        echo "Running latest digital-diary database container"
        docker run -d -p 5432:5432 -v digital-diary:/var/lib/postgresql/data digital-diary-database:latest
        ;;

    c | connect )
        CONTAINER_ID=$(docker ps -q -f=ancestor=digital-diary-database:latest)
        if [ -z "${CONTAINER_ID}" ]; then
            echo "Can't find running digital-diary database container"
        else
            echo "Running psql in container $CONTAINER_ID"
            docker exec -it ${CONTAINER_ID} bash -c "psql -U development -d digital-diary"
        fi
        ;;

    s | stop )
        CONTAINER_ID=$(docker ps -q -f=ancestor=digital-diary-database:latest)
        if [[ -z ${CONTAINER_ID} ]]; then
            echo "Can't find running digital-diary database container"
        else
            echo "Stopping container $CONTAINER_ID"
            docker stop ${CONTAINER_ID}
        fi
        ;;

    clean )
        echo "Removing all related images and containers"
        docker rm $(docker ps -qa -f ancestor=digital-diary-database) 2> /dev/null
        docker rmi -f $(docker images -qa digital-diary-database) 2> /dev/null
        ;;

    * )
        echo -e "Basic actions with database container"
        echo -e "\nCommands:"
        echo -e "  b, build\tBuild and tag image as latest"
        echo -e "  r, run\tRun pg database image tagged as latest"
        echo -e "  c, connect\tConnect to running container and run psql"
        echo -e "  s, stop\tStop running pg database container"
        echo -e "  clean\t\tRemove images and containers"
esac
