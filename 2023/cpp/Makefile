# Compiler
CXX = g++

# Compiler flags
CXXFLAGS = -Wall -Wextra -std=c++20
DEBUGFLAGS = -g -O0
RELEASEFLAGS = -O3 -DNDEBUG

# Directories
SRCDIR = src
DEBUGDIR = debug
RELEASEDIR = release

# Find all .cpp files in src and its subdirectories
SRCS = $(shell find $(SRCDIR) -type f -name '*.cpp')

# Transform the source file paths for object files in debug/release directories
DEBUGOBJS = $(SRCS:$(SRCDIR)/%.cpp=$(DEBUGDIR)/%.o)
RELEASEOBJS = $(SRCS:$(SRCDIR)/%.cpp=$(RELEASEDIR)/%.o)

# Executable targets
DEBUGTARGET = $(DEBUGDIR)/app
RELEASETARGET = $(RELEASEDIR)/app

all: debug release

setup_debug:
	@mkdir -p $(DEBUGDIR)

setup_release:
	@mkdir -p $(RELEASEDIR)

#---Debug---
debug: setup_debug $(DEBUGTARGET)
	@echo "Debug build complete."

# Link the debug object files to create the release executable
$(DEBUGTARGET): $(DEBUGOBJS)
	$(CXX) $(CXXFLAGS) $(DEBUGFLAGS) -o $@ $^

# Rule to compile source files to object files for the debug build
$(DEBUGDIR)/%.o: $(SRCDIR)/%.cpp
	@mkdir -p $(dir $@)
	$(CXX) $(CXXFLAGS) $(DEBUGFLAGS) -c $< -o $@

#---Release---
release: setup_release $(RELEASETARGET)
	@echo "Release build complete."

# Link the release object files to create the release executable
$(RELEASETARGET): $(RELEASEOBJS)
	$(CXX) $(CXXFLAGS) $(RELEASEFLAGS) -o $@ $^

# Rule to compile source files to object files for the release build
$(RELEASEDIR)/%.o: $(SRCDIR)/%.cpp
	@mkdir -p $(dir $@)
	$(CXX) $(CXXFLAGS) $(RELEASEFLAGS) -c $< -o $@

# Clean
clean:
	rm -rf $(DEBUGDIR) $(RELEASEDIR)
