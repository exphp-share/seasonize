{
    "COMMENT": "This file is autogenerated.  Please do not edit it directly.  See the convert-yaml.py script.",
    "binhacks": {
        "Season items go in PIV item array": {
            "addr": "0x0043476d",
            "expected": "83FF 09 0F84 95020000 // 83FF 0A 0F84 8C020000 // 83FF 0B 0F84 83020000 // 83FF 0C 0F84 7A020000",
            "code": "83FF 09 // 7C 31 // 90909090 // 83FF 0f // 0F8E 8C020000 // 83FF 30 // 0F84 83020000 // EB 19 // CCCCCC // CCCCCCCC"
        },
        "Season items on graze": {
            "addr": "0x0044a0dc",
            "expected": "5f // 5e // 8be5 // 5d",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.item-on-graze]"
        },
        "Allocate season data for enemies": {
            "addr": "0x41ed32",
            "expected": "8b8190000000",
            "code": "E9 [codecave:of(Allocate season data for enemies)] // CC"
        },
        "Free season data for enemies": {
            "addr": "0x41db7a",
            "expected": "8b8690520000",
            "code": "E9 [codecave:of(Free season data for enemies)] // CC"
        },
        "Use season release bullet cancel mode": {
            "addr": "0x425c9f",
            "expected": "6a01 // 8bcf // f30f1185 98fbffff",
            "code": "E9 [codecave:of(Use season release bullet cancel mode)] // CCCCCCCCCCCCCC"
        },
        "Adjust bomb cancel mode for seasons - Reimu 1": {
            "addr": "0x412dbd",
            "expected": "6a 00",
            "code": "6a 05"
        },
        "Adjust bomb cancel mode for seasons - Reimu 2": {
            "addr": "0x413775",
            "expected": "6a 00",
            "code": "6a 05"
        },
        "Adjust bomb cancel mode for seasons - Reimu 3": {
            "addr": "0x4139ca",
            "expected": "6a 00",
            "code": "6a 05"
        },
        "Adjust bomb cancel mode for seasons - Reimu 4": {
            "addr": "0x413aac",
            "expected": "6a 00",
            "code": "6a 05"
        },
        "Adjust bomb cancel mode for seasons - Marisa": {
            "addr": "0x41260c",
            "expected": "6a 00",
            "code": "6a 05"
        },
        "Adjust bomb cancel mode for seasons - Youmu": {
            "addr": "0x4143cc",
            "expected": "6a 00",
            "code": "6a 05"
        },
        "Reset bomb cancel counter for seasons": {
            "addr": "0x41484a",
            "expected": "68 50144a00",
            "code": "E9 [codecave:of(Reset bomb cancel counter for seasons)]"
        },
        "Implement season bullet cancel modes": {
            "addr": "0x419c9c",
            "expected": "83fa01 // 7544",
            "code": "E9 [codecave:of(Implement season bullet cancel modes)]"
        },
        "Enemies can drop season items": {
            "addr": "0x41da35",
            "expected": "6888000000",
            "code": "E9 [codecave:of(Enemies can drop season items)]"
        },
        "Tick season item bonus timer": {
            "addr": "0x420a1e",
            "expected": "e8 ed4dfeff",
            "code": "E9 [codecave:of(Tick season item bonus timer)]"
        },
        "Implement season ECL instructions in etEx": {
            "addr": "0x424b0a",
            "expected": "68 dc154a00",
            "code": "E9 [codecave:of(Implement season ECL instructions in etEx)]"
        },
        "Bosses drop season items as they receive damage": {
            "addr": "0x41fbc3",
            "expected": "8b83 78400000",
            "code": "E9 [codecave:of(Bosses drop season items as they receive damage)] // CC"
        },
        "Disable tokens based on season menu selection": {
            "addr": "0x410390",
            "expected": "837b1028 // 7c0c",
            "code": "E9 [codecave:of(Disable tokens based on season menu selection)] // CC"
        },
        "Season item pickup effect": {
            "addr": "0x433b2d",
            "expected": "8d41ff // 83f80d",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.item-pickup-effect] // CC"
        },
        "Season items in Delayed PIV state": {
            "addr": "0x004334b3",
            "expected": "C787 580C0000 02000000 // FF 34 C5 A80D4A00",
            "code": "E9 [codecave:of(Season items in Delayed PIV state)] // CCCCCCCCCCCCCCCCCCCCCCCC"
        },
        "Season item Flyout state implementation": {
            "addr": "0x0043386d",
            "expected": "83F8 03 // 74 B1",
            "code": "E9 [codecave:ExpHP.seasons-everywhere.item-flyout-state]"
        },
        "Season item in Flyout state cannot be attracted": {
            "addr": "0x433fd7",
            "expected": "83f804 // 0f84b8000000 // 83f803 // 0f84af000000",
            "code": "E9 [codecave:of(Season item in Flyout state cannot be attracted)] // CCCCCCCCCCCCCCCCCCCCCCCCCC"
        },
        "Season release autocollects items in Falling state": {
            "addr": "0x433590",
            "expected": "a1 88764b00",
            "code": "E9 [codecave:of(Season release autocollects items in Falling state)]"
        },
        "Season release autocollects items in Attracted state": {
            "addr": "0x4338b3",
            "expected": "a1 88764b00",
            "code": "E9 [codecave:of(Season release autocollects items in Attracted state)]"
        }
    },
    "codecaves": {
        "ExpHP.seasons-everywhere.item-on-graze": "8B15 D0774B00 // 8D92 10060000 // 8B7B 08 // 83EC 20 // F30F1047 04 // F30F5C42 04 // F30F114424 0C // D94424 0C // F30F1007 // F30F5C02 // F30F114424 0C // D94424 0C // B8 706E4900 // FF D0 // C74424 1C FFFFFFFF // C74424 10 3333F33F // D95C24 0C // 897C24 04 // C70424 30000000 // 8B0D B8764B00 // B8 40474300 // FF D0 // 5f // 5e // 8be5 // 5d // E8 00000000 // C70424 E1A04400 // C3",
        "ExpHP.seasons-everywhere.eclplus-int-switch": "55 // 89 E5 // 83 e4f0 // 81 ec80000000 // 0f290424 // 0f294c2410 // 0f29542420 // 0f295c2430 // 0f29642440 // 0f296c2450 // 0f29742460 // 0f297c2470 // 51 // 52 // ff 75 10 // ff 75 0c // ff 75 08 // FF15 E49F4900 // 5a // 59 // 0f280424 // 0f284c2410 // 0f28542420 // 0f285c2430 // 0f28642440 // 0f286c2450 // 0f28742460 // 0f287c2470 // 89 EC // 5D // C2 0c00",
        "ExpHP.seasons-everywhere.calloc": "55 // 89E5 // 57 // 8B4508 // 50 // B850B24700 // FFD0 // 89C7 // 8B4508 // 50 // 6A00 // 57 // B860CE4700 // FFD0 // 89F8 // 5F // 89EC // 5D // C20400",
        "ExpHP.seasons-everywhere.randf-minus-pi-to-pi": "55 // 89E5 // 51 // 9B // DBE3 // B8B0274000 // FFD0 // 660F6EC0 // C745FC83F9224E // F30FE6C0 // C1E81F // F20F5804C5303F4A00 // 660F5AC0 // F30F5E45FC // F30F5C0588454900 // F30F1145FC // D945FC // 89EC // 5D // C3",
        "protection": 64,
        "ExpHP.seasons-everywhere.global-var-store": "00000000 // 00000000 // 00000000 // 00000000 // 00000000 // ",
        "ExpHP.seasons-everywhere.new-enemy-ex": "55 89E5 56 57 // 6A3C // E8 [codecave:ExpHP.seasons-everywhere.calloc] // 89C7 // BE <codecave:ExpHP.seasons-everywhere.global-var-store> // 8D0E // 51 // 89F9 // E8 [codecave:ExpHP.seasons-everywhere.zunlist-insert-after] // 8B4508 // 894710 // 6A01 // 6A0A // 6A3C // 89F9 // E8 [codecave:ExpHP.seasons-everywhere.ex-set-season-bonus] // 89F8 // 5F 5E 89EC 5D // C20400",
        "ExpHP.seasons-everywhere.free-enemy-ex-by-id": "55 // 89E5 // 8B4508 // 50 // E8 [codecave:ExpHP.seasons-everywhere.find-enemy-ex-by-id] // 89C1 // E8 [codecave:ExpHP.seasons-everywhere.zunlist-remove-node] // 6A3C // 50 // B880B24700 // FFD0 // 89EC // 5D // C20400",
        "ExpHP.seasons-everywhere.find-enemy-ex-by-id": "B9 <codecave:ExpHP.seasons-everywhere.global-var-store> // 8D09 // 8B542404 // 8B4104 // 85C0 // 740D // 3B5010 // 7405 // 8B4004 // EBF2 // C20400 // 0F0B",
        "ExpHP.seasons-everywhere.ex-set-season-bonus": "55 89E5 56 57 // 89CE // 8B4508 // 894630 // 50 // 8D4E1C // B8C05B4000 // FFD0 // 8B450C // 894634 // 8B4510 // 894638 // 5F 5E 89EC 5D // C20C00",
        "ExpHP.seasons-everywhere.get-season": "6A 00 // 68 CAE0FFFF // 6A 00 // E8 [codecave:ExpHP.seasons-everywhere.eclplus-int-switch] // 83E0 07 // C3",
        "ExpHP.seasons-everywhere.get-token-setting": "6A 00 // 68 CAE0FFFF // 6A 00 // E8 [codecave:ExpHP.seasons-everywhere.eclplus-int-switch] // C1E8 03 // 83E0 07 // C3",
        "ExpHP.seasons-everywhere.get-active-release": "6A 00 // 68 CCE0FFFF // 6A 00 // E8 [codecave:ExpHP.seasons-everywhere.eclplus-int-switch] // C3",
        "ExpHP.seasons-everywhere.bomb-bullet-cancel-mode-impl": "55 89E5 56 57 // BE <codecave:ExpHP.seasons-everywhere.global-var-store> // 8B4610 // BF03000000 // 99 // F7FF // 85D2 // 7508 // FF7508 // E8 [codecave:ExpHP.seasons-everywhere.spawn-season-from-cancel] // FF4610 // 5F 5E 89EC 5D // C20400",
        "ExpHP.seasons-everywhere.spawn-season-from-cancel": "55 89E5 56 57 // 8B7508 // 83EC20 // B968764B00 // B880284000 // FFD0 // D80DF83A4A00 // D95C240C // F30F1044240C // F30F5C05F43B4A00 // C744241CFFFFFFFF // C7442418ADDE0000 // C744241400000000 // C7442410CDCC0C40 // F30F1144240C // C7442408ADDE0000 // 89742404 // C7042430000000 // 8B0DB8764B00 // B840474300 // FFD0 // 85C0 // 740A // C780700C000001000000 // 5F 5E 89EC 5D // C20400",
        "ExpHP.seasons-everywhere.drop-season-items": "55 // 89E5 // 57 // 56 // 8B8160570000 // 50 // E8 [codecave:ExpHP.seasons-everywhere.find-enemy-ex-by-id] // 89C7 // 89F9 // E8 [codecave:ExpHP.seasons-everywhere.ex-get-season-bonus] // 89C6 // 85F6 // 7E0C // 8B4508 // 50 // E8 [codecave:ExpHP.seasons-everywhere.drop-one-item] // 4E // 7FF4 // C7473400000000 // C7473800000000 // 5E // 5F // 89EC // 5D // C20400",
        "ExpHP.seasons-everywhere.ex-get-season-bonus": "8B4120 // 85C0 // 7F04 // 8B4138 // C3 // 8B4134 // 2B4138 // 0FAF4120 // 99 // F77930 // 034138 // C3",
        "ExpHP.seasons-everywhere.drop-one-item": "55 // 89E5 // 83EC24 // C7442420FFFFFFFF // C744241C0DF00000 // C744241800000000 // B968764B00 // B840284000 // FFD0 // C704243333F33F // D80C24 // D805043B4A00 // D95C2414 // B968764B00 // E8 [codecave:ExpHP.seasons-everywhere.randf-minus-pi-to-pi] // D95C2410 // C744240C0DF00000 // 8B4D08 // 894C2408 // C744240430000000 // 83C404 // 8B0DB8764B00 // B840474300 // FFD0 // 89EC // 5D // C20400",
        "ExpHP.seasons-everywhere.impl-et-ex-neg": "55 89E5 56 57 // 89CE // 8B7D08 // 668B4708 // 6685C0 // 751D // 8B4714 // 83F801 // 7715 // B9 <codecave:ExpHP.seasons-everywhere.et-ex-calltable> // 8B0481 // 89F1 // 57 // FFD0 // 5F 5E 89EC 5D // C20400 // 0F0B",
        "ExpHP.seasons-everywhere.et-ex-calltable": "<codecave:ExpHP.seasons-everywhere.ecl-spec-0> // <codecave:ExpHP.seasons-everywhere.ecl-spec-1>",
        "ExpHP.seasons-everywhere.ecl-spec-0": "55 89E5 56 57 // 89CE // 8B7D08 // FF7720 // FF771C // FF7718 // 8D86F4EDFFFF // FFB060570000 // E8 [codecave:ExpHP.seasons-everywhere.find-enemy-ex-by-id] // 89C1 // E8 [codecave:ExpHP.seasons-everywhere.ex-set-season-bonus] // 5F 5E 89EC 5D // C20400",
        "ExpHP.seasons-everywhere.ecl-spec-1": "55 89E5 56 57 // 89CE // 8B7D08 // 8D86F4EDFFFF // FFB060570000 // E8 [codecave:ExpHP.seasons-everywhere.find-enemy-ex-by-id] // 89C1 // 8B86883F0000 // 894118 // 8B4718 // 894114 // 5F 5E 89EC 5D // C20400",
        "ExpHP.seasons-everywhere.spawn-items-from-damage": "55 89E5 56 57 // 89CF // FFB754450000 // E8 [codecave:ExpHP.seasons-everywhere.find-enemy-ex-by-id] // 89C6 // 837E1400 // 7E73 // 8B4618 // 3B87883F0000 // 7D68 // 034614 // 894618 // 83EC20 // C744241CFFFFFFFF // C7442418ADDE0000 // C744241400000000 // B968764B00 // B840284000 // FFD0 // D805D03B4A00 // D95C2410 // B968764B00 // E8 [codecave:ExpHP.seasons-everywhere.randf-minus-pi-to-pi] // D95C240C // C7442408ADDE0000 // 8D5744 // 89542404 // C7042430000000 // 8B0DB8764B00 // B840474300 // FFD0 // 5F 5E 89EC 5D // C3",
        "ExpHP.seasons-everywhere.item-pickup-effect": "83F930 // 7413 // 8D41FF // 83F80D // E800000000 // C70424333B4300 // C3 // E8 [codecave:ExpHP.seasons-everywhere.increment-season-power] // 85C0 // 7422 // 6840FFFFFF // 6AFF // 8DB7100C0000 // 56 // B8 700b4500 // FFD0 // F30F1016 // 6A3F // B8 F0544600 // FFD0 // 8B35D0774B00 // 8974240C // E800000000 // C70424863F4300 // C3",
        "ExpHP.seasons-everywhere.increment-season-power": "51 // 52 // 6A 01 // 68 CBE0FFFF // 6A 00 // E8 [codecave:ExpHP.seasons-everywhere.eclplus-int-switch] // 8138 74040000 // 7D 2C // FF00 // 8B00 // 83F8 64 // 74 27 // 3D E6000000 // 74 20 // 3D 86010000 // 74 19 // 3D 4E020000 // 74 12 // 3D 48030000 // 74 0B // 3D 74040000 // 74 04 // 31C0 // EB 05 // B8 01000000 // 5A // 59 // C3",
        "ExpHP.seasons-everywhere.delayed-piv-state": "83F8 30 // 74 13 // C787 580C0000 02000000 // FF34C5 A80D4A00 // EB 15 // C787 580C0000 09000000 // E8 [codecave:ExpHP.seasons-everywhere.get-season] // 05 81000000 // 50 // E8 00000000 // C70424 B8344300 // C3",
        "ExpHP.seasons-everywhere.item-flyout-state": "83F8 03 // 74 07 // 83F8 09 // 74 1C // EB 0D // E8 00000000 // C70424 23384300 // C3 // E8 00000000 // C70424 72384300 // C3 // F30F1005 18594B00 // F30F108F 1C0C0000 // F30F1097 200C0000 // F30F109F 240C0000 // F30F59C8 // F30F59D0 // F30F59D8 // F30F588F 100C0000 // F30F5897 140C0000 // F30F589F 180C0000 // F30F118F 100C0000 // F30F1197 140C0000 // F30F119F 180C0000 // F30F1087 280C0000 // F30F5C05 C03A4A00 // F30F1187 280C0000 // 83EC 08 // F30F114424 04 // F30F1087 2C0C0000 // F30F110424 // 8D8F 1C0C0000 // B8 F04C4300 // FFD0 // E8 [codecave:ExpHP.seasons-everywhere.is-bomb-or-release-autocollecting] // 0987700C0000 // 0F2FAF 280C0000 // 7315 // F30F1087 140C0000 // E8 00000000 // C70424 27374300 // C3 // 8B35 D0774B00 // 83BF 700C0000 00 // B8 03000000 // B9 01000000 // 0F44C1 // 8987 580C0000 // C787 1C0C0000 00000000 // C787 200C0000 00000000 // C787 240C0000 00000000 // C787 280C0000 00000000 // C787 2C0C0000 DB0FC93F // 8B86 3C900100 // 8B40 08 // 8987 640C0000 // 8B4C24 10 // E8 00000000 // C70424 20354300 // C3",
        "ExpHP.seasons-everywhere.is-bomb-or-release-autocollecting": "A188764B00 // 83783001 // 7508 // 8378383C // 7D02 // EB0E // E8 [codecave:ExpHP.seasons-everywhere.get-active-release] // 85C0 // 7E02 // EB03 // 31C0 // C3 // B801000000 // C3",
        "ExpHP.seasons-everywhere.zunlist-prepend": "8B542404 // 8B4208 // 0B4104 // 0B4108 // 85C0 // 750B // 895104 // 894A08 // 89C8 // C20400 // 0F0B",
        "ExpHP.seasons-everywhere.zunlist-insert-after": "8B542404 // 8B4104 // 0B4108 // 85C0 // 7518 // 8B4204 // 894104 // 85C0 // 7403 // 894808 // 895108 // 894A04 // 89C8 // C20400 // 0F0B",
        "ExpHP.seasons-everywhere.zunlist-remove-node": "8B4104 // 8B5108 // 85C0 // 7403 // 895008 // 85D2 // 7403 // 894204 // C7410400000000 // C7410800000000 // 89C8 // C3",
        "of(Allocate season data for enemies)": "51 // 52 // 50 // E8 [codecave:ExpHP.seasons-everywhere.new-enemy-ex] // 5A // 59 // 8B8190000000 // E800000000 // C7042438ED4100 // C3",
        "of(Free season data for enemies)": "51 // 52 // FFB660570000 // E8 [codecave:ExpHP.seasons-everywhere.free-enemy-ex-by-id] // 5A // 59 // 8B8690520000 // E800000000 // C7042480DB4100 // C3",
        "of(Use season release bullet cancel mode)": "52 // 51 // 83EC04 // F30F110424 // 8B0C24 // 85C9 // B801000000 // BA04000000 // 0F4CC2 // 81E1FFFFFF7F // 890C24 // F30F100424 // 83C404 // 59 // 5A // 50 // 89F9 // F30F118598FBFFFF // E800000000 // C70424AB5C4200 // C3",
        "of(Reset bomb cancel counter for seasons)": "B8 <codecave:ExpHP.seasons-everywhere.global-var-store> // C7401000000000 // 6850144A00 // E800000000 // C704244F484100 // C3",
        "of(Implement season bullet cancel modes)": "83FA01 // 740C // 83FA04 // 7414 // 83FA05 // 7417 // EB1B // E800000000 // C70424A19C4100 // C3 // 56 // E8 [codecave:ExpHP.seasons-everywhere.spawn-season-from-cancel] // EB06 // 56 // E8 [codecave:ExpHP.seasons-everywhere.bomb-bullet-cancel-mode-impl] // E800000000 // C70424E59C4100 // C3",
        "of(Enemies can drop season items)": "8B4508 // 50 // 8B4DF8 // 8D8970C0FFFF // 8D89F4EDFFFF // E8 [codecave:ExpHP.seasons-everywhere.drop-season-items] // 6888000000 // E800000000 // C704243ADA4100 // C3",
        "of(Tick season item bonus timer)": "B810584000 // FFD0 // 8D86F4EDFFFF // FFB060570000 // E8 [codecave:ExpHP.seasons-everywhere.find-enemy-ex-by-id] // 8D481C // 83790400 // 7E0A // 83EC04 // B8E0DB4000 // FFD0 // E800000000 // C70424230A4200 // C3",
        "of(Implement season ECL instructions in etEx)": "81F9C1BDF0FF // 7412 // 68DC154A00 // E800000000 // C704240F4B4200 // C3 // FFB588FBFFFF // 89F9 // E8 [codecave:ExpHP.seasons-everywhere.impl-et-ex-neg] // E800000000 // C70424F2654200 // C3",
        "of(Bosses drop season items as they receive damage)": "89D9 // E8 [codecave:ExpHP.seasons-everywhere.spawn-items-from-damage] // 8B8378400000 // E800000000 // C70424 C9FB4100 // C3",
        "of(Disable tokens based on season menu selection)": "E8 [codecave:ExpHP.seasons-everywhere.get-token-setting] // 83F800 // 741A // 83F801 // 7407 // 83F802 // 7425 // 0F0B // 837D0C03 // 7E1D // 837D0C0F // 7D17 // EB00 // 837B1028 // 7C02 // EB0D // E800000000 // C70424A2034100 // C3 // E800000000 // C7042496034100 // C3",
        "of(Season items in Delayed PIV state)": "83F8 30 // 74 13 // C787 580C0000 02000000 // FF34C5 A80D4A00 // EB 15 // C787 580C0000 09000000 // E8 [codecave:ExpHP.seasons-everywhere.get-season] // 05 81000000 // 50 // E8 00000000 // C70424 c4344300 // C3",
        "of(Season item in Flyout state cannot be attracted)": "83F804 // 740C // 83F803 // 7407 // 83F809 // 7402 // EB0D // E800000000 // C7042498404300 // C3 // E800000000 // C70424E93F4300 // C3",
        "of(Season release autocollects items in Falling state)": "E8 [codecave:ExpHP.seasons-everywhere.is-bomb-or-release-autocollecting] // 85C0 // 740D // E8 00000000 // C70424 0A384300 // C3 // E8 00000000 // C70424 A5354300 // C3",
        "of(Season release autocollects items in Attracted state)": "E8 [codecave:ExpHP.seasons-everywhere.is-bomb-or-release-autocollecting] // 85C0 // 740D // E8 00000000 // C70424 0A384300 // C3 // E8 00000000 // C70424 C8384300 // C3"
    }
}