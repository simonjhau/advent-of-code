//
//  Day3.hpp
//  advent-of-code-cpp
//
//  Created by Simon Au on 01/02/2024.
//

#ifndef Day3_hpp
#define Day3_hpp

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

#endif /* Day3_hpp */
