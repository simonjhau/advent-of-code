#ifndef Day2_hpp
#define Day2_hpp

#include <stdio.h>
#include <vector>
#include <string>

#include "../Day.h"

class Day2 : public Day {
public:
    Day2();

    ~Day2();

    int part1(std::vector <std::string> lines);

    int part2(std::vector <std::string> lines);
};


#endif /* Day2_hpp */
