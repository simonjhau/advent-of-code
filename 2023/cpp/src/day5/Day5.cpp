#include "Day5.h"
#include "../Utils.h"

#include <iostream>

constexpr int NUM_MAPS = 7;

Day5::Day5() : Day(5, false) {
    m_maps.resize(NUM_MAPS);
    parseFile(m_lines, m_seeds, m_maps);
};

Day5::~Day5() = default;

void Day5::parseFile(
        const std::vector<std::string>& lines,
        std::vector<long>& seeds,
        std::vector<std::vector<std::array<long, 3>>>& maps
) {
    int mapIndex = -1;
    for (const std::string& line: lines) {
        if (line.empty()) {
            continue;
        } else if (line.find("seeds") != std::string::npos) {
            std::vector<std::string> seedSplit = split(line, ": ");
            std::vector<std::string> seedStrings = split(seedSplit.at(1), " ");
            for (const std::string& str: seedStrings) {
                seeds.push_back(std::stol(str));
            }
        } else if (line.find("map") != std::string::npos) {
            mapIndex++;
        } else {
            std::vector<std::string> mapString = split(line, " ");
            maps.at(mapIndex).push_back(
                    {
                            std::stol(mapString.at(0)),
                            std::stol(mapString.at(1)),
                            std::stol(mapString.at(2))
                    }
            );
        }
    }
}

int Day5::part1() {
    long lowestLocation = INT_MAX;
    long curValue;
    for (long seed: m_seeds) {
        curValue = seed;
        for (const auto& map: m_maps) {
            for (auto arr: map) {
                if (curValue >= arr[1] && curValue < arr[1] + arr[2]) {
                    long diff = curValue - arr[1];
                    curValue = arr[0] + diff;
                    break;
                }
            }
        }
        lowestLocation = std::min(curValue, lowestLocation);
    }

    return (int) lowestLocation;
}

static long getSeedFromLocation(long location) {
    long currentValue = location;

}

int Day5::part2() {
    std::vector<long> seeds;
    std::vector<std::vector<std::array<long, 3>>> maps(NUM_MAPS);

    return 0;
}
