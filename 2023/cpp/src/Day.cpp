#include "Day.h"

#include <iostream>
#include <fstream>
#include <string>
#include <sstream>

Day::Day(int dayNum, bool test) : m_dayNum(dayNum), m_test(test) {
    std::string testStr = m_test ? "test" : "";
    std::ostringstream oss;
    oss << "input/Day" << m_dayNum << testStr << ".txt";
    m_inputFile = oss.str();
    readFile();
}

void Day::readFile() {
    std::ifstream file(m_inputFile);

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