VERSION=1.0.0
THCRAP_VERSION=2020-04-27
ECLPLUS_REV=07057e97a09c0

.PHONY: all
all: patch-dev-dir

PATCH_DEV_DIR=seasonize
.PHONY: patch-dev-dir
patch-dev-dir: ecls anms binhacks

.PHONY: dist
dist: seasonize-v$(VERSION).zip

#================================================

.PHONY: binhacks
binhacks: \
	$(PATCH_DEV_DIR)/th17.v1.00b.js \

$(PATCH_DEV_DIR)/th17.v1.00b.js: \
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
	$(PATCH_DEV_DIR)/th17/seasons.anm \

$(PATCH_DEV_DIR)/th17/%.anm: source/%.spec $(shell find source/img -name '*.png')
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
patch-ecls: \
	$(PATCH_DEV_DIR)/th17/seasons.ecl \

.PHONY: game-ecls
game-ecls: $(GAME_ECL_NAMES:%.ecl=$(PATCH_DEV_DIR)/th17/%.ecl)

game-files/th17.dat:
	@echo >&2 "To rebuild ECL files you must copy th17.dat into ./game-files/"
	@false

# NOTE: These &: rules require make 4.3
$(GAME_ECL_NAMES:%.ecl=game-files/ecl/%.ecl) &: game-files/th17.dat
	(cd game-files && thdat -x 17 th17.dat && rm *.anm *.msg *.png *.sht *.wav *.std *.fmt *.ver *.rpy *txt && mkdir -p ecl && mv *.ecl ecl)

game-files/orig/%.txt: game-files/ecl/%.ecl
	mkdir -p $(@D) && $(THECL.d) $< $@

$(GAME_ECL_NAMES:%.ecl=game-files/patched/%.txt) &: scripts/patch-ecls.py source/th17-season-drops.yaml $(GAME_ECL_NAMES:%.ecl=game-files/orig/%.txt)
	python3 $< game-files/orig -o game-files/patched --enemy-drops source/th17-season-drops.yaml

$(PATCH_DEV_DIR)/th17/seasons.ecl: source/seasons.txt $(TECL_FILES)
	mkdir -p $(@D) && $(THECL.c) $< $@

game-files/patched/%.tecl: source/%.tecl
	mkdir -p $(@D) && cp $< $@
game-files/patched/%.eclm: source/%.eclm
	mkdir -p $(@D) && cp $< $@

# stop deleting these ffs
.PRECIOUS: game-files/patched/%.tecl
.PRECIOUS: game-files/patched/%.eclm

$(PATCH_DEV_DIR)/th17/st%.ecl: game-files/patched/st%.txt game-files/patched/ECLinclude/ECLplus.eclm $(TECL_FILES:source/%.tecl=game-files/patched/%.tecl)
	mkdir -p $(@D) && $(THECL.c) game-files/patched/st$*.txt $@

#================================================
# Making the distribution zip

#-----
# vars

DIR_TO_PACK=.make/dist/seasonize-v$(VERSION)
PACKED_PATCH_DIR=$(DIR_TO_PACK)/seasonize
THCRAP_CONFIG_FILENAME=seasonize.js
PACKED_THCRAP_DIR=$(DIR_TO_PACK)/thcrap
PACKED_EXE_DIR=$(DIR_TO_PACK)/game-files
PROOF_OF_THCRAP=$(PACKED_THCRAP_DIR)/bin/thcrap_loader.exe
PROOFS_OF_PATCHES = \
	$(PACKED_THCRAP_DIR)/repos/thpatch/lang_en/patch.js \
	$(PACKED_THCRAP_DIR)/repos/ExpHP/c_key/patch.js \
	$(PACKED_THCRAP_DIR)/repos/32th/score_uncap/patch.js \
	# end
PACKED_SOURCE_ARCHIVE = $(DIR_TO_PACK)/seasonize-v$(VERSION)-src.tar.gz
ECLPLUS_REPO_DIR = .make/ECLplus
ECLPLUS_FILENAMES = ECLplusLoader.exe ECLPLUS.dll
ECLPLUS_BUILD_ARTIFACTS = $(ECLPLUS_FILENAMES:%=$(ECLPLUS_REPO_DIR)/Release/%)
PACKED_ECLPLUS_FILES = $(ECLPLUS_FILENAMES:%=$(PACKED_EXE_DIR)/%)

