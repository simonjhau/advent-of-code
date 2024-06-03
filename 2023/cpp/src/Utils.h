#ifndef CPP_UTILS_H
#define CPP_UTILS_H

#include <vector>
#include <string>
#include <iostream>

std::vector<std::string> split(const std::string& s, const std::string& delimiter);

std::string& trim(std::string& s);

template<typename T>
void printVector(const std::vector<T>& v) {
    for (const auto& elem: v) {
        std::cout << elem << ", ";
    }
    std::cout << std::endl;
}

std::vector<int> extractNumbers(const std::string& s);

#endif //CPP_UTILS_H
