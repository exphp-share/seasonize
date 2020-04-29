.PHONY: all
all: ecls anms binhacks

#================================================

.PHONY: binhacks
binhacks: \
	th17.v1.00b.js \

th17.v1.00b.js: \
		source/binhacks/th17.v1.00b.yaml \
		source/binhacks/th17-data.yaml \
		source/binhacks/th17-cancels.yaml \
		source/binhacks/th17-drops.yaml \
		source/binhacks/th17-tokens.yaml \
		source/binhacks/th17-item-tick.yaml \
		source/binhacks/zunlist.yaml
	scripts/convert-yaml.py -o $@ $^

#================================================

.PHONY: anms
anms: \
	th17/seasons.anm \

th17/%.anm: source/%.spec $(shell find source/img -name '*.png')
	thanm -m source/maps/v8.anmm -c $@ $<

#================================================

THECL.d = thecl -d 17 -m source/maps/th17.eclm
THECL.c = thecl -c 17 -m source/maps/th17.eclm
TECL_FILES = $(shell find source -name '*.tecl')

GAME_ECL_NAMES = \
	st01.ecl st01mbs.ecl st01bs.ecl \
	st02.ecl st02mbs.ecl st02bs.ecl \
	st03.ecl st03mbs.ecl st03bs.ecl \
	st04.ecl st04mbs.ecl st04bs.ecl \
	st05.ecl st05mbs.ecl st05bs.ecl \
	st06.ecl st06mbs.ecl st06bs.ecl \
	st07.ecl st07mbs.ecl st07bs.ecl \

.PHONY: ecls
ecls: patch-ecls game-ecls

.PHONY: patch-ecls
ecls: \
	th17/seasons.ecl \

.PHONY: game-ecls
game-ecls: $(GAME_ECL_NAMES:%.ecl=th17/%.ecl)

game-files/th17.dat:
	echo >&2 "To rebuild ECL files you must copy th17.dat into ./game-files/"
	exit 1

# NOTE: These &: rules require make 4.3
$(GAME_ECL_NAMES:%.ecl=game-files/ecl/%.ecl) &: game-files/th17.dat
	(cd game-files && thdat -x 17 th17.dat && rm *.anm *.msg *.png *.sht *.wav *.std *.fmt *.ver *.rpy *txt && mkdir -p ecl && mv *.ecl ecl)

game-files/orig/%.txt: game-files/ecl/%.ecl
	mkdir -p game-files/orig
	$(THECL.d) $< $@

$(GAME_ECL_NAMES:%.ecl=game-files/patched/%.txt) &: scripts/patch-ecls.py source/th17-season-drops.yaml $(GAME_ECL_NAMES:%.ecl=game-files/orig/%.txt)
	python3 $< game-files/orig -o game-files/patched --enemy-drops source/th17-season-drops.yaml

th17/seasons.ecl: source/seasons.txt $(TECL_FILES)
	$(THECL.c) $< $@

game-files/patched/%.tecl: source/%.tecl
	mkdir -p $(@D) && cp $< $@
game-files/patched/%.eclm: source/%.eclm
	mkdir -p $(@D) && cp $< $@

# stop deleting these ffs
.PRECIOUS: game-files/patched/%.tecl
.PRECIOUS: game-files/patched/%.eclm

th17/st%.ecl: game-files/patched/st%.txt game-files/patched/ECLinclude/ECLplus.eclm $(TECL_FILES:source/%.tecl=game-files/patched/%.tecl)
	$(THECL.c) game-files/patched/st$*.txt $@
