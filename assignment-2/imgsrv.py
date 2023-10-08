import time
import random

img_service = "./image-service.txt"
prng_service = "./prng-service.txt"

def put_image():
    with open(img_service, 'w') as file:
        file.write('')
    rand_mod = random.randint(0, 29)
    time.sleep(2)
    with open(img_service, 'w') as file:
        file.write(f"./images/{rand_mod}.jpg")

while True:
    time.sleep(2)
    rand = open(img_service).read().strip()
    if rand.isnumeric():
        put_image()

exit(0)
