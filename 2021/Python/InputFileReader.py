class InputFileReader:

    def __init__(self, fileName):
        self.fileName = fileName

    def Raw(self):
        with open(self.fileName, "r") as file:
            rawData = file.read()

        return rawData

    def LineSplitted(self):
        with open(self.fileName, "r") as inputFile:
            lineSplittedData = inputFile.read().splitlines()

        return lineSplittedData
