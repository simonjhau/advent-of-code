#ifndef CPP_DAY_H
#define CPP_DAY_H

#include <vector>
#include <string>

class Day {
public:
    Day(int dayNum, bool test);

    virtual ~Day() = default;

    virtual int part1(std::vector<std::string>) = 0;

    virtual int part2(std::vector<std::string>) = 0;

    std::vector<std::string> readFile();

    int getDay();

protected:
    std::string m_inputFile;
    bool m_test = false;

private:
    int m_dayNum;

};

#endif //CPP_DAY_H
