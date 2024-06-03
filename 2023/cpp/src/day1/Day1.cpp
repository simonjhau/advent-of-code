#include <string>
#include <cctype>

#include "Day1.h"

Day1::Day1() : Day(1, false) {};

Day1::~Day1() = default;

int Day1::part1() {
    int sum = 0;

    for (std::string line: m_lines) {
        int val = 0;

        int lineLength = static_cast<int>(line.length());
        for (
                int i = 0; i < lineLength; i++
                ) {
            char c = line[i];
            if (std::isdigit(c)) {
                val = val * 10 + c - '0';
                break;
            }
        }

        for (
                int i = lineLength - 1; i >= 0; i--
                ) {
            char c = line[i];
            if (std::isdigit(c)) {
                val = val * 10 + c - '0';
                break;
            }
        }

        sum += val;
    }

    return sum;
}

int Day1::part2() {
    int sum = 0;
    std::string nums[] = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
    int numsLength = 10;

    for (const std::string& line: m_lines) {
        int val = 0;

        int lineLength = static_cast<int>(line.length());

        bool found = false;
        for (
                int i = 0; i < lineLength && !found; i++
                ) {
            char c = line[i];
            if (std::isdigit(c)) {
                val = val * 10 + c - '0';
                break;
            } else if (i >= 1) {
                for (
                        int j = 0; j < numsLength; j++
                        ) {
                    if (line.substr(0, i + 1).find(nums[j]) != std::string::npos) {
                        val = val * 10 + j;
                        found = true;
                        break;
                    }
                }
            }
        }

        found = false;
        for (
                int i = lineLength - 1; i >= 0 && !found; i--
                ) {
            char c = line[i];
            if (std::isdigit(c)) {
                val = val * 10 + c - '0';
                break;
            } else if (i >= 1) {
                for (
                        int j = 0; j < numsLength; j++
                        ) {
                    if (line.substr(i, lineLength).find(nums[j]) != std::string::npos) {
                        val = val * 10 + j;
                        found = true;
                        break;
                    }
                }
            }
        }

        sum += val;
    }

    return sum;
}
