
import os
import sys
import itertools
from ruamel.yaml import YAML
yaml = YAML(typ='safe')

STAGES = range(1, 7+1)
SUFFIXES = ['', 'bs', 'mbs']
FILE_IDS = list(itertools.product(STAGES, SUFFIXES))

def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="Generates all ecl files for the TH17 seasons patch",
        epilog="Requires thtk binaries (thdat, thecl) to be available in PATH.",
    )
    parser.add_argument("INPUTDIR", help="Input directory, containing decompiled ecl files.")
    parser.add_argument("--enemy-drops", required=True, help="Enemy drops config.")
    parser.add_argument("--output", '-o', required=True, help="Output directory.")
    args = parser.parse_args()

    os.makedirs(args.output, exist_ok=True)

    files = {}
    for id in FILE_IDS:
        with open(os.path.join(args.INPUTDIR, txt_filename(id)), 'rb') as f:
            files[id] = f.read().decode('shift-jis')

    with open(args.enemy_drops) as f:
        enemy_drop_configs = yaml.load(f)

    insert_anim(files, 4, 'seasons.anm')
    insert_ecli(files, 'seasons.ecl')
    insert_include(files, 'seasons.tecl')
    insert_init_season_calls(files)
    insert_season_damage_ops(files)
    insert_boss_season_drops(files)
    insert_enemy_season_drops(files, enemy_drop_configs)


    for id in FILE_IDS:
        with open(os.path.join(args.output, txt_filename(id)), 'wb') as f:
            f.write(files[id].encode('shift-jis'))

def txt_filename(id):
    n, suffix = id
    return f'st0{n}{suffix}.txt'

def joinlines(lines):
    """ No, it's not ``'\\n'.join(...)``, that would be missing a trailing newline. """
    return ''.join(line + '\n' for line in lines)

#=============================

def append_to_file_list(line, new_file):
    """ Add a file to an `anim` or `ecli` line. """
    assert line.endswith('}')
    return f'{line[:-1]} "{new_file}"; }}'

def insert_include(files, filename):
    """ Add an ``#include`` to every file """

    for id in files:
        files[id] = f'#include "{filename}"\n\n' + files[id]

def insert_ecli(files, ecl_filename):
    """ Add an ecl file to each stage ecli list. """

    for stage in STAGES:
        id = (stage, '')

        lines = files[id].splitlines()
        for i in range(len(lines)):
            if lines[i].startswith('ecli '):
                lines[i] = append_to_file_list(lines[i], ecl_filename)
                break
        else:
            die(f'{txt_filename(id)}: ecli line not found')

        files[id] = joinlines(lines)

def insert_anim(files, anim_index, anim_filename):
    """ Add the given anm file at the given anim file ID (indexed from 1)
    in all stage anim lists, filling up to that point with dummy entries if
    necessary. """

    for stage in STAGES:
        id = (stage, '')

        lines = files[id].splitlines()
        for i in range(len(lines)):
            if lines[i].startswith('anim '):
                if lines[i].count(';') >= anim_index:
                    die(f'{txt_filename(id)}: has too many anm files already!')

                # fill with dummy entries
                while lines[i].count(';') < anim_index - 1:
                    lines[i] = append_to_file_list(lines[i], 'pl00.anm')

                lines[i] = append_to_file_list(lines[i], anim_filename)
                break
        else:
            die(f'{txt_filename(id)}: anim line not found')

        files[id] = joinlines(lines)

def insert_season_damage_ops(files):
    """ Insert seasonDamage calls for every boss and midboss. """

    for id in files:
        lines = files[id].splitlines()
        for i in reversed(range(len(lines))):
            if lines[i].strip().startswith('setBoss('):
                lines.insert(i, '    defaultSeasonDamage();')
        files[id] = joinlines(lines)

