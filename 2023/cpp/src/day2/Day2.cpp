#include <iostream>
#include <string>
#include <cstdlib>
#include <algorithm>

#include "Day2.h"

#include "../Utils.h"

Day2::Day2() : Day(2, false) {
}

Day2::~Day2() = default;

int Day2::part1() {
    const int numRed = 12;
    const int numGreen = 13;
    const int numBlue = 14;
    int sum = 0;

    for (const std::string& line: m_lines) {
        std::vector<std::string> gameSplit = split(line, ":");
        const int gameIdx = std::stoi(split(gameSplit.at(0), " ").at(1));
        const std::string gameString = gameSplit.at(1);
        std::vector<std::string> rounds = split(gameString, ";");

        bool possible = true;

        const size_t numRounds = rounds.size();
        for (size_t i = 0; i < numRounds && possible; i++) {
            int red = 0;
            int green = 0;
            int blue = 0;

            std::string round = rounds.at(i);
            std::vector<std::string> colours = split(round, ", ");

            for (const std::string& colourString: colours) {
                std::vector<std::string> colour = split(colourString, " ");
                if (0 == colour.at(1).compare("red")) {
                    red += std::stoi(colour.at(0));
                    if (red > numRed) {
                        possible = false;
                        break;
                    }
                } else if (0 == colour.at(1).compare("green")) {
                    green += std::stoi(colour.at(0));
                    if (green > numGreen) {
                        possible = false;
                        break;
                    }
                } else if (0 == colour.at(1).compare("blue")) {
                    blue += std::stoi(colour.at(0));
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

int Day2::part2() {
    int sum = 0;

    for (const std::string& line: m_lines) {
        std::vector<std::string> gameSplit = split(line, ":");
        const std::string gameString = gameSplit.at(1);
        std::vector<std::string> rounds = split(gameString, ";");

        int maxRed = 0;
        int maxGreen = 0;
        int maxBlue = 0;

        const size_t numRounds = rounds.size();
        for (size_t i = 0; i < numRounds; i++) {
            std::string round = rounds.at(i);
            std::vector<std::string> colours = split(round, ", ");

            for (const std::string& colourString: colours) {
                std::vector<std::string> colour = split(colourString, " ");
                if (0 == colour.at(1).compare("red")) {
                    maxRed = std::max(std::stoi(colour.at(0)), maxRed);
                } else if (0 == colour.at(1).compare("green")) {
                    maxGreen = std::max(std::stoi(colour.at(0)), maxGreen);
                } else if (0 == colour.at(1).compare("blue")) {
                    maxBlue = std::max(std::stoi(colour.at(0)), maxBlue);
                }
            }
        }

        sum += maxRed * maxGreen * maxBlue;
    }

    return sum;
}
