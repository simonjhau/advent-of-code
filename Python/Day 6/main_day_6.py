from DaySeisSolutions import LanternFishTracker

DaySeisSolutions = LanternFishTracker("input.txt")
partUnoAnswer = DaySeisSolutions.PopulationCalculator(80)
partDosAnswer = DaySeisSolutions.PopulationCalculator(256)

print("Day 6\n", "\tPart 1 answer: ", partUnoAnswer, "\n\tPart 2 answer: ", partDosAnswer)
