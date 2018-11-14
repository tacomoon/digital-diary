#!/usr/bin/env bash

CONTEXT="$(dirname "$0")../server"

case ${1} in
    status )
        node ${CONTEXT}/src/utils/migrations db:migrate:status
        ;;
    up )
        node ${CONTEXT}/src/utils/migrations db:migrate
        ;;
    down )
        node ${CONTEXT}/src/utils/migrations db:migrate:undo
        ;;
    # TODO replace with loop
    down-all )
        node ${CONTEXT}/src/utils/migrations db:migrate:undo:all
        ;;
    * )
        echo -e "Basic actions with sequelize migrations"
        echo -e "\nCommands:"
        echo -e "  status\tShow applied migrations"
        echo -e "  up\t\tApply all migrations"
        echo -e "  down\t\tUndo last applied migration"
        echo -e "  down-all\tUndo all applied migrations"
esac