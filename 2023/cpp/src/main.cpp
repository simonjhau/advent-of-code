#include <iostream>

#include "day4/Day4.h"

int main() {
    Day4 day = Day4();

    std::cout << "Day " << day.getDay() << '\n';

    auto start = std::chrono::high_resolution_clock::now();
    int res1 = day.part1();
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<float> duration = end - start;
    std::cout << "Part 1: " << res1 << " (" << duration.count() * 1000000 << "us)\n";

    start = std::chrono::high_resolution_clock::now();
    int res2 = day.part2();
    end = std::chrono::high_resolution_clock::now();
    duration = end - start;
    std::cout << "Part 2: " << res2 << " (" << duration.count() * 1000000 << "us)\n";
}
