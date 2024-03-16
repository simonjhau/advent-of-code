#ifndef Day4_h
#define Day4_h

#include "../Day.h"

class Day4 : public Day {
public:
    Day4();

    ~Day4() override;

    int part1(std::vector<std::string> lines) override;

    int part2(std::vector<std::string> lines) override;
};

#endif /* Day4_h */
