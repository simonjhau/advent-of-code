#ifndef Day5_h
#define Day5_h

#include "../Day.h"

class Day5 : public Day {
public:
    Day5();

    ~Day5() override;

    int part1(std::vector<std::string> lines) override;

    int part2(std::vector<std::string> lines) override;
};

#endif /* Day5_h */
