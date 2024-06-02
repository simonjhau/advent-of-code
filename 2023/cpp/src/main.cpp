#include <iostream>

#include "day5/Day5.h"

int main() {
    Day5 day = Day5();
    std::vector<std::string> lines = day.readFile();

    std::cout << "Day " << day.getDay() << '\n';

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
