#include "Day8.h"
#include "../Utils.h"

#include <map>
#include <regex>

Day8::Day8() : Day(8, false) {
    m_instructions = m_lines[0];

    for (size_t i = 2; i < m_lines.size(); i++) {
        std::regex pattern(R"(([A-Z0-9])+)");
        std::vector<std::string> matches = extractMatches(m_lines[i], pattern);
        m_mapping.insert({matches[0], {matches[1], matches[2]}});
    }
}

Day8::~Day8() = default;

long Day8::part1() {
    int steps = 0;
    std::string cur = "AAA";
    while (cur != "ZZZ") {
        const char dir = m_instructions[steps % m_instructions.size()];
        if (dir == 'L') {
            cur = m_mapping.at(cur).left;
        } else {
            cur = m_mapping.at(cur).right;
        }
        steps++;
    }
    return steps;
}

long Day8::part2() {
    std::vector<std::string> nodes;

    for (const auto& [key, node]: m_mapping) {
        if (key[2] == 'A') {
            nodes.push_back(key);
        }
    }

    std::vector<long> steps(nodes.size());
    for (size_t i = 0; i < nodes.size(); i++) {
        steps[i] = stepsToZ(nodes[i]);
    }

    return lcmArray(steps);
}

int Day8::stepsToZ(const std::string& startNode) const {
    std::string node = startNode;
    int steps = 0;

    while (node[2] != 'Z') {
        const char dir = m_instructions[steps % m_instructions.size()];
        if (dir == 'L') {
            node = m_mapping.at(node).left;
        } else {
            node = m_mapping.at(node).right;
        }

        steps++;
    }

    return steps;
}
