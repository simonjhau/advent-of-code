#ifndef Day4_h
#define Day4_h

#include <stdio.h>
#include <vector>
#include <string>

#include "../Day.h"

class Day4 : public Day {
public:
    Day4();

    ~Day4();

    int part1(std::vector <std::string> lines);

    int part2(std::vector <std::string> lines);
};

#endif /* Day4_h */
