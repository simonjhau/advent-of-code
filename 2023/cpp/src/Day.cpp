#include "Day.h"

#include <iostream>
#include <fstream>
#include <string>

Day::Day(const int dayNum, const bool test) : m_dayNum(dayNum), m_test(test) {
    const std::string testStr = m_test ? "test" : "";
    const std::string inputFile = "input/Day" + std::to_string(m_dayNum) + testStr + ".txt";
    readFile(inputFile);
}

void Day::readFile(const std::string& inputFile) {
    if (std::ifstream file(inputFile); file.is_open()) {
        std::string line;
        while (std::getline(file, line)) {
            m_lines.push_back(line);
        }
        file.close();
    } else {
        std::cout << "Unable to open file\n";
    }
}

int Day::getDay() const {
    return m_dayNum;
}
