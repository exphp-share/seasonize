.PHONY: all
all: ecls anms binhacks

.PHONY: ecls
ecls: \
	th17/seasons.ecl \
	th17/st01.ecl \

.PHONY: anms
anms: \
	th17/seasons.anm \

.PHONY: binhacks
binhacks: \
	th17.v1.00b.js \

th17/%.ecl: source/%.txt $(shell find source -name '*.tecl')
	thecl -c 17 -m source/maps/th17.eclm $< $@

th17/%.anm: source/%.spec $(shell find source/img -name '*.png')
	thanm -m source/maps/v8.anmm -c $@ $<

th17.v1.00b.js: \
		source/binhacks/th17.v1.00b.yaml \
		source/binhacks/th17-data.yaml \
		source/binhacks/th17-cancels.yaml \
		source/binhacks/th17-drops.yaml \
		source/binhacks/th17-item-tick.yaml \
		source/binhacks/zunlist.yaml
	scripts/convert-yaml.py -o $@ $^
