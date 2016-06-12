#ifndef DEHASHER_LOOKUP3_H
#define DEHASHER_LOOKUP3_H

#include <stdint.h>
#include <stddef.h>

extern "C"
{
    void hashlittle2(const void *key, size_t length, uint32_t *pc, uint32_t *pb);
}

#endif //DEHASHER_LOOKUP3_H
