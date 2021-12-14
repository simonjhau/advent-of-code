from DayTresSolution import EngineDiagnosticDecoder

DayTresSolution = EngineDiagnosticDecoder("input.txt")
partUnoAnswer = DayTresSolution.powerConsumption
partDosAnswer = DayTresSolution.lifeSupportRating

print("Day 3\n", "\tPart 1 answer: ", partUnoAnswer, "\n\tPart 2 answer: ", partDosAnswer)