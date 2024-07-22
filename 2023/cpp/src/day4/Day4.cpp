#include "Day4.h"

#include <string>
#include <unordered_set>
#include <cmath>
#include <algorithm>
#include <vector>
#include <numeric>

Day4::Day4() : Day(4, false) {
};

Day4::~Day4() = default;

enum Section {
    CARD,
    WINNING_NUMS,
    MY_NUMS
};

int getNumMatching(std::string& line) {
    Section section = CARD;
    int curNum = 0;
    std::unordered_set<int> winningNums;
    int numMatching = 0;

    for (char c: line) {
        if (c == ':') {
            section = WINNING_NUMS;
        } else if (c == '|') {
            section = MY_NUMS;
        } else if (c == ' ') {
            if (section == WINNING_NUMS && curNum > 0) {
                winningNums.insert(curNum);
                curNum = 0;
            } else if (section == MY_NUMS) {
                if (winningNums.contains(curNum)) {
                    numMatching++;
                }
                curNum = 0;
            }
        } else if (section == CARD) {
            // do nothing
        } else {
            curNum = curNum * 10 + c - '0';
        }
    }

    // Check final number
    if (winningNums.contains(curNum)) {
        numMatching++;
    }

    return numMatching;
}

long Day4::part1() {
    int sum = 0;

    for (std::string& line: m_lines) {
        int numWinningNumbers = getNumMatching(line);
        sum += numWinningNumbers > 0 ? static_cast<int>(std::pow(2, numWinningNumbers - 1)) : 0;
    }

    return sum;
}

long Day4::part2() {
    int numLines = static_cast<int>(m_lines.size());
    std::vector<int> numCards(numLines);
    std::fill(numCards.begin(), numCards.end(), 1);

    for (int i = 0; i < numLines; i++) {
        std::string& line = m_lines[i];
        int numMatching = getNumMatching(line);

        for (int j = i + 1; j < std::min(numLines, i + numMatching + 1); j++) {
            numCards[j] += numCards[i];
        }
    }

    return std::accumulate(numCards.begin(), numCards.end(), 0);
}
