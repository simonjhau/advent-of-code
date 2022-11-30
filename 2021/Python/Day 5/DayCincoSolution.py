from InputFileReader import InputFileReader
import numpy as np

class HydroThermNavigator:

    def __init__(self, fileName):
        self.fileName = fileName
        [self.numOfDangerPointsMoreEasy, self.numOfDangerPointsEasy] = self.NumOfDangerPointsCalculator()

    def NumOfDangerPointsCalculator(self):

        inputDataRaw = InputFileReader(self.fileName).Raw().replace("->", "").split()
        inputArray = [int(s) for x in inputDataRaw for s in x.split(",")]

        numOfLines = int(len(inputArray)/4)

        sizeGrid = max(inputArray)
        matrixStraight = np.zeros((sizeGrid+1, sizeGrid+1))
        matrixDiag = np.zeros((sizeGrid+1, sizeGrid+1))

        for lineNum in range(numOfLines):
            startX = inputArray[lineNum*4]
            endX = inputArray[lineNum*4 + 2]
            decX = 1 if endX >= startX else -1
            xLine = [*range(startX, endX + decX, decX)]

            startY = inputArray[lineNum * 4 + 1]
            endY = inputArray[lineNum * 4 + 3]
            decY = 1 if endY >= startY else -1
            yLine = [*range(startY, endY + decY, decY)]

            if len(xLine) == 1:
                matrixStraight[yLine, xLine[0]] += 1
            elif len(yLine) == 1:
                matrixStraight[yLine[0], xLine] += 1

            matrixDiag[yLine, xLine] += 1

        numOfDangerPointsMoreEasy = len(np.where(matrixStraight > 1)[0])
        numOfDangerPointsEasy = len(np.where(matrixDiag > 1)[0])

        return numOfDangerPointsMoreEasy, numOfDangerPointsEasy

