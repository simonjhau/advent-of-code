//
//  Day2.cpp
//  advent-of-code-cpp
//
//  Created by Simon Au on 30/01/2024.
//

#include "Day.h"

#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>
#include <sstream>

#include "Day.h"

Day::Day(int dayNum, bool test) : m_dayNum(dayNum), m_test(test) {
    std::string testStr = m_test ? "test" : "";
    std::ostringstream oss;
    oss << "input/Day" << m_dayNum << testStr << ".txt";
    m_inputFile = oss.str();
}

std::vector <std::string> Day::readFile() {
    std::vector <std::string> lines;
    std::ifstream file(m_inputFile);

    if (file.is_open()) {
        std::string line;
        while (std::getline(file, line)) {
            lines.push_back(line);
        }
        file.close();
    } else {
        std::cout << "Unable to open file\n";
    }
    return lines;
}
