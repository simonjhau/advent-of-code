#include "Day6.h"
#include "../Utils.h"

#include <iostream>

Day6::Day6() : Day(6, true) {
    parseFile();
};

Day6::~Day6() = default;

void Day6::parseFile() {
    m_times = extractNumbers(m_lines[0]);
    m_distances = extractNumbers(m_lines[1]);
}

int Day6::part1() {
    return 0;
}

int Day6::part2() {
    return 0;
}
