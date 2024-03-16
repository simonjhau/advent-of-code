#ifndef Day3_h
#define Day3_h

#include "../Day.h"

class Day3 : public Day {
public:
    Day3();

    ~Day3() override;

    int part1(std::vector<std::string> lines) override;

    int part2(std::vector<std::string> lines) override;
};

#endif /* Day3_h */
