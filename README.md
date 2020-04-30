# Wily Beast and Weakest Season

> How to write an EPIC MEME PATCH:
>
> 1. spend several months reverse engineering every possible facet of a game
> 2. write over a thousand lines of assembly to make the experience as authentic as possible
> 3. ~~cry~~
> 4. add BIG, JUICY CANCELS and now see everything is better, there's no more badness okay

This adds season items and releases to WBaWC.  Doyou's butt shot is on the todo list, but other than that, subseason options are neither implemented nor planned.

This patch uses a separate scorefile.  If you want it to start with your existing progress, you can copy `scoreth17.dat` to `scoreth17_season.dat`.

A menu is presented at game start.  Act fast!!  Press the shot and bomb buttons a number of times corresponding to the season and settings you want, then press C (or wait a few seconds).

## No Beast/No Hyper mode

**This is the default setting and recommended way to play.**  This mode adjusts the balance of the game to account for having season releases:

* **Hypers end immediately:** Season releases are such a massive defensive tool that you should not need hyper breaks to survive.
* **Beast tokens are suppressed (others remain):** You can still get extra lives from life tokens. However, there are significantly fewer "filler" tokens to help you reach 5 tokens, so be careful!
* **TH16 scoring strats:** Without hypers, how shall we get PIV?  Fear not; enabling this mode will cause releases to generate PIV items, just like in TH16!

To enable Beast Tokens and hypers, press Bomb on the season menu.

## Installation

Download the latest release zip from here (TODO LINK), place `th17.dat`, `th17bgm.dat` and `th17.exe` in `seasonize/game-files`, then run (TODO WHAT DO YOU RUN).

## Building from source

Many of the raw files for `thcrap` are produced from higher-level source files.  To generate these files, you will need a Unix environment with `make` and `python3`.  Windows 10 WSL is perfect for this; don't forget to [pick up a decent terminal](https://github.com/sirredbeard/Awesome-WSL#terminals) while you're at it!

* `thtk` binaries must be available on your `$PATH`.  `seasonize` has been tested with thtk commit 309eba5bfc.
* Place `th17.dat` in `seasonize/game-files`.
* Go to `seasonize/` and run
  ```
  make
  ```

Once this is done, the `seasonize/` directory will be a suitable thcrap patch directory, and can be added to a thcrap configuration by editing one of the js files in `<THCRAP-DIR>/config`.

If you want to create a new release zip, run: (TODO: UPDATE TEXT ONCE IMPLEMENTED)

```
make dist
```

## How does it work?

* The releases and GUI are implemented almost entirely in ECL using [ECLplus](https://github.com/Priw8/ECLplus).
* The season items are actually implemented as items!!  Just like in TH16, season items live in the same array as PIV items.  Their special behaviors (such as flyout and delayed autocollection), and the methods of generating them (grazing, shooting bosses, bombs, releases...) are all implemented to be as close as possible to TH16, through a terrifyingly large number of binhacks.
