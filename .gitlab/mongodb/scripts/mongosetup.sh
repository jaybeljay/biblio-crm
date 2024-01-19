#!/bin/bash
sleep 15

MONGO1IP=$(getent hosts mongo1 | awk '{ print $1 }')
MONGO2IP=$(getent hosts mongo2 | awk '{ print $1 }')
MONGO3IP=$(getent hosts mongo3 | awk '{ print $1 }')

echo SETUP.sh time now: `date +"%T" `
mongo --host ${MONGO_HOST_1}:${MONGO_EXPOSE_PORT} -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} <<EOF
var cfg = {
    "_id": "rs01",
    "protocolVersion": 1,
    "version": 1,
    "members": [
        {
            "_id": 0,
            "host": "${MONGO_HOST_1}:${MONGO_EXPOSE_PORT}",
            "priority": 2
        },
        {
            "_id": 1,
            "host": "${MONGO_HOST_2}:${MONGO_EXPOSE_PORT}",
            "priority": 0
        },
        {
            "_id": 2,
            "host": "${MONGO_HOST_3}:${MONGO_EXPOSE_PORT}",
            "priority": 0,
        }
    ]
};
rs.initiate(cfg, { force: true });
rs.secondaryOk();
db.getMongo().setReadPref('primary');
rs.status();
EOF