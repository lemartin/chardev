cmake_minimum_required(VERSION 3.5)
project(dehasher)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

find_package(Boost 1.58 REQUIRED COMPONENTS system thread timer)

include_directories(${Boost_INCLUDE_DIRS})

set(SOURCE_FILES src/main.cpp src/jenkins/lookup3.c src/jenkins/lookup3.h src/Resolver.cpp src/Resolver.h)

add_executable(dehasher ${SOURCE_FILES})
target_link_libraries(dehasher ${Boost_LIBRARIES})
