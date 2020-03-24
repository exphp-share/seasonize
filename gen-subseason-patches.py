#!/usr/bin/env python3

import shutil
import os

template_path = 'subseason_TEMPLATE'

for dirname, reps in {
    'subseason_spring': [('season', 'spring'), ('Season', 'Spring'), ('number', '0')],
    'subseason_summer': [('season', 'summer'), ('Season', 'Summer'), ('number', '1')],
    'subseason_fall':   [('season', 'fall'),   ('Season', 'Fall'),   ('number', '2')],
    'subseason_winter': [('season', 'winter'), ('Season', 'Winter'), ('number', '3')],
}.items():
    if os.path.exists(dirname):
        shutil.rmtree(dirname)
    os.mkdir(dirname)

    for fname in os.listdir(template_path):
        s = open(os.path.join(template_path, fname)).read()
        for (a, b) in reps:
            s = s.replace('{{' + a + '}}', b)

        assert fname.endswith('.in')
        open(os.path.join(dirname, fname[:-len('.in')]), 'w').write(s)
