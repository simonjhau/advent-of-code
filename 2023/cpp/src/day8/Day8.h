#ifndef Day8_h
#define Day8_h

#include "../Day.h"

class Day8 final : public Day {
public:
    Day8();

    ~Day8() override;

    long part1() override;

    long part2() override;

private:
    struct Node {
        std::string left;
        std::string right;
    };

    [[nodiscard]] int stepsToZ(const std::string& startNode) const;

    std::string m_instructions;
    std::unordered_map<std::string, Node> m_mapping;
};

#endif /* Day8_h */
