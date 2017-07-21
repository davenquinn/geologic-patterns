#!/usr/bin/env python

import re
from pathlib import Path
from sys import argv

deletions = [
    ' style="overflow:visible;"',
    ' patternUnits="userSpaceOnUse"',
    '  y="2556"']

def update_first_line(line):
    id_ = re.compile(r" id=\"_x3(\d)_([\d\-CMYKRBDO_]+)\"")
    match = id_.search(line)
    assert match is not None
    id = match.group(1)+match.group(2)
    line = id_.sub("",line)

    for d in deletions:
        line = line.replace(d,"")
    line = line.replace("<pattern",
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" xml:space="preserve"')

    line = '<?xml version="1.0" encoding="utf-8"?>\n'+line

    return id, line

outdir = Path(argv[2])
outdir.mkdir(exist_ok=True, parents=True)

with open(argv[1],'r') as f:
    active_file = None
    for line in f:
        if re.match(r"<pattern", line):
            id, line = update_first_line(line)
            assert active_file is None

            active_file = outdir.joinpath(id+".svg").open("w")
            active_file.write(line)
        elif re.match(r"</pattern>",line):
            line = line.replace("pattern","svg")
            active_file.write(line)
            active_file.close()
            active_file = None
        elif active_file is not None:
            active_file.write(line)
