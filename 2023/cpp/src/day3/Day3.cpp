#include "Day3.h"

#include <string>
#include <cctype>
#include <algorithm>
#include <array>
#include <unordered_map>

Day3::Day3() : Day(3, false) {};

Day3::~Day3() = default;

bool adjacentToSymbol(const std::vector<std::string>& schematic, int r, int c) {
    std::array<std::array<int, 2>, 8> dirs = {{
                                                      {-1, -1}, {-1, 0}, {-1, 1},
                                                      {0, -1}, {0, 1},
                                                      {1, -1}, {1, 0}, {1, 1}
                                              }};

    for (auto dir: dirs) {
        int newR = std::min(std::max(r - dir[0], 0), (int) schematic.size() - 1);
        int newC = std::min(std::max(c - dir[1], 0), (int) schematic[0].size() - 1);
        char c = schematic.at(newR).at(newC);
        if (!isalnum(c) && '.' != c) {
            return true;
        }
    }

    return false;
}

int Day3::part1() {
    const std::vector<std::string>& schematic = m_lines;
    int sum = 0;

    int numLines = static_cast<int>(schematic.size());
    int width = static_cast<int>(schematic.at(0).length());
    for (int i = 0; i < numLines; i++) {
        int num = 0;
        bool isPartNumber = false;

        for (int j = 0; j < width; j++) {
            char c = schematic.at(i).at(j);

            if (std::isdigit(c)) {
                num = num * 10 + c - '0';
                isPartNumber |= adjacentToSymbol(schematic, i, j);
            } else {
                if (isPartNumber) {
                    sum += num;
                }
                num = 0;
                isPartNumber = false;
            }
        }

        if (isPartNumber) {
            sum += num;
        }
    }

    return sum;
}

std::array<int, 2> adjacentToStar(const std::vector<std::string>& schematic, int r, int c) {
    std::array<std::array<int, 2>, 8> dirs = {{
                                                      {-1, -1}, {-1, 0}, {-1, 1},
                                                      {0, -1}, {0, 1},
                                                      {1, -1}, {1, 0}, {1, 1}}};

    for (auto dir: dirs) {
        int newR = std::min(std::max(r - dir[0], 0), (int) schematic.size() - 1);
        int newC = std::min(std::max(c - dir[1], 0), (int) schematic[0].size() - 1);
        char c = schematic.at(newR).at(newC);
        if (c == '*') {
            return {newR, newC};
        }
    }

    return {-1, -1};
}

int Day3::part2() {
    const std::vector<std::string>& schematic = m_lines;
    std::unordered_map<std::string, std::vector<int>> map;

    int numLines = static_cast<int>(schematic.size());
    int width = (int) schematic.at(0).length();
    for (int i = 0; i < numLines; i++) {
        int num = 0;
        bool isAdjacentToStar = false;
        std::array<int, 2> starPos = {};

        for (int j = 0; j < width; j++) {
            char c = schematic.at(i).at(j);

            if (std::isdigit(c)) {
                num = num * 10 + c - '0';
                std::array<int, 2> curStarPos = adjacentToStar(schematic, i, j);
                if (curStarPos[0] != -1) {
                    isAdjacentToStar = true;
                    starPos = curStarPos;
                }
            } else {
                if (isAdjacentToStar) {
                    std::string key = std::to_string(starPos[0]) + "," + std::to_string(starPos[1]);
                    if (map.contains(key)) {
                        map.at(key).push_back(num);
                    } else {
                        std::vector<int> newNums = {num};
                        map.insert({key, newNums});
                    }
                }
                num = 0;
                isAdjacentToStar = false;
            }

        }

        if (isAdjacentToStar) {
            std::string key = std::to_string(starPos[0]) + "," + std::to_string(starPos[1]);
            if (map.contains(key)) {
                map.at(key).push_back(num);
            } else {
                std::vector<int> newNums = {num};
                map.insert({key, newNums});
            }
        }
    }

    int sum = 0;
    for (auto& star: map) {
        if (star.second.size() == 2) {
            sum += star.second[0] * star.second[1];
        }
    }

    return sum;
}
