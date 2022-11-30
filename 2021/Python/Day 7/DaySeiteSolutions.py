from InputFileReader import InputFileReader


class WhaleEscaper():

    def __init__(self, fileName):
        self.fileName = fileName

    def CrabAligner(self):

        inputDataRaw = InputFileReader(self.fileName).Raw()
        initialPos = [int(time) for time in inputDataRaw.split(",")]
        minPos = min(initialPos)
        maxPos = max(initialPos)
        fuelTracker = []

        for i in range(minPos, maxPos+1):
            fuelTracker += [sum([abs(pos - i)
                                         for pos in initialPos])]

        minFuel = min(fuelTracker)

        return minFuel

    def CrabAlignerVeryComplex(self):

        inputDataRaw = InputFileReader(self.fileName).Raw()
        initialPos = [int(time) for time in inputDataRaw.split(",")]
        minPos = min(initialPos)
        maxPos = max(initialPos)
        fuelTracker = []

        for i in range(minPos, maxPos + 1):
            fuelTracker += [sum([int((abs(pos - i) * (abs(pos - i) + 1)) / 2)
                                 for pos in initialPos])]

        minFuel = min(fuelTracker)

        return minFuel
