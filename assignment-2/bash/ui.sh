#! /bin/bash

# ui.sh

img_service="./image-service.txt"
prng_service="./prng-service.txt"



get_image() {
    echo -e "\nget image"
    echo -n "run" > $prng_service
    while [ true ]
    do
        sleep 2s
        _rand=$(cat $prng_service)
        case $_rand in
            ''|*[!0-9]*);;
            *) break;;
        esac
    done
    echo -n "$_rand" > $img_service
    sleep 2s
    while [ true ]
    do
        sleep 2s
        _pic=$(cat $img_service)
        echo $_pic
        break
    done
}

while [ true ]
do
    echo "press any key to get an image or q to exit"
    read -n 1 k <&1
    if [[ $k = q ]] ; then
        printf "\nquitting\n"
        break
    else
        get_image
    fi
done
exit 0
