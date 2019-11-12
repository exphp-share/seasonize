# `sp_resources` - Spell Practice Resources

**Currently supports:** TH16 (v1.00a)

This patch modifies games with Spell Practice to:

* Begin with 5 bombs.
* (TH16) Begin with Season level 6 (MAX) instead of level 3.

It is currently implemented as binhacks that do nothing more than modify the constant operands in some of the `mov <static_address>, <constant>` instructions that are called during Spell Practice startup.  This gives it great compatibility with other patches.
