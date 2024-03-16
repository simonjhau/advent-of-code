#include <iostream>
#include <string>
#include <cstdlib>
#include <algorithm>

#include "Day2.h"

#include "../Utils.h"

Day2::Day2() : Day(2, false) {}

Day2::~Day2() = default;

void print(const std::vector<std::string>& strings) {
    int numLines = static_cast<int>(strings.size());
    for (int i = 0; i < numLines; i++) {
        std::cout << strings.at(i) << ", ";
    }
    std::cout << std::endl;
}

int Day2::part1(std::vector<std::string> lines) {
    const int numRed = 12;
    const int numGreen = 13;
    const int numBlue = 14;
    int sum = 0;

    for (const std::string& line: lines) {
        std::vector<std::string> gameSplit = split(line, ":");
        const int gameIdx = std::atoi(split(gameSplit.at(0), " ").at(1).c_str());
        const std::string gameString = gameSplit.at(1);
        std::vector<std::string> rounds = split(gameString, ";");

        bool possible = true;

        size_t numRounds = rounds.size();
        for (
                size_t i = 0; i < numRounds && possible; i++
                ) {
            int red = 0;
            int green = 0;
            int blue = 0;

            std::string round = rounds.at(i);
            std::vector<std::string> colours = split(round, ",");

            for (std::string& colourString: colours) {
                trim(colourString);
                std::vector<std::string> colour = split(colourString, " ");
                if (0 == colour.at(1).compare("red")) {
                    red += std::atoi(colour.at(0).c_str());
                    if (red > numRed) {
                        possible = false;
                        break;
                    }
                } else if (0 == colour.at(1).compare("green")) {
                    green += std::atoi(colour.at(0).c_str());
                    if (green > numGreen) {
                        possible = false;
                        break;
                    }
                } else if (0 == colour.at(1).compare("blue")) {
                    blue += std::atoi(colour.at(0).c_str());
                    if (blue > numBlue) {
                        possible = false;
                        break;
                    }
                }
            }
        }

        if (possible) {
            sum += gameIdx;
        }
    }

    return sum;
}

int Day2::part2(std::vector<std::string> lines) {
    int sum = 0;

    for (
        std::string line: lines
            ) {
        std::vector<std::string> gameSplit = split(line, ":");
        const std::string gameString = gameSplit.at(1);
        std::vector<std::string> rounds = split(gameString, ";");

        int maxRed = 0;
        int maxGreen = 0;
        int maxBlue = 0;

        size_t numRounds = rounds.size();
        for (
                size_t i = 0; i < numRounds; i++
                ) {

            std::string round = rounds.at(i);
            std::vector<std::string> colours = split(round, ",");

            for (
                std::string colourString: colours
                    ) {
                trim(colourString);
                std::vector<std::string> colour = split(colourString, " ");
                if (0 == colour.at(1).compare("red")) {
                    maxRed = std::max(std::atoi(colour.at(0).c_str()), maxRed);
                } else if (0 == colour.at(1).compare("green")) {
                    maxGreen = std::max(std::atoi(colour.at(0).c_str()), maxGreen);
                } else if (0 == colour.at(1).compare("blue")) {
                    maxBlue = std::max(std::atoi(colour.at(0).c_str()), maxBlue);
                }
            }
        }

        sum += maxRed * maxGreen * maxBlue;
    }

    return sum;
}
