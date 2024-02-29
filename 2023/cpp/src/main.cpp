//
// Created by Simon Au on 29/02/2024.
//
#include <iostream>
#include <fstream>

#include "day1/Day1.h"

int main() {
    Day1 day = Day1();
    std::ifstream file("input/day1.txt");

    std::vector <std::string> lines;
    if (file.is_open()) {
        std::string line;
        while (std::getline(file, line)) {
            lines.push_back(line);
        }
        file.close();
    } else {
        std::cout << "Unable to open file\n";
        return -1;
    }

    auto start = std::chrono::high_resolution_clock::now();
    int res1 = day.part1(lines);
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<float> duration = end - start;
    std::cout << "Part 1: " << res1 << " (" << duration.count() * 1000000 << "us)\n";

    start = std::chrono::high_resolution_clock::now();
    int res2 = day.part2(lines);
    end = std::chrono::high_resolution_clock::now();
    duration = end - start;
    std::cout << "Part 2: " << res2 << " (" << duration.count() * 1000000 << "us)\n";
}