LAUNCHER_SOURCE_DIR = source/seasonize-launcher
LAUNCHER_BUILD_DIR = $(LAUNCHER_SOURCE_DIR)
LAUNCHER_SOURCE_FILES = \
	$(wildcard $(LAUNCHER_SOURCE_DIR)/*.c) \
	$(wildcard $(LAUNCHER_SOURCE_DIR)/*.h) \
	$(wildcard $(LAUNCHER_SOURCE_DIR)/*.ico) \
	# end
LAUNCHER_EXE_FILENAME = seasonize-launcher.exe
BUILT_LAUNCHER_EXE = $(LAUNCHER_BUILD_DIR)/Release/$(LAUNCHER_EXE_FILENAME)
PACKED_LAUNCHER_EXE = $(DIR_TO_PACK)/$(LAUNCHER_EXE_FILENAME)

THINGS_TO_PACK = \
	$(DIR_TO_PACK)/LICENSE_ECLPLUS.txt \
	$(DIR_TO_PACK)/README.md \
	$(PACKED_LAUNCHER_EXE) \
	$(PROOF_OF_THCRAP) \
	$(PROOF_OF_CKEY_PATCH) \
	$(PROOF_OF_EN_PATCH) \
	$(PACKED_THCRAP_DIR)/bin/thcrap_update_nope.dll \
	$(PACKED_THCRAP_DIR)/config/games.js \
	$(PACKED_THCRAP_DIR)/config/$(THCRAP_CONFIG_FILENAME) \
	$(PACKED_ECLPLUS_FILES) \
	copy-dist-patch-files \
	check-no-game-files \
	# end

seasonize-v$(VERSION).zip: $(THINGS_TO_PACK)
	cd .make/dist && zip -o seasonize-v$(VERSION).zip -r seasonize-v$(VERSION)
	mv .make/dist/seasonize-v$(VERSION).zip $@

#-----
# rules

$(PACKED_ECLPLUS_FILES) &: $(ECLPLUS_BUILD_ARTIFACTS)
	mkdir -p $(@D) && cp -t $(@D) $^

$(ECLPLUS_BUILD_ARTIFACTS) &: .make/submodules.stamp
	@echo >&2 '=============================================='
	@echo >&2 '== NOT FOUND:' $@
	@echo >&2 '=='
	@echo >&2 "== Okay, this is awkward but:  I'm gonna have to ask you to"
	@echo >&2 '== use Visual Studio to build ECLplus.'
	@echo >&2 '=='
	@echo >&2 '== The repo was cloned to $(ECLPLUS_REPO_DIR).  Be sure to build in Release mode.'
	@echo >&2 '=='
	@echo >&2 "== Once you're done you can try using make again."
	@echo >&2 '=============================================='
	@false

$(PROOF_OF_THCRAP):
	rm -rf $(PACKED_THCRAP_DIR)
	mkdir -p $(PACKED_THCRAP_DIR)
	cd $(PACKED_THCRAP_DIR) && ( \
		wget -O thcrap.zip https://github.com/thpatch/thcrap/releases/download/$(THCRAP_VERSION)/thcrap.zip && \
		unzip thcrap.zip && \
		rm thcrap.zip && \
	true) || { rm -f $(PROOF_OF_THCRAP); false; }

# The order-only prerequisite here is to prevent interleaving output to
# stderr when both of these need attention.
$(PROOFS_OF_PATCHES) &: $(PROOF_OF_THCRAP) $(PACKED_THCRAP_DIR)/config/games.js | $(ECLPLUS_BUILD_ARTIFACTS)
	@echo >&2 '=============================================='
	@echo >&2 "== Hi! It's me again, the makefile that can't do anything!"
	@echo >&2 "== I know it's a pain and all, but... could you by any chance run"
	@echo >&2 "==     $(PACKED_THCRAP_DIR)/thcrap_configure.exe"
	@echo >&2 "== and create a configuration with the following patches installed?"
	@echo >&2 "==     thpatch/lang_en"
	@echo >&2 "==     32th/score_uncap"
	@echo >&2 "==     ExpHP/c_key"
	@echo >&2 "== This is just to get thcrap to download the patches. Thanks!"
	@echo >&2 '=============================================='
	@false

# thcrap_update.dll needs to exist for patches to be downloaded.
# After that, we disable it for distribution.
$(PACKED_THCRAP_DIR)/bin/thcrap_update_nope.dll: $(PROOFS_OF_PATCHES)
	@# The check for existence is in case something somehow causes this to be spuriously run again
	@#  after thcrap_update.dll has already been moved.
	@# We don't list thcrap_update.dll as a dependency because, without a recipe, make would treat
	@#  it like a phony target and constantly rerun this rule.
	[ -e "$@" ] || mv $(PACKED_THCRAP_DIR)/bin/thcrap_update.dll $@
	touch $@

$(PACKED_THCRAP_DIR)/config/%.js: source/dist-files/%.js $(PROOF_OF_THCRAP)
	mkdir -p $(@D) && cp $< $@

$(DIR_TO_PACK)/LICENSE_ECLPLUS.txt: LICENSE_ECLPLUS.txt
	mkdir -p $(@D) && cp $< $@
$(DIR_TO_PACK)/README.md: README.md
	mkdir -p $(@D) && cp $< $@

.make/submodules.stamp: .gitmodules
	mkdir -p .make && git submodule init && git submodule update && touch $@

$(PACKED_LAUNCHER_EXE): $(BUILT_LAUNCHER_EXE)
	mkdir -p $(@D) && cp $< $@
$(BUILT_LAUNCHER_EXE) : $(LAUNCHER_SOURCE_FILES) $(PACKED_THCRAP_DIR)/config/games.js | $(ECLPLUS_BUILD_ARTIFACTS)
	@echo >&2 '=============================================='
	@echo >&2 '== NOT FOUND:' $@
	@echo >&2 '=='
	@echo >&2 "== Good gracious, we just keep running into each other!"
	@echo >&2 "== I have one final request: Can you use Visual Studios to compile"
	@echo >&2 "==     $(LAUNCHER_BUILD_DIR)"
	@echo >&2 "== in x86 Release mode?  Thanks a billion."
	@echo >&2 '=============================================='
	@false

$(PACKED_SOURCE_ARCHIVE): pack-source-archive
.PHONY: pack-source-archive
pack-source-archive:
	git archive HEAD --prefix seasonize-v$(VERSION)/ -o $(PACKED_SOURCE_ARCHIVE)

# Rule for copying our patch into the dist dir.
# This reruns every time 'make dist' is run because it's too hard to track the addition of new files.
.PHONY: copy-dist-patch-files
copy-dist-patch-files: patch-dev-dir
	rm -rf $(PACKED_PATCH_DIR)
	cp -a $(PATCH_DEV_DIR) $(PACKED_PATCH_DIR)

CHECK_NO_FILE = @!(ls >/dev/null 2>/dev/null $1 && echo >&2 "ERROR: Please delete `ls -1 $1 | head -n1` before packing!!")
check-no-game-files:
	@# make sure this isn't vacuously succeeding
	@if [ ! -e "$(PACKED_EXE_DIR)" ]; then echo >&2 "check-no-game-files makefile rule is outdated. Fix it!"; false; fi;
	$(call CHECK_NO_FILE,$(PACKED_EXE_DIR)/th*.exe)
	$(call CHECK_NO_FILE,$(PACKED_EXE_DIR)/th*.dat)

# More order-only prereqs to prevent interleaving output.
# .PHONY targets with echoed output are included here too so that repeated runs to make
# don't repeatedly produce interleaved output.
$(BUILT_LAUNCHER_EXE): | $(ECLPLUS_BUILD_ARTIFACTS) $(PROOFS_OF_PATCHES)
copy-dist-patch-files: | $(BUILT_LAUNCHER_EXE)
check-no-game-files: | copy-dist-patch-files pack-source-archive
