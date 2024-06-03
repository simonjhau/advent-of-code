# Compiler
CXX = g++

# Compiler flags
CXXFLAGS = -Wall -Wextra -std=c++20
DEBUGFLAGS = -g -O0
RELEASEFLAGS = -O3 -DNDEBUG

# Directories
SRC = src
BUILD = build

SRCS = $(shell find $(SRC) -name '*.cpp')
BUILDOBJS = $(patsubst $(SRC)/%.cpp, $(BUILD)/%.o, $(SRCS))
TARGET = $(BUILD)/app

.PHONY: all debug release clean

all: release

debug: CXXFLAGS += $(DEBUGFLAGS)
debug: $(TARGET)

release: CXXFLAGS += $(RELEASEFLAGS)
release: $(TARGET)

# Link the target executable
$(TARGET): $(BUILDOBJS)
	$(CXX) $(CXXFLAGS) -o $@ $^

# Compile source files to object files
$(BUILD)/%.o: $(SRC)/%.cpp
	@mkdir -p $(@D)
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -rf $(BUILD)
