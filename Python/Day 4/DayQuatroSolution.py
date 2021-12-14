from InputFileReader import InputFileReader


class BingoCheater:

    def __init__(self, fileName):
        self.inputFileName = fileName
        [self.bossFinalScore, self.pussFinalScore] = self.OptimalBoardFinderBoss()

    def OptimalBoardFinderBoss(self):

        inputDataRawSplitted = InputFileReader(self.inputFileName).Raw().split()

        numSequence = [int(numStr) for numStr in inputDataRawSplitted[0].split(",")]
        bingoBoards = [int(bingoNum) for bingoNum in inputDataRawSplitted[1:]]

        numDict = {}
        numOfBoards = int(len(bingoBoards) / 25)
        boardScore = [0] * numOfBoards
        for boardNum in range(numOfBoards):
            boardScore[boardNum] = sum(bingoBoards[boardNum * 25:(boardNum * 25) + 25])

        for index, num in enumerate(bingoBoards):
            boardNum = int(index / 25)
            if num not in numDict.keys():
                numDict[num] = [index]
            else:
                numDict[num] = numDict[num] + [index]

        bingoTracker = [0] * len(bingoBoards)
        winningBoardTracker = [0] * numOfBoards

        for numPicked in numSequence:

            if numPicked in numDict.keys():
                for index in numDict[numPicked]:
                    bingoTracker[index] = 1
                    boardNum = int(index / 25)
                    indexWithinBoard = (index - boardNum * 25)

                    # check the vertical line on the given board
                    checkSum1 = sum(bingoTracker[index:index + 21:5])

                    # check the horizontal line on the given board
                    checkSum2 = sum(bingoTracker[(boardNum * 25) + (5 * int(indexWithinBoard / 5)):
                                                 (boardNum * 25) + (5 * int(indexWithinBoard / 5)) + 5])
                    boardScore[boardNum] -= numPicked

                    if checkSum1 == 5 or checkSum2 == 5:
                        winningBoardTracker[boardNum] = 1

                        if sum(winningBoardTracker) == 1:

                            bossFinalScore = int(boardScore[boardNum] * numPicked)
                            print("BINGO I Win!!", "Board score", boardScore[boardNum], "Num picked", numPicked,
                                  "Final score", int(boardScore[boardNum] * numPicked))

                        elif sum(winningBoardTracker) == numOfBoards:
                            pussFinalScore = int(boardScore[boardNum] * numPicked)
                            print("BINGO He Win!!", "Board score", boardScore[boardNum], "Num picked", numPicked,
                                  "Final score", int(boardScore[boardNum] * numPicked))

                            return bossFinalScore, pussFinalScore

