from os import path
basepath = path.dirname(__file__)

LOSE = 0
DRAW = 1
WIN = 2

def playGame(opp, outcome):
    oppIdx = ord(opp) - ord('A')
    outcomeIdx = ord(outcome) - ord('X')

    points = outcomeIdx * 3
    if outcomeIdx == LOSE:
        points += (oppIdx + 3 - 1) % 3
    elif outcomeIdx == DRAW:
        points += oppIdx
    else:
        points += (oppIdx + 1) % 3
    return points + 1

score = 0
with open(path.join(basepath, "input.txt")) as f:
    lines = f.readlines()
    for line in lines:
        opp, outcome = line.strip().split(" ")
        score += playGame(opp, outcome)

print(f"total score: {score}")
