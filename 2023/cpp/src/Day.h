//
// Created by Simon Au on 29/02/2024.
//

#ifndef CPP_DAY_H
#define CPP_DAY_H

#include <vector>
#include <string>

class Day {
public:
    virtual ~Day() {};

    virtual int part1(std::vector <std::string>) = 0;

    virtual int part2(std::vector <std::string>) = 0;
};

#endif //CPP_DAY_H
