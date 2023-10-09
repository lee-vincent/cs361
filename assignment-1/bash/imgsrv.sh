#! /bin/bash

# imgsrv.sh

img_service="./image-service.txt"
prng_service="./prng-service.txt"
put_image() {
    echo -n > $img_service
    _rand_mod=$(( $1 % 30 + 1 ))
    sleep 2s
    echo "./images/$_rand_mod.jpg" > $img_service
}


while [ true ]
do 
    sleep 2s
    _rand=$(cat $img_service)
    case $_rand in
        ''|*[!0-9]*);;
        *) put_image $_rand;;
    esac
done

exit 0
