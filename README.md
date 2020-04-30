# `seasonize` - a.k.a. Wily Beast and Weakest Season

> How to write an EPIC MEME PATCH:
>
> 1. spend several months reverse engineering every possible facet of a game
> 2. write over a thousand lines of assembly to make the experience as authentic as possible
> 3. ~~cry~~
> 4. add BIG, JUICY CANCELS and now see everything is better, there's no more badness okay

This adds season items and releases to WBaWC.  Subseason options are neither implemented nor planned.  (aside from Doyou's rear shot, which I would like to add eventually)

## Installation

* Download the latest release zip [from here](https://github.com/exphp-share/seasonize/releases)
* Copy `th17.dat`, `th17bgm.dat` and `th17.exe` into the `game-files` directory.
* **If your game copy is DRM-free:** Just run `seasonize-launcher.exe`.
* **If your game copy is from steam:** ECLplus, thcrap, and Steam DRM currently make for a hot mess. Your best bet is to do the following:
  - Edit `thcrap/config/games.js`.  You will see that th17 is defined to run `ECLplusLoader.exe`; change this to `th17.exe`.
  - Run `seasonize-launcher.exe`, wait for the game to load and enter any of the menus on the title screen (this is just to prevent demoplay from starting).
  - Alt-tab over to your file explorer and run `game-files/ECLplusLoader.exe`.  You should see the message: *Applied ECLplus to a running instance of th17.exe.*
  - Return to the game; all functionality should work now.

## How to play

A menu is presented at game start.  Act fast!!  Press the shot and bomb buttons a number of times corresponding to the season and settings you want, then press C (or wait a few seconds).

This patch uses a separate scorefile.  If you want it to start with your existing progress, you can copy `scoreth17.dat` to `scoreth17_season.dat`.

### No Beast/No Hyper mode

**This is the default setting and recommended way to play.**  This mode adjusts the balance of the game to account for having season releases:

* **Hypers end immediately:** Season releases are such a massive defensive tool that you should not need hyper breaks to survive.
* **Beast tokens are suppressed (others remain):** You can still get extra lives from life tokens. However, there are significantly fewer "filler" tokens to help you reach 5 tokens, so be careful!
* **TH16 scoring strats:** Without hypers, how shall we get PIV?  Fear not; bullets canceled by releases generate PIV items, just like in TH16!  Higher season levels produce bigger PIV items, so try to cash in big!

**To enable Beast Tokens and hypers, press Bomb on the season menu.**  Because Hypers + Releases might result in... quite a bit of PIV, the `score_uncap` patch is included.

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

* Get [ECLPlus](https://github.com/Priw8/ECLplus) and configure thcrap to use `ECLplusLoader.exe` for `th17` in `config/games.js`.  (if you have trouble getting this to work and you have the Steam version of the game, try to obtain a copy without the Steam DRM)
* Use `thcrap_configure` to make a configuration with **`thpatch/lang_en`**, **`32th/score_uncap`**, **`ExpHP/c_key`** and whatever else suits your fancy.  Edit its `.js` file in `<THCRAP DIR>/config` to add an entry for `<SEASONIZE GIT ROOT>/seasonize` at or near the end.

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

See [CHANGES.md](CHANGES.md).
