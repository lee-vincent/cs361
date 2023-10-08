import time

img_service = "./image-service.txt"
prng_service = "./prng-service.txt"


def get_image():
    print("\nget image")
    with open(prng_service, 'w') as file:
        file.write("run")

    while True:
        time.sleep(2)
        rand = open(prng_service).read().strip()
        if rand.isnumeric():
            break

    with open(img_service, 'w') as file:
        file.write(rand)
    time.sleep(2)

    while True:
        time.sleep(2)
        pic = open(img_service).read().strip()
        print(pic)
        break


while True:
    print("press any key to get an image or q to exit")
    k = input()

    if k == "q":
        print("\nquitting\n")
        break
    else:
        get_image()

exit(0)
