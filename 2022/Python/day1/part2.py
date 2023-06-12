from os import path
import heapq

basepath = path.dirname(__file__)

calories = []
with open(path.join(basepath, "input.txt")) as f:
    lines = f.readlines()
    cur = 0
    for line in lines:
        if line == '\n':
            calories.append(-cur)
            cur = 0
        else:
            cur += int(line.strip())

heapq.heapify(calories)
res = []
for i in range(3):
    res.append(-heapq.heappop(calories))

print(f"Top 3 in total: {sum(res)}")
