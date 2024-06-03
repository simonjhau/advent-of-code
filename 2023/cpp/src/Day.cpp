#include "Day.h"

#include <iostream>
#include <fstream>
#include <string>

Day::Day(int dayNum, bool test) : m_dayNum(dayNum), m_test(test) {
    std::string testStr = m_test ? "test" : "";
    std::string inputFile = "input/Day" + std::to_string(m_dayNum) + testStr + ".txt";
    readFile(inputFile);
}

void Day::readFile(const std::string& inputFile) {
    std::ifstream file(inputFile);

    if (file.is_open()) {
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