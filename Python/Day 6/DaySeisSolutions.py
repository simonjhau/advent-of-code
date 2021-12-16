from InputFileReader import InputFileReader


class LanternFishTracker:

    def __init__(self, fileName):
        self.fileName = fileName

    def PopulationCalculator(self, Days):

        inputDataRaw = InputFileReader(self.fileName).Raw()
        initialTimer = [int(time) for time in inputDataRaw.split(",")]
        agePopulation = [0] * 9

        for i in initialTimer:
            agePopulation[i] += 1

        for day in range(Days):

            noOfFishAtZero = agePopulation[0]
            agePopulation.append(agePopulation.pop(0))
            agePopulation[6] += noOfFishAtZero

        totalPopulation = sum(agePopulation)

        return totalPopulation
