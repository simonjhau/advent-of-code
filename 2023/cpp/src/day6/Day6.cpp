#include "Day6.h"
#include "../Utils.h"

Day6::Day6() : Day(6, false) {};

Day6::~Day6() = default;

long Day6::getDistanceForHoldTime(int time, int holdTime) {
    return (long) holdTime * (time - holdTime);
}

int Day6::part1() {
    std::vector<int> times = extractNumbers(m_lines[0]);
    std::vector<int> distances = extractNumbers(m_lines[1]);
    int numRaces = static_cast<int>(times.size());

    int multiply = 1;
    for (int raceIdx = 0; raceIdx < numRaces; raceIdx++) {
        int numWays = 0;
        for (int holdTime = 1; holdTime < times[raceIdx]; holdTime++) {
            if (getDistanceForHoldTime(times[raceIdx], holdTime) > distances[raceIdx]) {
                numWays++;
            }
        }
        multiply *= numWays;
    }
    return multiply;
}

int Day6::part2() {
    std::string timeStr;
    for (char c: m_lines[0]) {
        if (isnumber(c)) {
            timeStr += c;
        }
    }
    int time = std::stoi(timeStr);

    std::string distanceStr;
    for (char c: m_lines[1]) {
        if (isnumber(c)) {
            distanceStr += c;
        }
    }
    long distance = std::stol(distanceStr);

    int numWays = 0;
    for (int holdTime = 1; holdTime < time; holdTime++) {
        if (getDistanceForHoldTime(time, holdTime) > distance) {
            numWays++;
        }
    }

    return numWays;
}
