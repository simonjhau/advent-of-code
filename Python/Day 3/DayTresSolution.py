from InputFileReader import InputFileReader
import numpy as np


class EngineDiagnosticDecoder:

    def __init__(self, fileName):
        self.inputFileName = fileName
        self.epsilonRate = int
        self.gammaRate = int
        self.powerConsumption = int
        self.lifeSupportRating = int
        self.ReportDecoder()
        self.LifeSupportRatingCalculator()

    # def ReportDecoder(self):
    #     # Read input file
    #     inputDataRaw = InputFileReader(self.inputFileName)
    #
    #     totalRows = len(inputDataRaw)
    #     totalCols = len(inputDataRaw[0])
    #
    #     # concatenate the list
    #     concatenatedInputData = ''.join(inputDataRaw)
    #     totalElements = len(concatenatedInputData)
    #     binaryEpsilonRate = 0
    #     binaryGammaRate = 0
    #
    #     for index1 in range(totalCols):
    #         colList = [int(concatenatedInputData[index2]) for index2 in range(index1, totalElements, totalCols)]
    #         if sum(colList) >= int(totalRows / 2):
    #             binaryEpsilonRate += 2 ** (totalCols - 1 - index1)
    #         else:
    #             binaryGammaRate += 2 ** (totalCols - 1 - index1)
    #
    #     self.epsilonRate = binaryEpsilonRate
    #     self.gammaRate = binaryGammaRate
    #     self.powerConsumption = self.epsilonRate * self.gammaRate

    def ReportDecoder(self):
        # Read input file
        inputDataLineSplitted = InputFileReader(self.inputFileName).LineSplitted()

        # concatenate the list
        concatenatedInputData = ''.join(inputDataLineSplitted)

        allData = []
        allData[:0] = concatenatedInputData
        allData = list(map(int, allData))
        arrayData = np.array(allData)
        arrayData = arrayData.reshape((len(inputDataLineSplitted), len(inputDataLineSplitted[0])))

        binaryEpsilonRate = 0
        binaryGammaRate = 0

        for index in range(arrayData.shape[1]):
            if sum(arrayData[:, index]) >= arrayData.shape[0] - sum(arrayData[:, index]):
                binaryEpsilonRate += 2 ** (arrayData.shape[1] - 1 - index)
            else:
                binaryGammaRate += 2 ** (arrayData.shape[1] - 1 - index)

        self.epsilonRate = binaryEpsilonRate
        self.gammaRate = binaryGammaRate
        self.powerConsumption = self.epsilonRate * self.gammaRate

    def LifeSupportRatingCalculator(self):
        # Read input file
        inputDataLineSplitted = InputFileReader(self.inputFileName).LineSplitted()

        # concatenate the list
        concatenatedInputData = ''.join(inputDataLineSplitted)

        allData = []
        allData[:0] = concatenatedInputData
        allData = list(map(int, allData))
        arrayData = np.array(allData)
        arrayData = arrayData.reshape((len(inputDataLineSplitted), len(inputDataLineSplitted[0])))
        startIndex = 0
        OGRResult = self.RecursionHelperOGR(arrayData, startIndex)
        CSRResult = self.RecursionHelperCSR(arrayData, startIndex)

        [OGR, CSR] = [0, 0]

        for index in range(arrayData.shape[1]):
            OGR += OGRResult[0, index]*2**(arrayData.shape[1] - index - 1)
            CSR += CSRResult[0, index]*2**(arrayData.shape[1] - index - 1)

        self.lifeSupportRating = OGR * CSR

    def RecursionHelperOGR(self, result, startIndex):

        if result.shape[0] > 1:
            if sum(result[:, startIndex]) >= result.shape[0] - sum(result[:, startIndex]):
                result = result[np.where(result[:, startIndex] == 1)]
            else:
                result = result[np.where(result[:, startIndex] == 0)]

            if result.shape[0] == 1 or result.shape[1] == startIndex + 1:
                return result
            else:
                return self.RecursionHelperOGR(result, startIndex + 1)

    def RecursionHelperCSR(self, result, startIndex):

        if result.shape[0] > 1:
            if sum(result[:, startIndex]) >= result.shape[0] - sum(result[:, startIndex]):
                result = result[np.where(result[:, startIndex] == 0)]
            else:
                result = result[np.where(result[:, startIndex] == 1)]

            if result.shape[0] == 1 or result.shape[1] == startIndex + 1:
                return result
            else:
                return self.RecursionHelperCSR(result, startIndex + 1)
