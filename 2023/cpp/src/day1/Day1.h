#include <vector>
#include <string>

#include "../Day.h"

#ifndef Day1_h
#define Day1_h

class Day1 : public Day {
public:
    Day1();

    ~Day1() override;

    int part1(std::vector<std::string>) override;

    int part2(std::vector<std::string>) override;
};

#endif /* Day1_h */