def insert_enemy_season_drops(files, drops_config):
    """ Insert seasonDamage calls for every boss and midboss. """

    for id in files:
        filename = txt_filename(id)
        if filename in drops_config:
            enemies_todo = dict(drops_config[filename])
            funcs = parse_funcs(files[id])

            for func, lines in funcs:
                if func in enemies_todo:
                    config = enemies_todo.pop(func)
                    time, item_max, item_min = config['value']
                    line_number = int(config['line'])

                    # let index 0 refer to the line after the opening brace
                    assert lines[1] == '{'
                    line_number += 2

                    lines.insert(line_number, f'    dropSeason({time}, {item_max}, {item_min});')

            if enemies_todo:
                func = next(iter(enemies_todo))
                die(f'{txt_filename(id)}: No function found named {func}')

            files[id] = format_funcs(funcs)

def insert_boss_season_drops(files):
    """ Insert dropSeason calls for every boss nonspell and spell. """

    timeouts_found = 0
    s56_spells_found = 0  # 4 5
    s56_nonspells_found = 0  # 4 7

    for id in FILE_IDS:
        stage, suffix = id
        funcs = parse_funcs(files[id])
        for func, lines in funcs:
            for i in reversed(range(len(lines))):
                # A call to setNext is an extremely good indicator of this being a spell/nonspell.
                # Dying midbosses call ``setNext`` with the second argument -1 to disable it;
                #  we want to avoid these.
                line = lines[i]
                if line.strip().startswith('setNext(') and ', -1,' not in line:

                    args = '(1200, 200, 10)'
                    if stage < 3 and suffix == 'mbs':
                        args = '(900, 200, 10)'
                    if stage == 7:
                        args = '(2400, 200, 80)'
                    if stage in [5, 6]:
                        if 'Card' in func:
                            s56_spells_found += 1
                            args = '(2400, 200, 10)'
                        else:
                            s56_nonspells_found += 1

                    if any(line.strip().startswith('spellTimeout()') for line in lines):
                        timeouts_found += 1
                        args = '(2400, 400, 400)'

                    lines.insert(i, f'    dropSeason{args};')

        files[id] = format_funcs(funcs)

    if timeouts_found != 1:
        die('bad timeout count: expected 1, found {}'.format(timeouts_found))
    if s56_nonspells_found != 9:
        die('bad stage 5/6 nonspell count: expected 9, found {}'.format(s56_nonspells_found))
    if s56_spells_found != 11:
        die('bad stage 5/6 spell count: expected 11, found {}'.format(s56_spells_found))
    return joinlines(lines)

def insert_init_season_calls(files):
    """ Add InitSeason calls to every stage. """

    def transform_file(files, id):
        stage, _ = id
        funcs = parse_funcs(files[id])
        for func, lines in funcs:
            if func != 'main':
                continue
            for i in range(len(lines)):
                if lines[i].strip() == 'wait(1);':
                    lines.insert(i + 1, f'    @InitSeasons({stage});')
                    files[id] = format_funcs(funcs)
                    return
            else:
                die(f'{txt_filename(id)}: wait line not found')
        else:
            die(f'{txt_filename(id)}: main not found')

    for stage in STAGES:
        id = (stage, '')
        transform_file(files, id)


#=============================

def parse_funcs(text):
    """ An EXTREMELY simple parser that tags groups of lines with the name of the
    function they belong to (or, for lines not in a function, the name of the most
    recently defined function). Many assumptions are made about the style of code
    generated by thecl. """

    lines = text.splitlines()
    func = None
    group = []
    output = []
    for line in lines:
        if line.strip() and line.split()[0] in ['void', 'int', 'float']:
            output.append((func, group))
            func = line.split(None, 1)[1].split('(')[0]
            group = []
            assert func

        group.append(line)
    output.append((func, group))  # final group

    return output

def format_funcs(funcs):
    """ Inverse of ```parse_funcs```. """
    def inner():
        for _func, lines in funcs:
            yield from lines
    return joinlines(inner())


#=============================

def die(*args):
    print(*args, flie=sys.stderr)
    sys.exit(1)

if __name__ == '__main__':
    main()
