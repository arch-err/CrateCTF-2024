#!/usr/bin/env python

with open("data.bin", "rb") as f:
    data = f.read()

LOOKUP_TABLE = {
    "e0e040bf": "POWER ON/OFF",
    "e0e0807f": "SOURCE",
    "e0e0d12e": "HDMI",
    "e0e020df": "ONE",
    "e0e0a05f": "TWO",
    "e0e0609f": "THREE",
    "e0e010ef": "FOUR",
    "e0e0906f": "FIVE",
    "e0e050af": "SIX",
    "e0e030cf": "SEVEN",
    "e0e0b04f": "EIGHT",
    "e0e0708f": "NINE",
    "e0e08877": "ZERO",
    "e0e034cb": "TTX/MIX",
    "e0e0c837": "PREVIOUS CHANNEL",
    "e0e0e01f": "VOLUME UP",
    "e0e0d02f": "VOLUME DOWN",
    "e0e0f00f": "MUTE",
    "e0e0d629": "CHANNEL LIST",
    "e0e048b7": "CHANNEL UP",
    "e0e008f7": "CHANNEL DOWN",
    "e0e09e61": "SMART MODE",
    "e0e0f20d": "GUIDE",
    "e0e058a7": "MENU",
    "e0e0d22d": "TOOLS",
    "e0e0f807": "INFO",
    "e0e006f9": "UP",
    "e0e08679": "DOWN",
    "e0e0a659": "LEFT",
    "e0e046b9": "RIGHT",
    "e0e016e9": "OK/ENTER",
    "e0e0b44b": "EXIT",
    "e0e01ae5": "RETURN",
    "e0e036c9": "RED",
    "e0e028d7": "GREEN",
    "e0e0a857": "YELLOW",
    "e0e06897": "BLUE",
    "e0e0639c": "FAMILY STORY",
    "e0e0ce31": "SEARCH",
    "e0e0f906": "3D",
    "e0e0fc03": "SUPPORT",
    "e0e0f10e": "D (WHAT IS IT?)",
    "e0e0a45b": "AD/SUBT.",
    "e0e0a25d": "PREVIOUS TRACK",
    "e0e012ed": "NEXT TRACK",
    "e0e0926d": "RECORD",
    "e0e0e21d": "PLAY",
    "e0e052ad": "PAUSE",
    "e0e0629d": "STOP",
}

number_words = {
    "ZERO": "0",
    "ONE": "1",
    "TWO": "2",
    "THREE": "3",
    "FOUR": "4",
    "FIVE": "5",
    "SIX": "6",
    "SEVEN": "7",
    "EIGHT": "8",
    "NINE": "9",
    "MUTE": "_"
}


blockLength = 4

array = []

for b in range(0, len(data), blockLength):
    block = data[b:b+blockLength].hex()
    signal = LOOKUP_TABLE[block]
    if "POWER" in signal:
        continue
    array.append(number_words[signal])

array = "".join(array).split("_")
array.pop()
# print(array)

flag = ""
for i in array:
    flag += chr(int(i))

print(flag)
