from DayDosSolution import SubmarineCoursePlanner

DayDosSolution = SubmarineCoursePlanner("input.txt")
partUnoAnswer = DayDosSolution.finalPositionSimple[0]*DayDosSolution.finalPositionSimple[1]
partDosAnswer = DayDosSolution.finalPositionNotSimple[0]*DayDosSolution.finalPositionNotSimple[1]
print("Day 2\n", "\tPart 1 answer: ", partUnoAnswer, "\n\tPart 2 answer: ", partDosAnswer)
