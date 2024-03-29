# `seasonize` - a.k.a.

<p align="center">
  <img src="https://github.com/exphp-share/seasonize/blob/master/doc/readme-logo.png?raw=true" title="Wily Beast and Weakest Season">
  </p>


This adds season items and releases to WBaWC.  Subseason options are neither implemented nor planned.  (aside from Doyou's rear shot, which I would like to add eventually)

## Gameplay Demo

[![image](https://user-images.githubusercontent.com/1411280/173202923-45181c40-409f-4f15-97e8-28761ba377f0.png)](https://youtu.be/m-jhRNGR8cg)

## Installation

* Download the latest release zip [from here](https://github.com/exphp-share/seasonize/releases)
* Unpack it somewhere.  (don't try to use the files from inside your archive viewer...)
* Copy `th17.dat`, `th17bgm.dat` and `th17.exe` into the `game-files` directory.
* Run `seasonize-launcher.exe`, and enjoy!

The patch no longer requires additional workarounds for owners of a copy with Steam DRM.

## How to play

A menu is presented at game start.  Act fast!!  Press the shot and bomb buttons a number of times corresponding to the season and settings you want, then press C (or wait a few seconds).

### Things to note

* This patch uses a separate scorefile.  If you want it to start with your existing progress, you can copy `scoreth17.dat` to `scoreth17_season.dat`.

* Replays of the main game must be watched beginning from stage 1  (i.e. don't start at stage 3, just fast forward).  Aside from that, replays are fully supported in any game mode.

### No Beast/No Hyper mode

**This is the default setting and recommended way to play.**  This mode adjusts the balance of the game to account for having season releases:

* **Hypers end immediately:** Season releases are such a massive defensive tool that you should not need hyper breaks (or the S6 secret token) to survive.
* **Beast tokens are suppressed (others remain):** You can still get extra lives from life tokens. However, there are significantly fewer "filler" tokens to help you reach 5 tokens, so be careful!
* **TH16 scoring strats:** Without hypers, how shall we get PIV?  Fear not; bullets canceled by releases generate PIV items, just like in TH16!  Higher season levels produce bigger PIV items, so try to cash in big!

**To enable Beast Tokens and hypers, press Bomb on the season menu.**  The `score_uncap` patch is included. You're welcome.

## Building from source

### Development

Many of the raw files for `thcrap` are produced from higher-level source files.  To generate these files, you will need a Unix environment with `make` (v4.3+ required) and `python3`.  Windows 10 WSL is perfect for this; don't forget to [pick up a decent terminal](https://github.com/sirredbeard/Awesome-WSL#terminals) while you're at it!  (mingw might also suffice but I haven't tried it)

* `thtk` binaries must be available on your `$PATH`.  `seasonize` was built with thtk commit 309eba5bfc (March 24, 2020).
* Place `th17.dat` in `seasonize/game-files`.
* Go to `seasonize/` and run
  ```
  make
  ```

If this succeeds, the `seasonize/` directory will be a suitable thcrap patch directory.  To testplay:

* Get [ECLPlus](https://github.com/Priw8/ECLplus).  You only need to place `ECLPLUS.dll` next to your `th17.exe`; seasonize will automatically load it on startup. (thanks to this, `ECLplusLoader.exe` is not required; but it won't hurt if you use it)
* Use `thcrap_configure` to make a configuration with **`32th/score_uncap`**, **`ExpHP/c_key`** and whatever else suits your fancy (e.g. **`thpatch/lang_en`**).  Edit its `.js` file in `<THCRAP DIR>/config` to add an entry for `<SEASONIZE GIT ROOT>/seasonize` at or near the end.

### New releases

If you want to create a new release zip, ~~then god help you~~ then just run:

```
make dist
```

**Some steps will require manual intervention.**  The Makefile will politely ask you to take care of these before continuing.  Please don't be mean to it, it's only trying its best!

## How does it work?

* The releases and GUI are implemented almost entirely in ECL using [ECLplus](https://github.com/Priw8/ECLplus).
* TH17 has lots of code and data left over from TH16 (for instance, `bullet.anm` was entirely unchanged); advantage was taken of this wherever possible.
* The season items are actually implemented as items!!  Just like in TH16, season items live in the same array as PIV items.  Their special behaviors (such as flyout and delayed autocollection), and the methods of generating them (grazing, shooting bosses, bombs, releases...) are all implemented to be as close as possible to TH16, through a terrifyingly large number of binhacks.

# Changelog

See [CHANGELOG.md](CHANGELOG.md).
