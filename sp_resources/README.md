# `sp_resources` - Spell Practice Resources

**Currently supports:** TH13 (v1.00c), TH14 (v1.00b), TH16 (v1.00a), TH17 (v1.00b)

This patch modifies games with Spell Practice to:

* Begin with 5 lives.
* Begin with 5 bombs.
* (TH16) Begin with Season level 6 (MAX) instead of level 3.

so you can better practice speedkills and scoring strats.

It is currently implemented as binhacks that do nothing more than modify the constant operands in some of the `mov [<static_address>], <constant>` instructions that are called during Spell Practice startup.  This gives it great compatibility with other patches.

## How to add support for a new game or version

This requires only very basic experience with Cheat Engine.

1. Open Cheat Engine and attach to the game.
2. Do basic by-value searches for the current resource value while playing the game or watching a replay. ZUN tends to store these resource amounts in static globals. (green address in Cheat Engine)
3. Once you find the address, right click on it and "Find out what writes to this address."
4. Begin spell practice.  The instruction that writes the initial value should get logged.
5. Add a binhack that changes the immediate operand to this instruction.

Some games may require trickier fixes if the values stored aren't immediate operands.  A `"COMMENT"` field (ignored by `thcrap`) may be added to the binhack describing what it is doing.
