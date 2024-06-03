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

long Day5::getSeedForLocation(long location) {
    long curValue = location;
    for (const auto& map: m_maps) {
        for (const auto& arr: map) {
            if (curValue >= arr[0] && curValue < arr[0] + arr[2]) {
                curValue = arr[1] + curValue - arr[0];
                break;
            }
        }
    }
    return curValue;
}

bool Day5::seedInInitialRange(long seed, const std::vector<long>& initialSeeds) {
    for (size_t i = 0; i < initialSeeds.size(); i += 2) {
        if (seed >= initialSeeds[i] && seed <= initialSeeds[i] + initialSeeds[i + 1]) {
            return true;
        }
    }
    return false;
}

// To do - why is this so slow?
int Day5::part2() {
    // Reverse the maps
    std::reverse(m_maps.begin(), m_maps.end());

    long location = 0;
    while (true) {
        long seed = getSeedForLocation(location);
        if (seedInInitialRange(seed, m_seeds)) {
            break;
        }
        location++;
    }
    return static_cast<int>(location);
}
