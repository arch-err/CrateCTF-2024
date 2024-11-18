#!/usr/bin/env bash

HOST="challs.crate.nu 50002"

(echo "4 9
2 1
1 3
0 1
3 1
3 1
3 2") | nc $HOST
