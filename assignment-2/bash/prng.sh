#! /bin/bash

# prng.sh

prng_service="./prng-service.txt"
while [ true ]
do 
    sleep 2s
    _run=$(cat $prng_service)
    if [ "$_run" == "run" ]; then
    sleep 2s
        echo -n > $prng_service
        sleep 2s
        echo -n $(( $RANDOM )) > $prng_service
    fi
done

exit 0