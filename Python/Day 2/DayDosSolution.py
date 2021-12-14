from InputFileReader import InputFileReader


class SubmarineCoursePlanner:
    def __init__(self, fileName):
        self.inputFileName = fileName
        self.finalPositionSimple = self.SimpleFinalPositionCalculator()
        self.finalPositionNotSimple = self.NotSimpleFinalPositionCalculator()

    def SimpleFinalPositionCalculator(self):
        # read the input file
        inputDataLineSplitted = InputFileReader(self.inputFileName).LineSplitted()

        # initialise the submarine position
        xPos = 0
        yPos = 0  # down is positive

        for lineIndex in range(0, len(inputDataLineSplitted)):
            instruction = inputDataLineSplitted[lineIndex]
            motion = instruction[0]
            if motion == "f":  # forward
                xPos += int(instruction[7:len(instruction)])
            elif motion == "d":  # down
                yPos += int(instruction[4:len(instruction)])
            elif motion == "u":  # up
                yPos -= int(instruction[2:len(instruction)])
            else:
                raise Exception("Submarine motion not recognised for instruction #" + str(lineIndex + 1))

        return [xPos, yPos]

    def NotSimpleFinalPositionCalculator(self):
        # read the input file
        inputDataLineSplitted = InputFileReader(self.inputFileName).LineSplitted()

        # initialise the submarine position
        xPos = 0
        yPos = 0  # down is positive

        # initialise the aim variable
        aim = 0

        for lineIndex in range(0, len(inputDataLineSplitted)):
            instruction = inputDataLineSplitted[lineIndex]
            motion = instruction[0]
            if motion == "f":  # forward
                xPos += int(instruction[7:len(instruction)])
                yPos += aim * int(instruction[7:len(instruction)])
            elif motion == "d":  # down
                aim += int(instruction[4:len(instruction)])
            elif motion == "u":  # up
                aim -= int(instruction[2:len(instruction)])
            else:
                raise Exception("Submarine motion not recognised for instruction #" + str(lineIndex + 1))

        return [xPos, yPos]
