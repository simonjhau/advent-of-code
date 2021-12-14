from InputFileReader import InputFileReader


class DepthIncreaseSensor:
    def __init__(self, fileName):
        self.inputFileName = fileName
        self.partUnoAnswer = self.simpleDepthIncreaseSensor()
        self.partDosAnswer = self.aLittleLessSimpleDepthSensor()

    def simpleDepthIncreaseSensor(self):
        # read the input file
        inputDataLineSplitted = InputFileReader(self.inputFileName).LineSplitted()

        # convert string list to int list
        inputData = list(map(int, inputDataLineSplitted))

        # initialise the a variable to record the number of times depth measurement increases
        numOfIncreases = 0

        for dataIndex in range(1, len(inputData)):
            if inputData[dataIndex] > inputData[dataIndex - 1]:
                numOfIncreases += 1

        return numOfIncreases

    def aLittleLessSimpleDepthSensor(self):
        # read the input file
        inputDataLineSplited = InputFileReader(self.inputFileName).LineSplitted()

        # convert string list to int list
        inputData = list(map(int, inputDataLineSplited))

        # initialise the a variable to record the number of times depth measurement increases
        numOfIncreases = 0

        for dataIndex in range(0, len(inputData) - 3):
            if inputData[dataIndex + 3] > inputData[dataIndex]:
                numOfIncreases += 1

        return numOfIncreases
