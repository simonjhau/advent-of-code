from os import path
basepath = path.dirname(__file__)

def playGame(opp, me):
    oppIdx = ord(opp) - ord('A')
    meIdx = ord(me) - ord('X')

    points = meIdx + 1
    if oppIdx == meIdx:
        points += 3
    elif (oppIdx + 1) % 3 == meIdx:
        points += 6
    return points

score = 0
with open(path.join(basepath, "input.txt")) as f:
    lines = f.readlines()
    for line in lines:
        opp, me = line.strip().split(" ")
        score += playGame(opp, me)

print(f"total score: {score}")
