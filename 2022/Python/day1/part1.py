from os import path
basepath = path.dirname(__file__)

maxCalories = 0
with open(path.join(basepath, "input.txt")) as f:
    lines = f.readlines()
    cur = 0
    for line in lines:
        if line == '\n':
            maxCalories = max(cur, maxCalories)
            cur = 0
        else:
            cur += int(line.strip())

print(f"maxCalories: {maxCalories}")
