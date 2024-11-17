#!/usr/bin/env bash

curl 'http://challs.crate.nu:47896/users' -X POST -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate' -H 'HX-Request: true' -H 'HX-Target: result' -H 'HX-Current-URL: http://challs.crate.nu:47896/' -H 'Content-Type: application/json' -H 'Origin: http://challs.crate.nu:47896' -H 'Connection: keep-alive' -H 'Referer: http://challs.crate.nu:47896/' -H 'Priority: u=0' --data-raw '{"password":"red"}'
