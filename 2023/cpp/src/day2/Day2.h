#ifndef Day2_hpp
#define Day2_hpp

#include "../Day.h"

class Day2 : public Day {
public:
    Day2();

    ~Day2() override;

    int part1(std::vector<std::string> lines) override;

    int part2(std::vector<std::string> lines) override;
};


#endif /* Day2_hpp */
