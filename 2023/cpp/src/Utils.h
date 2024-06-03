#ifndef CPP_UTILS_H
#define CPP_UTILS_H

#include <vector>
#include <string>

std::vector<std::string> split(const std::string& s, const std::string& delimiter);

std::string& trim(std::string& s);

void printVector(const std::vector<std::string>& v);

#endif //CPP_UTILS_H
