Every ECL script was modified in this way:

* Import a utility script.
* Locate the line in `sub main` beginning with `unless ($SPELL_ID >= 0) goto ...` and add two lines after it that spawn an enemy using the sub defined in the utility script.

```diff
--- st06-b.txt  2019-11-11 19:19:48.443760600 -0500
+++ st06.txt    2019-11-11 19:19:36.615670100 -0500
@@ -1,5 +1,6 @@
 anim { "enemy.anm"; "st06enm.anm"; }
 ecli { "default.ecl"; "st06bs.ecl"; }
+ecli { "SpellPracticeResources.ecl"; }

 sub ECir00()
 {
@@ -1002,6 +1003,7 @@
     enmMapleEnemy("MapleEnemy2", 0, 0, 100, 1000, 0);
     $GI3 = $LAST_ENM_ID;
     unless ($SPELL_ID >= 0) goto main_488 @ 0;
+    enmCreateA("GirlResourceFill", 0.0f, -16.0f, 1, 42, 12);
+    wait(130);
     call("MainBossSpellSt6");
     goto main_444 @ 0;
 main_424:
```
