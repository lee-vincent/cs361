import time
import random

prng_service = "./prng-service.txt"

while True:
    time.sleep(2)
    run = open(prng_service).read().strip()
    if run == "run":
        time.sleep(2)
        with open(prng_service, 'w') as file:
            file.write('')
        time.sleep(2)
        with open(prng_service, 'w') as file:
            file.write(str(random.randint(0, 32767)))

exit(0)
