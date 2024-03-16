#ifndef Day3_h
#define Day3_h

#include <stdio.h>
#include <vector>
#include <string>

#include "../Day.h"

class Day3 : public Day {
public:
    Day3();

    ~Day3();

    int part1(std::vector <std::string> lines);

    int part2(std::vector <std::string> lines);
};

#endif /* Day3_h */